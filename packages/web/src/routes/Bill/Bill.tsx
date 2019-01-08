import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import QueryBillContainer from './containers/QueryBillContainer';
import QueryReceiptsContainer from './containers/QueryReceiptsContainer';
import { distanceInWordsStrict } from 'date-fns';
import getCurrencySymbol from 'src/utils/getCurrencySymbol';
import {
  TopBarLeft,
  LayoutTopBar,
  LayoutPage,
  TopBarRight,
  styled,
  AvatarUser,
} from '@splitshare/ui';

interface IProps extends RouteComponentProps {
  billId?: string;
}

const BillWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;

  h2 {
    margin-bottom: 25px;
    font-size: 18px;
  }
`;

const AvatarWrapStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  & > span {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default class Bill extends React.PureComponent<IProps> {
  public render() {
    const { billId } = this.props;

    return (
      <LayoutPage>
        <LayoutTopBar>
          <TopBarLeft>
            <Link to="/">Back</Link>
          </TopBarLeft>
          <TopBarRight>
            <span>right menu</span>
          </TopBarRight>
        </LayoutTopBar>
        <BillWrapStyled>
          <QueryBillContainer billId={billId || ''}>
            {({ bill }) => (
              <>
                {bill ? (
                  <>
                    <h2>{bill.name}</h2>
                    <AvatarWrapStyled>
                      {bill.users.map(user => (
                        <AvatarUser
                          name={user.email}
                          key={user.id}
                          url={user.photoUrl}
                        />
                      ))}
                    </AvatarWrapStyled>
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
        </BillWrapStyled>
      </LayoutPage>
    );
  }
}
