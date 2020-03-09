import { Router } from '@reach/router';
import React from 'react';
import Dashboard from './routes/Dashboard';

function AuthorizedApp() {
  return (
    <Router>
      {/* <DashLayout path="/"> */}
      <Dashboard path="/" />
      {/* <NotFound default={true} /> */}
      {/* </DashLayout> */}
    </Router>
  );
}

export default AuthorizedApp;
