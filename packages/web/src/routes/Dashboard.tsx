import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useAuth0 } from '../Auth0/Auth0Provider';
import { useQueryBills } from '../graphql/bill/queryBills';
import { BillStatus } from '../graphql/types';
import Button from '../ui/Button';
import { useDialogState } from '../ui/Dialog';
import ErrorMessage from '../ui/ErrorMessage';
import CreateBillDialog from './dashboard/CreateBillDialog';

const Dashboard = (props: RouteComponentProps) => {
  const { logout } = useAuth0();
  const { isOpen, openDialog, closeDialog } = useDialogState();

  const { data, error } = useQueryBills({
    status: BillStatus.Opened,
  });

  return (
    <>
      <Button onClick={logout}>Log out</Button>
      <h2 style={{ marginRight: 24 }}>Opened bills </h2>
      <Button onClick={openDialog}>Start a bill</Button>
      {data?.bills?.edges?.map(edge => (
        <div key={edge.node.id}>{edge.node.name}</div>
      ))}
      <CreateBillDialog isOpen={isOpen} onClose={closeDialog} />
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
};

export default Dashboard;
