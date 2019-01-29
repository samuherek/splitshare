import * as React from 'react';
import { styled, ButtonBase } from '@splitshare/ui';
import SvgNotification from '../../components/icons/Notification';
import { distanceInWordsStrict } from 'date-fns';
import MyPendingInvitesQueryContainer from '../../graphql/MyPendingInvitesQuery';

interface IState {
  isOpen: boolean;
}

interface IBaseBtnProps {
  withAttention: boolean;
  onClick: () => void;
}

// TODO: Figure out the typing here.
const BaseBtnStyled = styled(ButtonBase)<IBaseBtnProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font: inherit;
  text-transform: uppercase;

  background: ${({ withAttention }) => (withAttention ? '#60bffc' : '#eee')};
  color: ${({ withAttention }) => (withAttention ? 'white' : 'inherit')};
  font-size: 20px;

  /* This is only for top bar visual and it's not necessary to keep for the component */
  margin-right: 15px;
`;

const NotificationDotStyled = styled.span`
  position: absolute;
  top: -6px;
  right: -7px;
  background: red;
  height: 15px;
  width: 15px;
  border-radius: 16px;
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
`;

const WrapStyled = styled.div`
  background-color: #fff;
  max-height: calc(100% - 20px);
  max-width: 355px;
  right: 0;
  top: 0;
  width: calc(100% - 20px);
  z-index: 99;
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.09);
  position: fixed;
  overflow: hidden;
`;

const HeaderMenuStyled = styled.div`
  border-bottom: 1px solid #eee;
  position: relative;
  text-align: center;
  padding: 20px 0;
`;

const ActionsStyled = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

// TODO: Figure out the typing here
const CloseBtnStyled: any = styled(ButtonBase)`
  background: transparent;
  padding: 10px 15px;
  margin-left: 15px;
`;

const ContentMenuStyled = styled.div`
  padding: 25px 0 25px;
`;

const InviteWrapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
`;

const AcceptBtnStyled: any = styled(ButtonBase)``;

class MenuInvites extends React.PureComponent<{}, IState> {
  state = {
    isOpen: false,
  };

  toggleMenu = () =>
    this.setState(state => ({ isOpen: !state.isOpen, isEditing: false }));

  render() {
    const { isOpen } = this.state;

    return (
      <MyPendingInvitesQueryContainer>
        {({ invites }) => (
          <>
            <BaseBtnStyled
              onClick={this.toggleMenu}
              withAttention={invites.length > 0}
            >
              <SvgNotification />
              {invites.length > 0 ? (
                <NotificationDotStyled>{invites.length}</NotificationDotStyled>
              ) : null}
            </BaseBtnStyled>
            {isOpen ? (
              <WrapStyled>
                <HeaderMenuStyled>
                  <h3>My Invites</h3>
                  <ActionsStyled>
                    <CloseBtnStyled onClick={this.toggleMenu}>x</CloseBtnStyled>
                  </ActionsStyled>
                </HeaderMenuStyled>
                <ContentMenuStyled>
                  {invites.map(i => (
                    <InviteWrapStyled key={i.id}>
                      <div style={{ marginRight: 15 }}>
                        <span style={{ display: 'block' }}>{i.bill.name}</span>
                        <span style={{ opacity: 0.5, fontSize: '0.825em' }}>
                          by {i.invitedBy.displayName} -{' '}
                          {distanceInWordsStrict(
                            new Date(),
                            Date.parse(i.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </span>
                      </div>
                      <AcceptBtnStyled>Accept / Reject</AcceptBtnStyled>
                    </InviteWrapStyled>
                  ))}
                </ContentMenuStyled>
              </WrapStyled>
            ) : null}
          </>
        )}
      </MyPendingInvitesQueryContainer>
    );
  }
}

export default MenuInvites;
