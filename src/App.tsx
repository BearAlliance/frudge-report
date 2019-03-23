import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Footer from './footer';
import Report from './report/report';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Report />

        <Footer />
      </div>
    );
  }
}

export default App;
