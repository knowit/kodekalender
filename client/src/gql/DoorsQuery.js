import gql from 'graphql-tag';

export default gql`
  query doors($userId: ID) {
    allChallenges(filter: { published: true }, orderBy: activeFrom_ASC) {
      id
      activeFrom
      _solutionsMeta(filter: { solved: true, user: { id: $userId } }) {
        count
      }
    }
  }
`;
