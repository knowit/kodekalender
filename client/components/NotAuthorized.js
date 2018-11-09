import React from 'react';
import Link from 'next/link';
import Box from '../components/Box';
import Layout from '../components/Layout';

const NotAuthorized = () => (
  <Box textAlign="center">
    <p>Du kan ikke aksessere denne siden fordi du ikke er autentisert.</p>

    <p>
      Kanskje du burde stikke innom{' '}
      <Link href="/auth/sign-in" prefetch>
        <a>innloggingsiden</a>
      </Link>{' '}
      for å gjøre det?
    </p>
  </Box>
);

export default NotAuthorized;
