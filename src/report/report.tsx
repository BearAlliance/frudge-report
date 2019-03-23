import React, { Component } from 'react';

const openSocket = require('socket.io-client');
import TemperatureChart from './temperature-chart';
import TemperatureTable from './temperature-table';

export interface TempReading {
  reading: number;
  time: Date;
}

class Report extends Component<
  { onConnectionChange: any },
  {
    isConnected: any;
    lastMsg: Date;
    sinceLastMessage: number;
    readings: TempReading[];
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
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
          <div className="columns">
            <div className="column">
              <TemperatureTable readings={this.state.readings} />
            </div>
            <div className="column">
              <TemperatureChart readings={this.state.readings} />
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

  openConnection() {
    let socket = openSocket('/');
    this.setState({ lastMsg: new Date() });

    socket.on('connect', () => {
      this.props.onConnectionChange(true);
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
      this.onBulkLoad(data.readings);
    });
    socket.on('disconnect', () => {
      this.props.onConnectionChange(false);
      this.setState({ isConnected: false });
    });
  }

  onBulkLoad(readings: TempReading[]) {
    this.setState({ sinceLastMessage: 0 });
    const bulkLoad = readings.map((reading: any) => {
      return {
        reading: reading.reading,
        time: new Date(reading.time)
      };
    });
    this.setState({
      readings: bulkLoad
    });
  }
}

export default Report;
