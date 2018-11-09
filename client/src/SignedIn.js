import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

import auth from './auth';

/**
 * TODO: Make it prettier and handle login error
 */
export default () => {
  useEffect(() => {
    auth.handleAuthentication().then(navigate('/'));
  }, []);

  return <div>Autentiserer</div>;
};
