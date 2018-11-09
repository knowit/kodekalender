import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import defaultPage from '../../hocs/defaultPage';
import { setToken, checkSecret, extractInfoFromHash } from '../../lib/auth';
import Centered from '../../components/Centered';

class SignedIn extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    const { token } = extractInfoFromHash();
    if (!token) {
      console.error('Something happened with the Sign In request');
    }
    // We validate the token from auth0 in our own backend
    // and generate our own tokens
    const response = await this.props.authenticateUser(token);
    const graphcoolToken = response.data.authenticateUser.token;
    setToken(graphcoolToken);
    Router.push('/');
  }

  render() {
    return (
      <Centered>
        <h1>Autentiserer, vennligst vent...</h1>
      </Centered>
    );
  }
}

const authenticateUser = gql`
  mutation($idToken: String!) {
    authenticateUser(accessToken: $idToken) {
      id
      token
    }
  }
`;

export default compose(
  defaultPage,
  graphql(authenticateUser, {
    props: ({ mutate }) => ({
      authenticateUser: idToken => mutate({ variables: { idToken } }),
    }),
  }),
)(SignedIn);
