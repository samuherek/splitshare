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
import CreateBillDialog from './dashboard/CreateBillDialog';

const Dashboard = (props: RouteComponentProps) => {
  const { logout } = useAuth0();
  const { isOpen, openDialog, closeDialog } = useDialogState();

  const { data, error, refetch } = useQueryBills({
    status: BillStatus.Opened,
  });

  return (
    <>
      <Button onClick={logout}>Log out</Button>
      <h2 style={{ marginRight: 24 }}>Opened bills </h2>
      <Button onClick={openDialog}>Start a bill</Button>
      {data?.bills?.edges?.map(({ node }) => (
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
      ))}
      <CreateBillDialog
        isOpen={isOpen}
        onClose={() => {
          refetch();
          closeDialog();
        }}
      />
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
};

export default Dashboard;
