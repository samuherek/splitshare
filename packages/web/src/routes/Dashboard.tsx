import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import { useAuth0 } from '../Auth0/Auth0Provider';
import { useQueryBills } from '../graphql/bill/queryBills';
import { BillStatus } from '../graphql/types';
import { getBillPath } from '../paths';
import Button from '../ui/Button';
import { useDialogState } from '../ui/Dialog';
import ErrorMessage from '../ui/ErrorMessage';
import Typography from '../ui/Typography';
import { timeAgo } from '../utils/date';
import { mergeQueryState } from '../utils/graphql';
import CreateBillDialog from './dashboard/CreateBillDialog';

const Dashboard = (props: RouteComponentProps) => {
  const { logout } = useAuth0();
  const { isOpen, openDialog, closeDialog } = useDialogState();

  const opened = useQueryBills({
    status: BillStatus.Opened,
  });

  const archived = useQueryBills({
    status: BillStatus.Closed,
  });

  const { error, loading } = mergeQueryState(opened, archived);

  return (
    <>
      <Button onClick={logout}>Log out</Button>
      <Button onClick={openDialog}>Start a bill</Button>
      <h2 style={{ marginRight: 24 }}>Opened bills </h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        opened.data?.bills?.edges?.map(({ node }) => (
          <div
            key={node.id}
            style={{ display: 'flex', flexDirection: 'column', padding: 8 }}
          >
            <Typography variable="h3" component="h3">
              <Link to={getBillPath(node.name, node.id)}>{node.name}</Link>
            </Typography>
            <span>{timeAgo(node.updatedAt)}</span>
            <span>{node.users.length} participants</span>
          </div>
        ))
      )}
      <h2 style={{ marginRight: 24 }}>Archived bills </h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        archived.data?.bills?.edges?.map(({ node }) => (
          <div
            key={node.id}
            style={{ display: 'flex', flexDirection: 'column', padding: 8 }}
          >
            <Typography variable="h3" component="h3">
              <Link to={getBillPath(node.name, node.id)}>{node.name}</Link>
            </Typography>
            <span>{timeAgo(node.updatedAt)}</span>
            <span>{node.users.length} participants</span>
          </div>
        ))
      )}
      <CreateBillDialog
        isOpen={isOpen}
        onClose={() => {
          opened.refetch();
          closeDialog();
        }}
      />
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
};

export default Dashboard;
