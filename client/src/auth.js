import auth0 from 'auth0-js';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

import apolloClient from './apolloClient';
import config from '../config.json';
import { CURRENT_USER_QUERY } from './components/UserContext';

const STORAGE_KEY = 'access_token';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: config.AUTH0_CLIENT_DOMAIN,
    clientID: config.AUTH0_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/signed-in`,
    responseType: 'id_token',
    scope: 'openid profile',
  });

  listeners = new Set();

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      // wow.. callbacks in 2018 :|
      this.auth0.parseHash(async (err, authResult) => {
        if (err || !authResult || !authResult.idToken) {
          return reject(err || new Error('Unable to get id token'));
        }

        const { data, error } = await apolloClient.mutate({
          mutation: AUTHENTICATE_USER,
          variables: { idToken: authResult.idToken },
          update: (cache, { data: { authenticateUser }, error }) => {
            // Manually write to the cache
            // This is really fragile... adding our own typename and stuff. But it speeds things up so much
            if (!error && authenticateUser && authenticateUser.id)
              cache.writeQuery({
                query: CURRENT_USER_QUERY,
                data: {
                  loggedInUser: {
                    id: authenticateUser.id,
                    __typename: 'LoggedInUserPayload',
                  },
                },
              });
          },
        });

        if (error || !data.authenticateUser.token) {
          return reject(error);
        }

        localStorage.setItem(STORAGE_KEY, data.authenticateUser.token);

        resolve(data);
        this.listeners.forEach(cb => cb(true));
      });
    });
  }

  addAuthenticatedListener = cb => this.listeners.add(cb);

  removeAuthenticatedListener = cb => this.listeners.delete(cb);

  logout = () => {
    // Clear the access token and clear the apollo store
    localStorage.removeItem(STORAGE_KEY);
    apolloClient.resetStore();
    this.auth0.logout();
    this.listeners.forEach(cb => cb(false));
  };

  login = () => {
    this.auth0.authorize();
  };
}

const AUTHENTICATE_USER = gql`
  mutation($idToken: String!) {
    authenticateUser(idToken: $idToken) {
      id
      token
    }
  }
`;

const auth = new Auth();
export default auth;

export function useAuthenticated() {
  const [localState, updateLocalState] = useState(
    Boolean(localStorage.getItem(STORAGE_KEY)),
  );

  function syncIsAuthed(authenticated) {
    updateLocalState(authenticated);
  }

  useEffect(() => {
    auth.addAuthenticatedListener(syncIsAuthed);
    return () => {
      auth.removeAuthenticatedListener(syncIsAuthed);
    };
  }, []);

  return localState;
}
