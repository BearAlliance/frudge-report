import React, { Component } from 'react';
import './App.css';
import Header from './header/header';
import Footer from './footer';

class App extends Component<{}, { isConnected: boolean }> {
  headerChild: any;

  constructor(props: any) {
    super(props);
    this.state = { isConnected: false };
    this.headerChild = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
