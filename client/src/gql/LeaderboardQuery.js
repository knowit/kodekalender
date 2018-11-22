import gql from 'graphql-tag';

// We only get users that have solved at least one door
export default gql`
  query leaderboard {
    allUsers(filter: { solutions_some: { solved: true } }) {
      nickname
      _solutionsMeta(filter: { solved: true }) {
        count
      }
    }
  }
`;
