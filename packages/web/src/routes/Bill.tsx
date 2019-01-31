import * as React from 'react';
import { RouteComponentProps, Link, Redirect } from '@reach/router';

import { distanceInWordsStrict } from 'date-fns';
import getCurrencySymbol from 'src/utils/getCurrencySymbol';
import {
  TopBarLeft,
  LayoutTopBar,
  LayoutPage,
  TopBarRight,
  styled,
  AvatarUser,
  Button,
  DropdownEmoji,
} from '@splitshare/ui';
import PageModal, { PageModalInner } from '../components/PageModal';
import InviteOverlay from './bill/InviteOverlay';
import BillQueryContainer from '../graphql/BillQuery';
import ReceiptsQueryContainer from '../graphql/ReceiptsQuery';
import UpdateBillMutationContainer from '../graphql/UpdateBillMutation';
import getUUIDFromUrl from '../utils/getUUIDFromUrl';

interface IProps extends RouteComponentProps {
  billParam: string;
}

interface IState {
  showInviteOverlay: boolean;
}

const BillWrapStyled = styled.div`
  display: grid;
  max-width: 1260px;
  margin: 45px auto 0;
  padding: 0 5vw;
  grid-template-columns: 400px 1fr;

  h2 {
    margin-bottom: 25px;
    font-size: 18px;
  }
`;

const BillInfoStyled = styled.div``;

const AvatarWrapStyled = styled.div`
  margin-bottom: 25px;
`;

const ReceiptsStyled = styled.div``;

const IconStyled = styled.span<{ isOpen: boolean }>`
  display: block;
  border-radius: 3px;
  font-size: 50px;
  width: 50px;
  height: 50px;
  line-height: 1.1;
  cursor: pointer;
  background: ${({ isOpen }) =>
    isOpen ? 'rgba(55,53,47,0.08)' : 'transparent'};

  &:hover {
    background: rgba(55, 53, 47, 0.08);
  }
`;

export default class Bill extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    billParam: '',
  };

  state = {
    showInviteOverlay: false,
  };

  toggleInviteOverlay = () => {
    this.setState(state => ({ showInviteOverlay: !state.showInviteOverlay }));
  };

  public render() {
    const { billParam } = this.props;
    const billId = getUUIDFromUrl(billParam);

    if (!billId) {
      return <Redirect from="/billParam" to="/" noThrow />;
    }

    const { showInviteOverlay } = this.state;

    return (
      <LayoutPage>
        <LayoutTopBar>
          <TopBarLeft>
            <Link to="/">Back</Link>
          </TopBarLeft>
          <TopBarRight>
            <Button onClick={this.toggleInviteOverlay}>+ Invite</Button>
            <span>right menu</span>
          </TopBarRight>
        </LayoutTopBar>
        <BillWrapStyled>
          <BillQueryContainer billId={billId}>
            {({ bill }) => (
              <>
                {bill ? (
                  <>
                    <BillInfoStyled>
                      <UpdateBillMutationContainer billId={billId}>
                        {({ updateBillMutation }) => (
                          <DropdownEmoji
                            onSelect={value => {
                              console.log(value);
                              updateBillMutation({
                                variables: { billId, icon: value },
                              });
                            }}
                            render={(toggleDropdown, isOpen) => (
                              <IconStyled
                                style={{ fontSize: 50 }}
                                onClick={toggleDropdown}
                                isOpen={isOpen}
                              >
                                {bill.icon ? (
                                  bill.icon
                                ) : (
                                  <span
                                    style={{
                                      opacity: 0.25,
                                      textAlign: 'center',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {bill.name.substr(0, 1)}
                                  </span>
                                )}
                              </IconStyled>
                            )}
                          />
                        )}
                      </UpdateBillMutationContainer>
                      <h2 style={{ fontSize: 28 }}>{bill.name}</h2>
                      <AvatarWrapStyled>
                        {bill.users.map(user => {
                          return (
                            <div
                              key={user.id}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                marginBottom: 7,
                              }}
                            >
                              <AvatarUser
                                name={user.displayName || user.email}
                              />
                              <span style={{ marginLeft: 10 }}>
                                {user.displayName || user.email}
                              </span>
                            </div>
                          );
                        })}
                        <span
                          style={{
                            display: 'block',
                            fontSize: 12,
                            letterSpacing: 0.3,
                            margin: '15px 0',
                            opacity: 0.5,
                            textTransform: 'uppercase',
                          }}
                        >
                          Invites
                        </span>
                        {bill.invites.map(invite => {
                          return (
                            <div
                              key={invite.id}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                marginBottom: 7,
                              }}
                            >
                              <AvatarUser name={invite.email} />
                              <span style={{ marginLeft: 10 }}>
                                {invite.email}
                              </span>
                            </div>
                          );
                        })}
                      </AvatarWrapStyled>
                    </BillInfoStyled>
                    <ReceiptsStyled>
                      <ReceiptsQueryContainer billId={billId}>
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
                      </ReceiptsQueryContainer>
                    </ReceiptsStyled>
                  </>
                ) : null}
                {showInviteOverlay ? (
                  <PageModal>
                    <PageModalInner>
                      <InviteOverlay
                        onCancel={this.toggleInviteOverlay}
                        billId={billId || ''}
                        billTitle={bill ? bill.name : ''}
                      />
                    </PageModalInner>
                  </PageModal>
                ) : null}
              </>
            )}
          </BillQueryContainer>
        </BillWrapStyled>
      </LayoutPage>
    );
  }
}
