import React from 'react';
import styled from 'react-emotion';
import Head from 'next/head';

import defaultPage from '../../hocs/defaultPage';
import { show } from '../../lib/lock';

const CONTAINER_ID = 'auth0-lock-container';

const Screen = styled('div')`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f4f9;
`;

class SignIn extends React.Component {
  componentDidMount() {
    show(CONTAINER_ID);
  }
  render() {
    return (
      <Screen>
        <Head>
          <title>Kodekalender: Logg inn</title>
        </Head>
        <div
          id={CONTAINER_ID}
          style={{
            margin: 'auto',
            boxShadow: '0 10px 20px -10px rgba(0,0,0,.4)',
          }}
        />
      </Screen>
    );
  }
}

export default defaultPage(SignIn);
