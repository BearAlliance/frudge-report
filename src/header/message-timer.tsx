import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageTimer extends Component<
  { lastReset: Date },
  { sinceLastMessage: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { sinceLastMessage: 0 };
  }

  render() {
    return (
      <div className="monospace-numbers tag">
        <div>
          Last transmission received:
          <strong>{this.props.lastReset.toLocaleTimeString()}</strong>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { lastReset } = state.receivedTimer;
  return {
    lastReset
  };
};

export default connect(mapStateToProps)(MessageTimer);
