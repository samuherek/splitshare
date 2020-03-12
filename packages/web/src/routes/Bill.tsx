import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { useQueryBill } from '../graphql/bill/queryBill';
import { BillUser } from '../graphql/types';
import ButtonBase from '../ui/ButtonBase';
import ErrorMessage from '../ui/ErrorMessage';
import Typography from '../ui/Typography';
import { getUUIDFromUrl } from '../utils/url';
import AddBillUserAction from './bill/AddBillUserAction';
import BillSettingsDialog from './bill/BillSettingsDialog';
import BillUserItem from './bill/BillUserItem';
import Receipts from './bill/Receipts';
import RemoveBillUserDialog from './bill/RemoveBillUserDialog';

type Props = RouteComponentProps & {
  billParam?: string;
};

const WrapStyled = styled.div`
  padding: 24px;
`;

function Bill({ billParam, navigate }: Props) {
  const billParamId = billParam ? getUUIDFromUrl(billParam) : null;
  const billId = billParamId || '';

  const { data, loading, error } = useQueryBill({
    id: billId,
    queryOpts: { skip: !billId },
  });

  const [
    billUserToDelete,
    setBillUserToDelete,
  ] = React.useState<BillUser | null>(null);

  const bill = data?.bill;

  if (!bill) {
    if (!loading) {
      return <Redirect to="/" />;
    }
    return null;
  }

  return (
    <>
      <WrapStyled>
        <ButtonBase to="/">Back</ButtonBase>
        <Typography component="h2">{bill.name}</Typography>
        {bill.closedAt ? (
          <span style={{ background: 'red', padding: 4, borderRadius: 4 }}>
            Archived
          </span>
        ) : null}
        <BillSettingsDialog bill={bill} />
        <Receipts bill={bill} />
        <Typography component="h4" variant="h4">
          Participants
        </Typography>
        {bill.users?.map(user => (
          <BillUserItem
            key={user.id}
            billUser={user}
            onDelete={setBillUserToDelete}
          />
        ))}
        <AddBillUserAction billId={billId} />
      </WrapStyled>
      <RemoveBillUserDialog
        billUser={billUserToDelete}
        billId={billId}
        callback={() => setBillUserToDelete(null)}
      />
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default Bill;
