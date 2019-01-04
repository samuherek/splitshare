import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import BillNewOverlay from './components/BillNewOverlay';
import { Button, styled } from '@splitshare/ui';
import PageModal, { PageModalInner } from 'src/components/PageModal';
import QueryMyBillsContainer from './containers/QueryMyBillsContainer';
import Bill from './components/Bill';

interface IState {
  showBillNewOverlay: boolean;
}

const WrapStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default class Bills extends React.PureComponent<
  RouteComponentProps,
  IState
> {
  public state = {
    showBillNewOverlay: false,
  };

  public toggleBillNewOverlay = () => {
    this.setState(state => ({ showBillNewOverlay: !state.showBillNewOverlay }));
  };

  public render() {
    const { showBillNewOverlay } = this.state;

    return (
      <div>
        <div>Bills</div>
        <Button onClick={this.toggleBillNewOverlay}>Add new bill</Button>
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
        {showBillNewOverlay ? (
          <PageModal>
            <PageModalInner>
              <BillNewOverlay onCancel={this.toggleBillNewOverlay} />
            </PageModalInner>
          </PageModal>
        ) : null}
      </div>
    );
  }
}
