import React, { Component } from 'react';
import { TempReading } from './report';

class TemperatureTable extends Component<{ readings: TempReading[] }> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <table className="table is-hoverable is-bordered is-striped">
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Time Recorded</th>
          </tr>
        </thead>
        <tbody>
          {this.props.readings
            .map((reading, index) => {
              return (
                <tr key={index}>
                  <td>{reading.reading}</td>
                  <td>{`${reading.time.toDateString()} ${reading.time.toLocaleTimeString()}`}</td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    );
  }
}

export default TemperatureTable;
