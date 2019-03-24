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
          Last transmission received at: {this.formatDate(this.props.lastReset)}
        </div>
      </div>
    );
  }

  formatDate(date: Date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}

const mapStateToProps = (state: any) => {
  const { lastReset } = state.receivedTimer;
  return {
    lastReset
  };
};

export default connect(mapStateToProps)(MessageTimer);
