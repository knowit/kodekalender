import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useApolloQuery } from 'react-apollo-hooks';
import useDocumentTitle from '@rehooks/document-title';

import UserContext from './components/UserContext';
import Container from './components/Container';
import RevealAnswer from './components/RevealAnswer';
import GiveAnswer from './components/GiveAnswer';
import Terminal from './components/Terminal';
import Heading from './components/Heading';

const Door = ({ doorId }) => {
  const user = useContext(UserContext);

  const { data, error } = useApolloQuery(GET_DOOR, {
    variables: { id: doorId, userId: user ? user.id : null },
  });

  useDocumentTitle(`Kodekalender: ${data.door.title}`);

  const hasExpired = data.door && new Date(data.door.activeTo) < new Date();
  const isSolved = data.door && data.door._solutionsMeta.count > 0;

  return (
    <Container>
      <Heading>{data.door.title}</Heading>
      <Terminal>
        <div dangerouslySetInnerHTML={{ __html: data.door.markup }} />
      </Terminal>
      {(isSolved || hasExpired) && <RevealAnswer doorId={doorId} />}

      {/* , show the answer form */}
      {!hasExpired && <GiveAnswer doorId={doorId} />}
    </Container>
  );
};

const GET_DOOR = gql`
  query getDoor($id: ID!, $userId: ID) {
    door: Challenge(id: $id) {
      id
      title
      markup
      activeFrom
      activeTo
      _solutionsMeta(
        first: 1
        filter: { solved: true, user: { id: $userId } }
      ) {
        count
      }
    }
  }
`;

export default Door;
