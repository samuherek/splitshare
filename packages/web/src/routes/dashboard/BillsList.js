import { CardBillBig, styled } from '@splitshare/ui';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { MY_BILLS_QUERY } from 'src/graphql/MyBillsQuery';
import convertSpaceToDash from 'src/utils/convertSpaceToDash';

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
  const { data, error } = useQuery(MY_BILLS_QUERY, { suspend: true });

  if (error) {
    return <div>{`Error! ${error.message}`}</div>;
  }

  console.log(data);
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
