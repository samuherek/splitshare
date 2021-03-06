import { globalHistory, Router } from '@reach/router';
import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import Bill from './routes/Bill';
import Dashboard from './routes/Dashboard';
import ImportBill from './routes/ImportBill';
import Invite from './routes/Invite';
import Settings from './routes/Settings';
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
          <Settings path="/settings" />
          <ImportBill path="/import-bill" />
          {/* <NotFound default={true} /> */}
        </Router>
      </QueryParamProvider>
    </>
  );
}

export default AuthorizedApp;
