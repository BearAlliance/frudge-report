import React, { Component } from 'react';
import Paginator from './paginator';

class ReportHistorical extends Component {
  render() {
    return (
      <div>
        <Paginator
          manyPages={20}
          onPageChange={(page: number) => this.handlePageChange(page)}
        />
      </div>
    );
  }

  handlePageChange(page: number) {
    console.log(page);
  }
}

export default ReportHistorical;
