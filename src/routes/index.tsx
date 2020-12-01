import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from '../screens/Dashboard';
import SingIn from '../screens/SingIn';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact={true}>
        <SingIn />
      </Route>
      <Route path="/dashboard" exact={true}>
        <Dashboard />
      </Route>
    </BrowserRouter>
  );
};

export default Routes;
