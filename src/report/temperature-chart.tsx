import React, { Component } from 'react';
import { TempReading } from './report';
import { Scatter } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

class TemperatureChart extends Component<{ readings: TempReading[] }> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Scatter
        data={this.getChartData()}
        options={this.getChartOptions()}
        height={400}
        width={400}
      />
    );
  }

  getChartOptions(): ChartOptions {
    return {
      responsive: true,
      title: {
        display: false,
        text: 'Temperature over time'
      },
      scales: {
        type: 'time',
        scaleLabel: {
          display: true,
          labelString: 'hello'
        }
      }
    };
  }

  getChartData(): ChartData {
    return {
      datasets: [
        {
          label: 'Temperature',

          data: this.props.readings.map((reading, index) => {
            return {
              x: index,
              y: reading.reading
            };
          })
        }
      ]
    };
  }
}

export default TemperatureChart;
