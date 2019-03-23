import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Footer from './footer';
import Report from './report/report';

class App extends Component<{}, { isConnected: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { isConnected: false };
  }

  render() {
    return (
      <div className="App">
        <Header isConnected={this.state.isConnected} />

        <Report onConnectionChange={this.handleConnectionChange.bind(this)} />

        <Footer />
      </div>
    );
  }

  handleConnectionChange() {
    this.setState({ isConnected: true });
  }
}

export default App;
