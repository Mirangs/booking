import React, { useLayoutEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import Login from '../screens/Login';
import Apartments from '../screens/Apartments';
import Vouchers from '../screens/Vouchers';
import Register from '../screens/Register';
import { setUser } from '../store/user/events';
import { restoreByToken as restoreByTokenQuery } from '../queries/user';

const Routes = () => {
  const history = useHistory();
  const [restore, { data }] = useLazyQuery(restoreByTokenQuery);

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return history.push('/login');
    }

    restore({ variables: { token } });
  }, [history]);

  useLayoutEffect(() => {
    if (data) {
      const { restoreByToken } = data;
      setUser({
        email: restoreByToken.email,
        role_name: restoreByToken.role.name,
      });
    }
  }, [data]);

  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signUp'>
        <Register />
      </Route>
      <Route path='/apartments'>
        <Apartments />
      </Route>
      <Route path='/vouchers'>
        <Vouchers />
      </Route>

      <Redirect to='/login' />
    </Switch>
  );
};

export default Routes;
