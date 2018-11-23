import React, { lazy, Suspense } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { Router } from '@reach/router';
import { hot, setConfig } from 'react-hot-loader';

import { CONSOLE_GREETINGS } from '../config.json';
import apolloClient from './apolloClient';
import { UserContextProvider } from './components/UserContext';
import NotFound from './NotFound';
import Home from './Home';
import SignedIn from './SignedIn';
import Nav from './components/Nav';
import Spinner from './components/Spinner';
import Footer from './components/Footer';
import globalStyles from './style/globalStyles';

const About = lazy(() => import('/About'));
const Doors = lazy(() => import('./Doors'));
const Door = lazy(() => import('./Door'));
const Leaderboard = lazy(() => import('./Leaderboard'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <SignedIn path="auth/signed-in" />
          <Layout path="*" />
        </Router>
      </ApolloProvider>
    </Suspense>
  );
};

const Layout = () => (
  <UserContextProvider>
    <div
      css={`
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 100%;
      `}
    >
      <Nav />
      <Suspense fallback={<Spinner />} maxDuration={1000}>
        <Router>
          <Home path="/" />
          <About path="about" />
          <Doors path="doors" />
          <Door path="doors/:doorId" />
          <Leaderboard path="leaderboard" />
          <NotFound default />
        </Router>
      </Suspense>
      <Footer />
    </div>
  </UserContextProvider>
);

CONSOLE_GREETINGS.forEach(msg => console.log(msg));

// Fix for hot reloading with hooks. See https://twitter.com/jlengstorf/status/1058170397806407680
setConfig({ pureSFC: true });
export default hot(module)(App);
