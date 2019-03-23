import React, { Component } from 'react';

const openSocket = require('socket.io-client');

class Report extends Component<
  {},
  {
    loading: boolean;
    isConnected: any;
    lastMsg: Date;
    sinceLastMessage: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      isConnected: null,
      lastMsg: new Date(),
      sinceLastMessage: 0
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.status()}
          <div className="columns">
            <div className="column" />
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
      console.log('connected');
      this.setState({ isConnected: true });
    });
    socket.on('event', (data: any) => {
      this.setState({ sinceLastMessage: 0 });
      console.log('data', data);
    });
    socket.on('disconnect', () => {
      this.setState({ isConnected: false });
      console.log('disconnect');
    });
  }

  status() {
    const { loading, isConnected, sinceLastMessage } = this.state;
    let bannerClass = 'notification';
    bannerClass += isConnected ? ' is-success' : ' is-danger';

    return (
      <div className={bannerClass}>
        <div className="is-size-3 is-left">
          Connected: {loading ? 'Loading...' : isConnected ? 'yes' : 'no'}
        </div>
        <div>Time since last message: {sinceLastMessage}</div>
      </div>
    );
  }
}

export default Report;
