import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';

import auth from './auth';

export default () => {
  const [oopsie, setOopsie] = useState(false);

  useEffect(() => {
    auth
      .handleAuthentication()
      .then(() => navigate('/'))
      .catch(() => setOopsie(true));
  }, []);

  return (
    <div
      css={`
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
      `}
    >
      Autentiserer...
      {oopsie && (
        <>
          <p>Noe gikk galt :(</p>
          <a href="/">Jeg vil vekk fra denne siden</a>
        </>
      )}
    </div>
  );
};
