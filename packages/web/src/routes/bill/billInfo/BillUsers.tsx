import { AvatarUser, styled } from '@splitshare/ui';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BILL_DEPTS_QUERY } from '../../../graphql/bill/billDepts';
import { User } from '../../../types';
import BalanceValue from './BalanceValue';

interface IProps {
  billId: string;
  users: User[];
}

const WrapStyled = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 15px;
`;

const NameStyled = styled.span`
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  max-width: 150px;
`;

const BillUsers: React.FC<IProps> = ({ billId, users }) => {
  const { data, error, loading } = useQuery(BILL_DEPTS_QUERY, {
    variables: { id: billId },
  });

  if (error) {
    console.log(error);
  }

  return (
    <>
      {users.map(u => (
        <WrapStyled key={u.id}>
          <AvatarUser name={u.displayName || u.email} />
          <NameStyled>{u.displayName || u.email}</NameStyled>
          <BalanceValue
            loading={loading}
            billDepts={data.billDepts}
            userId={u.id}
          />
        </WrapStyled>
      ))}
    </>
  );
};

export default BillUsers;
