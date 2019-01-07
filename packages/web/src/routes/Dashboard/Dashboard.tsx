import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { styled, ButtonBase } from '@splitshare/ui';
import PageModal, { PageModalInner } from 'src/components/PageModal';
import BillNewOverlay from './components/BillNewOverlay';
import ReceiptNewOverlay from './components/ReceiptNewOverlay';
interface IState {
  showBillNewOverlay: boolean;
  showReceiptNewOverlay: boolean;
}

const ButtonsWrapStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonStyled: any = styled(ButtonBase)`
  padding: 50px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 0 15px;

  &:hover {
    opacity: 0.5;
  }
`;

export default class Dashboard extends React.PureComponent<
  RouteComponentProps,
  IState
> {
  state = {
    showBillNewOverlay: false,
    showReceiptNewOverlay: false,
  };

  toggleBillNewOverlay = () => {
    this.setState(state => ({ showBillNewOverlay: !state.showBillNewOverlay }));
  };

  toggleReceiptNewOverlay = () => {
    this.setState(state => ({
      showReceiptNewOverlay: !state.showReceiptNewOverlay,
    }));
  };

  render() {
    const { showBillNewOverlay, showReceiptNewOverlay } = this.state;

    return (
      <>
        <ButtonsWrapStyled>
          <ButtonStyled onClick={this.toggleBillNewOverlay}>
            Add new bill
          </ButtonStyled>
          <ButtonStyled onClick={this.toggleReceiptNewOverlay}>
            Add new receipt
          </ButtonStyled>
        </ButtonsWrapStyled>
        {showBillNewOverlay ? (
          <PageModal>
            <PageModalInner>
              <BillNewOverlay onCancel={this.toggleBillNewOverlay} />
            </PageModalInner>
          </PageModal>
        ) : null}
        {showReceiptNewOverlay ? (
          <PageModal>
            <PageModalInner>
              <ReceiptNewOverlay onCancel={this.toggleReceiptNewOverlay} />
            </PageModalInner>
          </PageModal>
        ) : null}
      </>
    );
  }
}
