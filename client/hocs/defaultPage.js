import React from 'react';
import Router from 'next/router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { getTokenFromCookie, getTokenFromStorage } from '../lib/auth';
import withData from '../lib/withData';
import { CONSOLE_MESSAGES } from '../config.json';

// Add a welcome messages to the console!
if (typeof window !== 'undefined' && CONSOLE_MESSAGES) {
  CONSOLE_MESSAGES.forEach(msg => console.log(msg));
}

const defaultPage = Page => {
  return class DefaultPage extends React.Component {
    static async getInitialProps(ctx) {
      const isAuthenticated = !!(process.browser
        ? getTokenFromStorage()
        : getTokenFromCookie(ctx.req));

      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);

      return {
        ...pageProps,
        isAuthenticated,
      };
    }

    componentDidMount() {
      window.addEventListener('storage', this.logout, false);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.logout, false);
    }

    // If we log out of one tab, redirect all tabs to the front page
    logout = event => {
      if (event.key === 'logout') {
        Router.push(`/?logout=${event.newValue}`);
      }
    };

    render() {
      const { data, ...props } = this.props;
      const loggedInUser = data ? data.loggedInUser : null;

      return <Page loggedInUser={loggedInUser} {...props} />;
    }
  };
};

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      userId: id
      role
    }
  }
`;

export default Page =>
  compose(
    withData,
    // Get the user status every 5 minutes if we're on the client
    graphql(LOGGED_IN_USER_QUERY, {
      // No point in checking if our token is valid if there is no token set
      skip: props => !props.isAuthenticated,
      options: {
        pollInterval: 300000,
        //fetchPolicy: 'network-only',
      },
    }),
    defaultPage,
  )(Page);
