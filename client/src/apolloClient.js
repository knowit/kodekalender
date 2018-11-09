import ApolloClient from 'apollo-boost';

import { GRAPHQL_ENDPOINT } from '../config.json';

/**
 * Configure an instance of Apollo client with the GraphQL endpoint that also attaches
 * our authentication with the request if we are logged in.
 */
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  request: operation => {
    const authToken = localStorage.getItem('access_token');
    operation.setContext({
      headers: { authorization: authToken ? `Bearer ${authToken}` : null },
    });
  },
});

export default client;
