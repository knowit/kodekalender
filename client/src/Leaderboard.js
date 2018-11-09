import React from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { useApolloQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import Heading from './components/Heading';

export default () => {
  useDocumentTitle('Kodekalender: Ledertavle');

  const { data, error } = useApolloQuery(ALL_USERS_QUERY);

  return (
    <>
      <Heading>Ledertavle</Heading>
      <table>
        <tbody>
          {data.allUsers.map(u => (
            <tr key={u.email}>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
    }
  }
`;
