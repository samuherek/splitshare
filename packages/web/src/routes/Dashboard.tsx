import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import { useAuth0 } from '../Auth0/Auth0Provider';
import ErrorMessage from '../components/ErrorMessage';
import { useQueryBills } from '../graphql/bill/queryBills';
import { BillStatus } from '../graphql/types';
import { useDateUtils } from '../libs/date-utils';
import { getBillPath } from '../paths';
import { useDialogState } from '../ui/components/Dialog';
import Typography from '../ui/components/Typography';
import Button from '../ui/theme/Button';
import { timeAgo } from '../utils/date';
import { mergeQueryState } from '../utils/graphql';
import CreateBillDialog from './dashboard/CreateBillDialog';
import Notifications from './dashboard/Notifcations';

const Dashboard = (props: RouteComponentProps) => {
  const { logout } = useAuth0();
  const dateUtils = useDateUtils();

  const { isOpen, openDialog, closeDialog } = useDialogState();

  const opened = useQueryBills({
    status: BillStatus.Opened,
    withUsers: true,
  });

  const archived = useQueryBills({
    status: BillStatus.Closed,
    withUsers: true,
  });

  const { error, loading } = mergeQueryState(opened, archived);

  return (
    <>
      <Notifications />
      <Button onClick={logout}>Log out</Button>
      <Button onClick={openDialog}>Start a bill</Button>
      <Button to="settings">Profile</Button>
      <Button to="import-bill">Import bill</Button>
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
            <span>{dateUtils.timeAgo(node.updatedAt)}</span>
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
        onRefetch={() => {
          opened.refetch();
        }}
        onClose={() => {
          // opened.refetch();
          closeDialog();
        }}
      />
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
};

export default Dashboard;
