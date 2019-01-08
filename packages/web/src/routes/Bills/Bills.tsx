import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { styled } from '@splitshare/ui';

import QueryMyBillsContainer from './containers/QueryMyBillsContainer';
import Bill from './components/Bill';

// const WrapStyled = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   grid-row-gap: 25px;
//   grid-column-gap: 25px;
// `;

const SectionWrapStyled = styled.div`
  margin: 45px;

  h3 {
    margin-bottom: 25px;
  }
`;

const ScrollWrapStyled = styled.div`
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 25px;

  & > a {
    margin-right: 25px;
    width: 200px;
  }
`;

const Bills: React.FC<RouteComponentProps> = () => (
  <SectionWrapStyled>
    <QueryMyBillsContainer>
      {({ bills }) => (
        <>
          <h3>Your bills ({bills.length})</h3>
          <ScrollWrapStyled>
            {bills.map(bill => (
              <Bill key={bill.id} bill={bill} />
            ))}
          </ScrollWrapStyled>
        </>
      )}
    </QueryMyBillsContainer>
  </SectionWrapStyled>
);

export default Bills;
