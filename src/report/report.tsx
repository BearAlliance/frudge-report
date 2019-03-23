import React, { Component } from 'react';

const openSocket = require('socket.io-client');
import { Scatter } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface TempReading {
  reading: number;
  time: Date;
}

class Report extends Component<
  {},
  {
    loading: boolean;
    isConnected: any;
    lastMsg: Date;
    sinceLastMessage: number;
    readings: TempReading[];
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      isConnected: null,
      lastMsg: new Date(),
      sinceLastMessage: 0,
      readings: []
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.status()}
          <div className="columns">
            <div className="column">{this.temperatureTable()}</div>
            <div className="column">
              <Scatter
                data={this.getChartData()}
                options={this.getChartOptions()}
                height={400}
                width={400}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    this.openConnection();

    setInterval(
      () =>
        this.setState({ sinceLastMessage: this.state.sinceLastMessage + 1 }),
      1000
    );
  }

  getChartOptions(): ChartOptions {
    return {
      responsive: true,
      title: {
        display: false,
        text: 'Temperature over time'
      },
      scales: {
        type: 'time',
        scaleLabel: {
          display: true,
          labelString: 'hello'
        }
      }
    };
  }

  getChartData(): ChartData {
    return {
      datasets: [
        {
          label: 'Temperature',

          data: this.state.readings.map((reading, index) => {
            return {
              x: index,
              y: reading.reading
            };
          })
        }
      ]
    };
  }

  temperatureTable() {
    return (
      <table className="table is-hoverable is-bordered is-striped">
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Time Received</th>
          </tr>
        </thead>
        <tbody>
          {this.state.readings
            .map((reading, index) => {
              return (
                <tr key={index}>
                  <td>{reading.reading}</td>
                  <td>{`${reading.time.toDateString()} ${reading.time.toLocaleTimeString()}`}</td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    );
  }

  openConnection() {
    let socket = openSocket('/');
    this.setState({ lastMsg: new Date() });

    socket.on('connect', () => {
      console.log('connected');
      this.setState({ isConnected: true });
    });
    socket.on('event', (data: any) => {
      this.setState({ sinceLastMessage: 0 });
      this.setState({
        readings: [
          ...this.state.readings,
          { reading: data.reading, time: new Date(data.time) }
        ]
      });
    });
    socket.on('bulk-load', (data: any) => {
      this.setState({ sinceLastMessage: 0 });
      const bulkLoad = data.readings.map((reading: any) => {
        return {
          reading: reading.reading,
          time: new Date(reading.time)
        };
      });
      this.setState({
        readings: bulkLoad
      });
    });
    socket.on('disconnect', () => {
      this.setState({ isConnected: false });
      console.log('disconnect');
    });
  }

  status() {
    const { loading, isConnected, sinceLastMessage } = this.state;
    let bannerClass = 'notification status-bar';
    bannerClass += isConnected ? ' is-success' : ' is-danger';

    return (
      <div className={bannerClass}>
        <div className="is-size-5 is-left">
          {isConnected ? 'Connected' : 'Not Connected'}
        </div>
        <div className="monospace-numbers">
          Time since last message: {sinceLastMessage}
        </div>
      </div>
    );
  }
}

export default Report;
