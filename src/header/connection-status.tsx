import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConnectionStatus extends Component<{ isConnected?: boolean }> {
  constructor(props: any) {
    super(props);
  }

  render() {
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

const mapStateToProps = (state: any) => {
  const { isConnected } = state.connectionState;
  return {
    isConnected
  };
};

export default connect(mapStateToProps)(ConnectionStatus);
