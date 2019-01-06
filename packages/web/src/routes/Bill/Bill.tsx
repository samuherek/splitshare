import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import QueryBillContainer from './containers/QueryBillContainer';
import QueryReceiptsContainer from './containers/QueryReceiptsContainer';
import { distanceInWordsStrict } from 'date-fns';
import getCurrencySymbol from 'src/utils/getCurrencySymbol';

interface IProps extends RouteComponentProps {
  billId?: string;
}

export default class Bill extends React.PureComponent<IProps> {
  public render() {
    const { billId } = this.props;

    return (
      <div>
        <QueryBillContainer billId={billId || ''}>
          {({ bill }) => (
            <>
              {bill ? (
                <>
                  <div>Bill -- {bill.name}</div>
                  {bill.users.map(user => (
                    <div key={user.id}>{user.email}</div>
                  ))}
                  <QueryReceiptsContainer billId={billId || ''}>
                    {({ receipts }) => {
                      if (!receipts) {
                        return null;
                      }

                      return receipts.map(r => (
                        <div key={r.id}>
                          <span>
                            {r.total.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}{' '}
                            {getCurrencySymbol(r.currency)}
                          </span>
                          <span>
                            {distanceInWordsStrict(
                              new Date(),
                              Date.parse(r.createdAt),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                          <span>{r.paidBy.email}</span>
                        </div>
                      ));
                    }}
                  </QueryReceiptsContainer>
                </>
              ) : null}
            </>
          )}
        </QueryBillContainer>
      </div>
    );
  }
}
