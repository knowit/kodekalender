// import uuid from 'uuid';
import { setSecret } from './auth';

const getLock = options => {
  const config = require('../config.json');
  const Auth0Lock = require('auth0-lock').default;
  return new Auth0Lock(
    config.AUTH0_CLIENT_ID,
    config.AUTH0_CLIENT_DOMAIN,
    options,
  );
};

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const getOptions = container => {
  //const secret = uuid.v4();
  //setSecret(secret);
  return {
    container,
    closable: false,
    oidcConformant: true,
    auth: {
      responseType: 'token',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      audience: 'programming-ladder/graphcool', // TODO: Remove hard coded value
      params: {
        scope: 'openid profile email',
        // state: secret,
      },
    },
    theme: {
      logo: '/static/knowit_symbol_black_white_rgb.png',
      primaryColor: '#000',
    },
  };
};

export const show = container => getLock(getOptions(container)).show();
export const logout = () => getLock().logout({ returnTo: getBaseUrl() });
