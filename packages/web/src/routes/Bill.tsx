import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { useQueryBill } from '../graphql/bill/queryBill';
import { BillUser } from '../graphql/types';
import ButtonBase from '../ui/ButtonBase';
import ErrorMessage from '../ui/ErrorMessage';
import Typography from '../ui/Typography';
import { getUUIDFromUrl } from '../utils/url';
import BillUserItem from './bill/BillUserItem';
import RemoveBillUserDialog from './bill/RemoveBillUserDialog';

type Props = RouteComponentProps & {
  billParam?: string;
};

const WrapStyled = styled.div``;

function Bill({ billParam }: Props) {
  const billParamId = billParam ? getUUIDFromUrl(billParam) : null;
  const billId = billParamId || '';

  const { data, error } = useQueryBill({
    id: billId,
    queryOpts: { skip: !billId },
  });

  const [
    billUserToDelete,
    setBillUserToDelete,
  ] = React.useState<BillUser | null>(null);

  const bill = data?.bill;

  if (!bill) {
    return null;
  }

  return (
    <>
      <WrapStyled>
        <ButtonBase to="/">Back</ButtonBase>
        <Typography component="h2">{bill.name}</Typography>
        {bill.users?.map(user => (
          <BillUserItem
            key={user.id}
            billUser={user}
            onDelete={setBillUserToDelete}
          />
        ))}
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
