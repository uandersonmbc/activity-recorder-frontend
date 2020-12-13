import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../screens/Main';
import SingIn from '../screens/SingIn';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login">
        <SingIn />
      </Route>

      <Route path="/">
        <Main />
      </Route>
    </BrowserRouter>
  );
};

export default Routes;
