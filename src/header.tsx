import React, { Component } from 'react';

class Header extends Component<{ isConnected: boolean }> {
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
            <div className="navbar-item">{this.status()}</div>
          </div>
        </nav>
      </div>
    );
  }

  status() {
    const { isConnected } = this.props;
    let bannerClass = 'notification status-bar';
    bannerClass += isConnected ? ' is-success' : ' is-danger';

    return (
      <div className={bannerClass}>
        <div className="is-size-5 is-left">
          {isConnected ? 'Connected' : 'Not Connected'}
        </div>
      </div>
    );
  }
}

export default Header;
