import React from 'react';

import { unsetToken } from '../../lib/auth';
import { logout } from '../../lib/lock';

export default class SignOff extends React.Component {
  componentDidMount() {
    unsetToken();
    logout();
  }
  render() {
    return null;
  }
}
