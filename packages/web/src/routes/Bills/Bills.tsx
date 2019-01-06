import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { styled } from '@splitshare/ui';

import QueryMyBillsContainer from './containers/QueryMyBillsContainer';
import Bill from './components/Bill';

const WrapStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const Bills: React.FC<RouteComponentProps> = () => (
  <div>
    <div>Bills</div>
    <WrapStyled>
      <QueryMyBillsContainer>
        {({ bills }) => (
          <>
            {bills.map(bill => (
              <Bill key={bill.id} bill={bill} />
            ))}
          </>
        )}
      </QueryMyBillsContainer>
    </WrapStyled>
  </div>
);

export default Bills;
