import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    },
  );
  return params;
};

export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { access_token } = getQueryParams();
  return { token: access_token };
};

export const setToken = token => {
  if (!process.browser) {
    return;
  }
  window.localStorage.setItem('token', token);
  Cookie.set('jwt', token);
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  window.localStorage.removeItem('token');
  Cookie.remove('jwt');

  window.localStorage.setItem('logout', Date.now());
};

export const getTokenFromCookie = req => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='));

  if (!jwtCookie) {
    return undefined;
  }
  return jwtCookie.split('=')[1];
};

export const getTokenFromStorage = () => localStorage.getItem('token');
