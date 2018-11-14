import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { useAuthenticated } from '../auth';

const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  // Don't bother with the query if we aren't authenticated
  const authenticated = useAuthenticated();

  return authenticated ? (
    <UserProviderGql>{children}</UserProviderGql>
  ) : (
    children
  );
};

const UserProviderGql = ({ children }) => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return (
    <UserContext.Provider value={data ? data.loggedInUser : null}>
      {children}
    </UserContext.Provider>
  );
};

const CURRENT_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      role
    }
  }
`;

export { UserContext as default, UserContextProvider };
