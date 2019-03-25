import React, { Component } from 'react';

class Paginator extends Component<
  { manyPages: number; onPageChange: any },
  { currentPage: number }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  render() {
    return (
      <nav className="pagination" role="navigation" aria-label="pagination">
        <a className="pagination-previous" onClick={e => this.previousPage()}>
          Previous
        </a>
        <a className="pagination-next" onClick={e => this.nextPage()}>
          Next page
        </a>
        <ul className="pagination-list">
          {/* First page */}
          {this.pageButton(1)}

          {/* Ellipsis */}
          {this.leftEllipsisSection()}

          {/* Middle 3 */}
          {this.middleButtons()}

          {/* Ellipsis */}
          {this.rightEllipsisSection()}

          {/*Last Page*/}
          {this.pageButton(this.props.manyPages)}
        </ul>
      </nav>
    );
  }

  leftEllipsisSection() {
    return this.state.currentPage >= 1 && this.state.currentPage <= 4
      ? this.pageButton(2)
      : this.ellipsis();
  }

  rightEllipsisSection() {
    return this.state.currentPage >= this.props.manyPages - 3
      ? this.pageButton(this.props.manyPages - 1)
      : this.ellipsis();
  }

  ellipsis() {
    return (
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    );
  }

  middleButtons() {
    const { manyPages } = this.props;
    const { currentPage } = this.state;
    let middlePages: number[] = [];

    switch (currentPage) {
      case 1:
      case 2:
      case 3:
        middlePages = [3, 4, 5];
        break;
      case manyPages:
      case manyPages - 1:
      case manyPages - 2:
        middlePages = [manyPages - 4, manyPages - 3, manyPages - 2];
        break;
      default:
        middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }

    return middlePages.map(page => {
      return this.pageButton(page);
    });
  }

  pageButton(page: number) {
    return (
      <li>
        <a
          key={page}
          className={this.linkClass(page)}
          aria-label={'Goto page ' + page}
          onClick={e => this.gotoPage(page)}>
          {page}
        </a>
      </li>
    );
  }

  linkClass(page: number): string {
    let base = 'pagination-link';
    return page === this.state.currentPage ? base + ' is-current' : base;
  }

  nextPage() {
    this.gotoPage(this.state.currentPage + 1);
  }

  previousPage() {
    this.gotoPage(this.state.currentPage - 1);
  }

  gotoPage(page: number) {
    this.setState({ currentPage: page });
    this.props.onPageChange(page);
  }
}

export default Paginator;
