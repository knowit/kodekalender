import React from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { css } from 'react-emotion';

import Container from './components/Container';
import Heading from './components/Heading';

export default () => {
  useDocumentTitle('Kodekalender: Ledertavle');

  const { data, error } = useQuery(LEADERBOARD_QUERY);

  return (
    <Container>
      <Heading>Ledertavle</Heading>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Plass</th>
            <th>Bruker</th>
            <th>Luker</th>
          </tr>
        </thead>
        <tbody>
          {data.allUsers.map((user, index) => (
            <tr key={user.nickname}>
              <td>{index + 1}</td>
              <td>
                <a href={`https://github.com/${user.nickname}`}>
                  {user.nickname}
                </a>
              </td>
              <td>{user._solutionsMeta.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

const LEADERBOARD_QUERY = gql`
  query leaderboard {
    allUsers {
      nickname
      picture
      _solutionsMeta {
        count
      }
    }
  }
`;

const styles = {
  table: css`
    width: 100%;
  `,
};
