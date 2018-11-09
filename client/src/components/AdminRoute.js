import React, { useContext } from 'react';
import UserContext from './UserContext';

export default ({ as: Component, ...props }) => {
  const user = useContext(UserContext);

  return user && user.role === 'ADMIN' ? (
    <Component {...props} />
  ) : (
    <NoAccess />
  );
};

const NoAccess = () => <div>Du har ikke tilgang</div>;
