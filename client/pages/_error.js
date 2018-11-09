import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import Centered from '../components/Centered';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Centered>
        <h1>Oopsie... {this.props.statusCode}</h1>
        <p>
          Something happened here, maybe it was us, maybe it was you. Who knows?
        </p>
        <span css={`white-space: nowrap; font-size: 40px`}>¯\_(ツ)_/¯</span>
      </Centered>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: 418,
};
