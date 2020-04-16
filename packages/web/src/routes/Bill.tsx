import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import AvatarUser from '../components/AvatarUser';
import ErrorMessage from '../components/ErrorMessage';
import { useQueryBill } from '../graphql/bill/queryBill';
import { BillUser } from '../graphql/types';
import ButtonBase from '../ui/components/ButtonBase';
import Typography from '../ui/components/Typography';
import { getUUIDFromUrl } from '../utils/url';
import { initials } from '../utils/user';
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
  display: grid;
  grid-template-columns: 2fr 1fr;
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

  // if (!bill) {
  //   if (!loading) {
  //     // return <Redirect to="/" />;
  //   }
  //   return null;
  // }

  return (
    <>
      {bill ? (
        <>
          <WrapStyled>
            <div>
              <ButtonBase to="/">Back</ButtonBase>
              <Typography component="h2">{bill.name}</Typography>
              {bill.closedAt ? (
                <span
                  style={{ background: 'red', padding: 4, borderRadius: 4 }}
                >
                  Archived
                </span>
              ) : null}
              <BillSettingsDialog bill={bill} />
              <Receipts bill={bill} />
            </div>
            <div>
              <Typography component="h4" variant="h4">
                My Balance
              </Typography>
              <div>
                <AvatarUser
                  email={bill.myBalance.user.email}
                  fallback={initials(bill.myBalance.user)}
                />
                <span>
                  {bill.myBalance.value} {bill.myBalance.currency}
                </span>
              </div>
              <br />
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
            </div>
          </WrapStyled>
          <RemoveBillUserDialog
            billUser={billUserToDelete}
            billId={billId}
            callback={() => setBillUserToDelete(null)}
          />
        </>
      ) : null}
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default Bill;
