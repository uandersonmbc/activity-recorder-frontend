import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from '../screens/Dashboard';
import Reports from '../screens/Reports';
import SingIn from '../screens/SingIn';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login">
        <SingIn />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>

      <Route path="/reports">
        <Reports />
      </Route>
    </BrowserRouter>
  );
};

export default Routes;
