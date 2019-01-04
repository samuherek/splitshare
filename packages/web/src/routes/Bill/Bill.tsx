import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import FindBillByIdContainer from './containers/FindBillByIdContainer';

interface IProps extends RouteComponentProps {
  billId?: string;
}

export default class Bill extends React.PureComponent<IProps> {
  public render() {
    const { billId } = this.props;

    return (
      <div>
        <FindBillByIdContainer billId={billId || ''}>
          {({ bill }) => (
            <>
              {bill ? (
                <>
                  <div>Bill -- {bill.name}</div>
                  {bill.users.map(user => (
                    <div key={user.id}>{user.email}</div>
                  ))}
                </>
              ) : null}
            </>
          )}
        </FindBillByIdContainer>
      </div>
    );
  }
}
