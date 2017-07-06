import React, { Component, PropTypes } from 'react';
export default class Footer extends Component {
  renderFilter(filter, name) {
    if(filter == this.props.filter) {
      return name;
    }
    return (
        <a
            href="#"
            onClick={e => {
              e.preventDefault();
              this.props.onFilterChange(filter);
            }}>
          {name}
        </a>
    );
  }
  render() {
    return (
        <p>
          SHOW
          {' '}
          {this.renderFilter('SHOW_ALL', 'All')}
          {', '}
          {this.renderFilter('SHOW_COMPLETED', 'Completed')}
          {', '}
          {this.renderFilter('SHOW_ACTIVE', 'Active')}
          .
        </p>
    );
  }
}
Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};
// import React from 'react'
// import './index.less'

// export default class Footer extends React.Component {
//   constructor () {
//     super()
//   }
//
//   render () {
//     return (
//       <div className="ant-layout-footer">
//       蚁国科技 版权所有 © 2016 www.qiakr.com
//       </div>
//     )
//   }
// }
