import React, { Component } from 'react';
import ConnectionStatus from './connection-status';
import MessageTimer from './message-timer';

class Header extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="is-size-3">The Frudge Report</div>
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
    );
  }
}

export default Header;
