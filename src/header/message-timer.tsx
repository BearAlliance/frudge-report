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
          Last transmission received: {this.state.sinceLastMessage}s ago
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    setInterval(
      () =>
        // TODO: this smells like a race condition
        this.setState({
          sinceLastMessage:
            this.props.lastReset.getTime() >= Date.now() - 100
              ? 0
              : this.state.sinceLastMessage + 1
        }),
      1000
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
