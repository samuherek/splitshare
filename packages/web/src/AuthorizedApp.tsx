import { globalHistory, Router } from '@reach/router';
import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import Bill from './routes/Bill';
import Dashboard from './routes/Dashboard';
import Invite from './routes/Invite';
import Setup from './routes/Setup';
import Verify from './routes/Verify';

function AuthorizedApp() {
  return (
    <>
      <QueryParamProvider reachHistory={globalHistory}>
        <Router>
          <Dashboard path="/" />
          <Bill path="/:billParam/*" />
          <Verify path="/verify" />
          <Setup path="/setup/*" />
          <Invite path="/invite/*" />
          {/* <NotFound default={true} /> */}
        </Router>
      </QueryParamProvider>
    </>
  );
}

export default AuthorizedApp;
