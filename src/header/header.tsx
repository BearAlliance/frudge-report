import React, { Component } from 'react';
import ConnectionStatus from './connection-status';
import MessageTimer from './message-timer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import asyncComponent from '../async-component';

const AsyncHistorical = asyncComponent(() =>
  import('../report/report-historical')
);
const AsyncLive = asyncComponent(() => import('../report/report-live'));

class Header extends Component<{}, { activeNav: string }> {
  constructor(props: any) {
    super(props);
    this.state = { activeNav: '' };
  }

  render() {
    return (
      <Router>
        <div>
          <nav
            className="navbar is-info"
            role="navigation"
            aria-label="main navigation">
            <div className="navbar-brand">
              <div className="is-size-3 navbar-item">The Frudge Report</div>
            </div>
            <div className="navbar-menu">
              <Link
                className={'navbar-item' + this.isActive('live')}
                to={'/live'}
                onClick={e => this.setActive(e, 'live')}>
                Live
              </Link>
              <Link
                className={'navbar-item' + this.isActive('historical')}
                to={'/historical'}
                onClick={e => this.setActive(e, 'historical')}>
                Historical
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <MessageTimer />
              </div>
              <div className="navbar-item">
                <ConnectionStatus />
              </div>
            </div>
          </nav>
        </div>

        <Route exact path="/" component={AsyncLive} />
        <Route path="/live" component={AsyncLive} />
        <Route path="/historical" component={AsyncHistorical} />
      </Router>
    );
  }

  isActive(name: string) {
    return name === this.state.activeNav ? ' is-active' : '';
  }

  setActive(event: any, name: string) {
    this.setState({ activeNav: name });
  }
}

export default Header;
