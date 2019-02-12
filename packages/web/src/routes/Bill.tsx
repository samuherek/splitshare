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
  ButtonBase,
} from '@splitshare/ui';
import PageModal, { PageModalInner } from '../components/PageModal';
import InviteOverlay from './bill/InviteOverlay';
import BillQueryContainer from '../graphql/BillQuery';
import ReceiptsQueryContainer from '../graphql/ReceiptsQuery';
import UpdateBillMutationContainer from '../graphql/UpdateBillMutation';
import getUUIDFromUrl from '../utils/getUUIDFromUrl';
import RemoveBillMutationContainer from '../graphql/RemoveBillMutation';
import ReceiptNewForm from '../components/ReceiptNewForm';
import ReceiptOverlay from './bill/ReceiptOverlay';

interface IProps extends RouteComponentProps {
  billParam?: string;
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

const ReceiptsStyled = styled.div`
  position: relative;
`;

const ReceiptsToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

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

const ReceiptStyled = styled.div`
  padding: 15px 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Bill = ({ billParam, navigate }: IProps) => {
  const billId = billParam ? getUUIDFromUrl(billParam) : null;

  if (!billId) {
    return <Redirect from="/billParam" to="/" noThrow />;
  }

  const [showInviteOverlay, setInviteOverlay] = React.useState(false);
  const [showReceiptId, setReceiptId] = React.useState<null | string>(null);
  const [showReceiptNewOverlay, setReceiptOverlay] = React.useState(false);

  return (
    <LayoutPage>
      <LayoutTopBar>
        <TopBarLeft>
          <Link to="/">Back</Link>
        </TopBarLeft>
        <TopBarRight>
          <Button onClick={() => setInviteOverlay(true)}>+ Invite</Button>
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
                    <div>
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
                      <RemoveBillMutationContainer id={billId}>
                        {({ removeBillMutation }) => (
                          <ButtonBase
                            onClick={async () => {
                              try {
                                await removeBillMutation();
                                if (navigate) {
                                  navigate('/');
                                }
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            Remove
                          </ButtonBase>
                        )}
                      </RemoveBillMutationContainer>
                    </div>
                    <h2 style={{ fontSize: 28 }}>{bill.name}</h2>
                    <AvatarWrapStyled>
                      {bill.users.map(user => {
                        return (
                          <div
                            key={user.id}
                            style={{
                              alignItems: 'center',
                              display: 'flex',
                              marginBottom: 15,
                            }}
                          >
                            <AvatarUser name={user.displayName || user.email} />
                            <span style={{ marginLeft: 10 }}>
                              {user.displayName || user.email}
                            </span>
                          </div>
                        );
                      })}
                      {bill.invites &&
                        bill.invites.map(invite => {
                          return (
                            <div
                              key={invite.id}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                marginBottom: 15,
                                opacity: 0.35,
                              }}
                            >
                              <AvatarUser name={invite.email} />
                              <span style={{ marginLeft: 10 }}>
                                {invite.email}
                              </span>
                              <span
                                style={{
                                  background: 'rgba(55,53,47,0.18)',
                                  borderRadius: 3,
                                  display: 'inline-block',
                                  fontSize: 11,
                                  marginLeft: 10,
                                  padding: '3px 6px',
                                }}
                              >
                                pending
                              </span>
                            </div>
                          );
                        })}
                    </AvatarWrapStyled>
                  </BillInfoStyled>
                  <ReceiptsStyled>
                    <ReceiptsToolbarStyled>
                      {!showReceiptNewOverlay ? (
                        <span>Order by newest</span>
                      ) : (
                        <h3>Create new Receipt</h3>
                      )}
                      <ButtonBase
                        style={{ marginLeft: 'auto' }}
                        onClick={() => {
                          if (showReceiptNewOverlay) {
                            setReceiptOverlay(false);
                          } else {
                            setReceiptOverlay(true);
                          }
                        }}
                      >
                        {showReceiptNewOverlay ? 'Cancel' : '+ Add Receipt'}
                      </ButtonBase>
                    </ReceiptsToolbarStyled>
                    {showReceiptNewOverlay ? (
                      <ReceiptNewForm
                        billId={billId}
                        users={bill.users}
                        onCancel={() => setReceiptOverlay(false)}
                      />
                    ) : (
                      <ReceiptsQueryContainer billId={billId}>
                        {({ receipts }) => {
                          if (!receipts) {
                            return null;
                          }

                          if (receipts.length === 0) {
                            return (
                              <div>
                                <span>You have no receipts</span>
                              </div>
                            );
                          }

                          return receipts.map(r => (
                            <ReceiptStyled
                              key={r.id}
                              onClick={() => setReceiptId(r.id)}
                            >
                              <AvatarUser
                                name={r.paidBy.displayName || r.paidBy.email}
                                style={{
                                  fontSize: '18px',
                                  height: '40px',
                                  width: '40px',
                                }}
                              />
                              <div
                                style={{
                                  marginLeft: 15,
                                  marginRight: 15,
                                  width: 250,
                                }}
                              >
                                <span style={{ display: 'block' }}>
                                  {r.company}
                                </span>
                                <span style={{ fontSize: 12, opacity: 0.3 }}>
                                  {distanceInWordsStrict(
                                    new Date(),
                                    Date.parse(r.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </span>
                              </div>
                              <span>
                                {r.total.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                                {getCurrencySymbol(r.currency)}
                              </span>
                            </ReceiptStyled>
                          ));
                        }}
                      </ReceiptsQueryContainer>
                    )}
                    {showReceiptId !== null ? (
                      <ReceiptOverlay
                        onCancel={() => setReceiptId(null)}
                        receiptId={showReceiptId}
                      />
                    ) : null}
                  </ReceiptsStyled>
                </>
              ) : null}
              {showInviteOverlay ? (
                <PageModal>
                  <PageModalInner>
                    <InviteOverlay
                      onCancel={() => setInviteOverlay(false)}
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
};

export default Bill;
