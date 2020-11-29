import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SingIn from '../screens/SingIn';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact={true}>
        <SingIn />
      </Route>
    </BrowserRouter>
  );
};

export default Routes;
