import React from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { useQuery } from 'react-apollo-hooks';
import { css } from 'react-emotion';
import theme from './style/theme';

import LEADERBOARD_QUERY from './gql/LeaderboardQuery';
import Container from './components/Container';
import Heading from './components/Heading';

// TODO: Show user's avatar in table?
export default () => {
  useDocumentTitle('Kodekalender: Ledertavle');

  const { data, error } = useQuery(LEADERBOARD_QUERY, {
    pollInterval: 60000 * 5, // Refresh every 5 minutes
  });

  let userRank = 1;

  return (
    <Container css={{ marginBottom: '50px' }}>
      <Heading>Ledertavle</Heading>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Plass</th>
              <th>Bruker</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {groupBySolveCount(data.allUsers).map(([doorsSolved, users]) => {
              const rows = (
                <React.Fragment key={doorsSolved}>
                  <tr>
                    <th colSpan="2">{doorsSolved} luker</th>
                  </tr>
                  {users.map(user => (
                    <tr key={user.nickname}>
                      <td>{userRank}.</td>
                      <td>
                        <a href={`https://github.com/${user.nickname}`}>
                          {user.nickname}
                        </a>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
              userRank = userRank + users.length;
              return rows;
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

/**
 * Since graphcool doesn't really allow sorting and grouping on connections, we solve this in userland
 */
function groupBySolveCount(users) {
  // Use a map to group the users by solve count
  const map = new Map();
  users.forEach(user => {
    const count = user._solutionsMeta.count;
    const group = map.get(count);
    if (!group) {
      map.set(count, [user]);
    } else {
      group.push(user);
    }
  });

  // Turn it into an array of tuples
  const tuples = Array.from(map.entries());

  // Finally sort the tuples by the solve count
  return tuples.sort((a, b) => b[0] - a[0]);
}

const styles = {
  tableWrapper: css`
    width: 100%;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  `,
  table: css`
    border-spacing: 0;
    border-collapse: collapse;
    border: none;
    width: 100%;
    tr {
      height: 35px;
      vertical-align: middle;
    }
    td,
    th {
      padding: 4px 56px 4px 24px;
      text-align: left;
      &:first-child {
        width: 1%;
      }
    }
    td {
      border-bottom: 1px solid rgba(224, 224, 224, 1);
    }
    th {
      font-weight: 500;
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
    }
    th[colspan='2'] {
      text-align: center;
    }
    thead th {
      position: sticky;
      top: 0;
    }
    tbody th {
      position: sticky;
      top: 35px;
    }
  `,
};
