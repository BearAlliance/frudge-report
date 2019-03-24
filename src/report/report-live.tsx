import React, { Component } from 'react';

const openSocket = require('socket.io-client');
import TemperatureChart from './temperature-chart';
import TemperatureTable from './temperature-table';
import { connect } from 'react-redux';
import { resetLastReceivedTimer, setConnectionState } from '../redux/actions';

export interface TempReading {
  reading: number;
  time: Date;
}

class ReportLive extends Component<
  { resetLastReceivedTimer: any; setConnectionState: any },
  {
    lastMsg: Date;
    sinceLastMessage: number;
    readings: TempReading[];
  }
> {
  socket: any;

  constructor(props: any) {
    super(props);
    this.state = {
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
  }

  componentWillUnmount(): void {
    this.socket.disconnect();
  }

  openConnection() {
    this.socket = openSocket('/');
    this.setState({ lastMsg: new Date() });

    this.socket.on('connect', () => {
      this.props.setConnectionState(true);
    });
    this.socket.on('event', (data: any) => {
      this.props.resetLastReceivedTimer();
      this.handleNewReading(data);
    });
    this.socket.on('bulk-load', (data: any) => {
      this.handleBulkLoad(data.readings);
    });
    this.socket.on('disconnect', () => {
      this.props.setConnectionState(false);
    });
  }

  handleNewReading(data: any) {
    this.setState({
      readings: [
        ...this.state.readings,
        { reading: data.reading, time: new Date(data.time) }
      ].slice(0, 25)
    });
  }

  handleBulkLoad(readings: TempReading[]) {
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

export default connect(
  null,
  { setConnectionState, resetLastReceivedTimer }
)(ReportLive);
