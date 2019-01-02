import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import BillNewOverlay from './components/BillNewOverlay';
import { Button } from '@splitshare/ui';
import PageModal, { PageModalInner } from 'src/components/PageModal';

interface IState {
  showBillNewOverlay: boolean;
}

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
