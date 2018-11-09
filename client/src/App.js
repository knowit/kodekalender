import React, { lazy, Suspense } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { Router } from '@reach/router';

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

export default () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ApolloProvider client={apolloClient}>
        <UserContextProvider>
          <Nav />
          <Suspense fallback={<Spinner />} maxDuration={1000}>
            <Router>
              <Home path="/" />
              <About path="about" />
              <Doors path="doors" />
              <Door path="doors/:doorId" />
              <Leaderboard path="leaderboard" />
              <SignedIn path="auth/signed-in" />
              <NotFound default />
            </Router>
          </Suspense>
          <Footer />
        </UserContextProvider>
      </ApolloProvider>
    </Suspense>
  );
};

CONSOLE_GREETINGS.forEach(msg => console.log(msg));
