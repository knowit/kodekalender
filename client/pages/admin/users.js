import { graphql, compose } from 'react-apollo';
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Container from '../../components/Container';
import ChallengeList from '../../components/ChallengeList';
import adminPage from '../../hocs/adminPage';

const Users = ({ loggedInUser, data: { error, loading, allUsers } }) => (
  <Layout loggedInUser={loggedInUser}>
    <Container>
      <h1>Users</h1>
      {allUsers &&
        allUsers.map(u => (
          <div key={u.id}>
            {u.id} - {u.email} - {u.role}
          </div>
        ))}
      {error && <div>{error.message}</div>}
      {loading && <span>Loading</span>}
    </Container>
  </Layout>
);

const allUsers = gql`
  query {
    allUsers {
      id
      email
      role
    }
  }
`;

Users.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
};

export default compose(adminPage, graphql(allUsers))(Users);
