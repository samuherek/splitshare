import React from 'react';
import AvatarUser from '../../components/AvatarUser';
import ErrorMessage from '../../components/ErrorMessage';
import { useQueryBill } from '../../graphql/bill/queryBill';
import Typography from '../../ui/components/Typography/Typography';
import { initials } from '../../utils/user';

type Props = {
  billId: string;
};

function MyBalance({ billId }: Props) {
  const { data, loading, error } = useQueryBill({
    id: billId,
    withMeta: false,
    withUsers: false,
    withBalance: true,
  });

  console.log(data);

  return (
    <>
      <Typography component="h4" variant="h4">
        My Balance
      </Typography>
      <div>
        {loading ? (
          <span>...</span>
        ) : data ? (
          <>
            <AvatarUser
              email={data.bill.myBalance.user.email}
              fallback={initials(data.bill.myBalance.user)}
            />
            <span>
              {data.bill.myBalance.value} {data.bill.myBalance.currency}
            </span>
          </>
        ) : null}
      </div>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default MyBalance;
