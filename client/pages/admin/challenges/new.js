import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';

import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import adminPage from '../../../hocs/adminPage';
import ChallengeForm from '../../../components/ChallengeForm';

const Challenge = ({ loggedInUser, createChallenge }) => (
  <Layout loggedInUser={loggedInUser}>
    <Head>
      <title>Kodekalender: Ny oppgave</title>
    </Head>
    <Container>
      <ChallengeForm saveChallenge={createChallenge} />
    </Container>
  </Layout>
);

const createChallenge = gql`
  mutation createChallenge(
    $title: String!
    $markdown: String!
    $answer: String!
    $published: Boolean!
    $activeFrom: DateTime
    $activeTo: DateTime
    $notes: String
    $discussionUrl: String
  ) {
    createChallenge(
      title: $title
      markup: " "
      markdown: $markdown
      answer: $answer
      published: $published
      activeFrom: $activeFrom
      activeTo: $activeTo
      notes: $notes
      discussionUrl: $discussionUrl
    ) {
      id
      title
      markdown
      answer
      activeFrom
      activeTo
      notes
      discussionUrl
    }
  }
`;

export default compose(
  adminPage,
  graphql(createChallenge, {
    props: ({ mutate }) => ({
      createChallenge: challenge => mutate({ variables: challenge }),
    }),
  }),
)(Challenge);
