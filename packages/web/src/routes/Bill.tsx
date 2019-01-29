import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';

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

interface IProps extends RouteComponentProps {
  billId?: string;
}

interface IState {
  showInviteOverlay: boolean;
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
  state = {
    showInviteOverlay: false,
  };

  toggleInviteOverlay = () => {
    this.setState(state => ({ showInviteOverlay: !state.showInviteOverlay }));
  };

  public render() {
    const { billId } = this.props;
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
          <BillQueryContainer billId={billId || ''}>
            {({ bill }) => (
              <>
                {bill ? (
                  <>
                    <UpdateBillMutationContainer billId={billId || ''}>
                      {({ updateBillMutation }) => (
                        <DropdownEmoji
                          onSelect={value => {
                            console.log(value);
                            updateBillMutation({
                              variables: { billId: billId || '', icon: value },
                            });
                          }}
                          render={(toggleDropdown, isOpen) => (
                            <IconStyled
                              style={{ fontSize: 50 }}
                              onClick={toggleDropdown}
                              isOpen={isOpen}
                            >
                              {bill.icon}
                            </IconStyled>
                          )}
                        />
                      )}
                    </UpdateBillMutationContainer>
                    <h2>{bill.name}</h2>
                    <AvatarWrapStyled>
                      {bill.invites.map(invite => {
                        return (
                          <AvatarUser name={invite.email} key={invite.id} />
                        );
                      })}
                    </AvatarWrapStyled>
                    <ReceiptsQueryContainer billId={billId || ''}>
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
