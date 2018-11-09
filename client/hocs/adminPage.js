import React from 'react';
import PropTypes from 'prop-types';

import NotAuthorized from '../components/NotAuthorized';
import Error from '../pages/_error';
import securePage from './securePage';

const adminPageHoc = Page =>
  class AdminPage extends React.Component {
    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx);
    }
    static propTypes = {
      loggedInUser: PropTypes.shape({
        role: PropTypes.oneOf(['USER', 'ADMIN']).isRequired,
      }).isRequired,
    };
    render() {
      if (
        !this.props.loggedInUser ||
        this.props.loggedInUser.role !== 'ADMIN'
      ) {
        return <Error statusCode={403} />;
      }
      return <Page {...this.props} />;
    }
  };

export default Page => securePage(adminPageHoc(Page));
