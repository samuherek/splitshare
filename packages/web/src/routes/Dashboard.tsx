import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useQueryBills } from '../graphql/bill/queryBills';
import { BillStatus } from '../graphql/types';
import ErrorMessage from '../ui/ErrorMessage';

const Dashboard = (props: RouteComponentProps) => {
  // const { isOpen, openDialog, closeDialog } = useDialogState();
  const { data, loading, error } = useQueryBills({
    status: BillStatus.Opened,
  });

  console.log(data, loading, error);

  // const {data , error } = useBillsQuery({
  //   status: BillStatus.Opened,
  // });

  return (
    <>
      <h2 style={{ marginRight: 24 }}>Opened bills </h2>
      {/* <Button onClick={openDialog} variant="contained" color="primary"> */}
      Start a bill
      {/* </Button> */}
      {data?.bills?.edges?.map(edge => (
        <div key={edge.node.id}>{edge.node.name}</div>
      ))}
      {/*
      <CreateBillDialog isOpen={isOpen} onClose={closeDialog}/>
*/}
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
};

export default Dashboard;
