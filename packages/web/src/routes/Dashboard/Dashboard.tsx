import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button } from '@splitshare/ui';
import PageModal, { PageModalInner } from 'src/components/PageModal';
import BillNewOverlay from './components/BillNewOverlay';
import ReceiptNewOverlay from './components/ReceiptNewOverlay';
interface IState {
  showBillNewOverlay: boolean;
  showReceiptNewOverlay: boolean;
}
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
      <div>
        <Button onClick={this.toggleBillNewOverlay}>Add new bill</Button>
        <Button onClick={this.toggleReceiptNewOverlay}>Add new receipt</Button>
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
      </div>
    );
  }
}
