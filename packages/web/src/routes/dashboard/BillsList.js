import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { CardBillBig, styled } from '@splitshare/ui';
import { MY_BILLS_QUERY } from 'src/graphql/MyBillsQuery';
import convertSpaceToDash from '../../utils/convertSpaceToDash';

const ScrollWrapStyled = styled.div`
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 25px;

  & > a {
    margin-right: 25px;
    width: 280px;
  }
`;

const BillsList = () => {
  const { data, error } = useQuery(MY_BILLS_QUERY);
  if (error) {
    return <div>{`Error! ${error.message}`}</div>;
  }

  return (
    <React.Fragment>
      <h3 style={{ fontSize: 28 }}>Opened Bills ({data.myBills.length})</h3>
      <ScrollWrapStyled>
        {data.myBills.map(bill => (
          <CardBillBig
            key={bill.id}
            title={bill.name}
            users={bill.users}
            to={`/${convertSpaceToDash(bill.name)}-${bill.id}`}
            updatedAt={bill.updatedAt}
            icon={bill.icon}
            invites={bill.invites}
          />
        ))}
      </ScrollWrapStyled>
    </React.Fragment>
  );
};

export default BillsList;
