import * as React from 'react';
import { styled, ButtonBase, SvgEdit, InputBase } from '@splitshare/ui';
import MeQueryContainer from '../../graphql/MeQuery';
import { AppContext } from 'src/context/AppProvider';
import { User, Maybe } from 'src/types';
import UpdateMeMutationContainer from '../../graphql/UpdateMeMutation';
import LogoutMutationContainer from '../../graphql/LogoutMutation';

interface IState {
  displayName?: Maybe<string>;
  email: string;
  isEditing: boolean;
  isOpen: boolean;
}

// TODO: Figure out the typing here.
const AvatarBtnStyled: any = styled(ButtonBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: #eee;
  border: none;
  cursor: pointer;
  font: inherit;
  text-transform: uppercase;
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
  padding: 25px 0 40px;
  text-align: center;

  input {
    text-align: center;
  }
`;

const AvatarStyled = styled.span`
  background: #eee;
  width: 62px;
  height: 62px;
  border-radius: 62px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 20px;
`;

const NameStyled = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const EmailStyled = styled.span`
  opacity: 0.5;
  display: block;
`;

// TODO: Figure out the typing here
const SignOutBtnStyled: any = styled(ButtonBase)`
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid #eee;

  &:hover {
    background: #eee;
  }
`;

class MenuProfile extends React.PureComponent<{}, IState> {
  state = {
    displayName: '',
    email: '',
    isEditing: false,
    isOpen: false,
  };

  toggleMenu = () =>
    this.setState(state => ({ isOpen: !state.isOpen, isEditing: false }));

  activateEdit = (me: User) => {
    const { displayName, email } = me;
    this.setState({ displayName, email, isEditing: true });
  };

  deactivateEdit = () => this.setState({ isEditing: false });

  handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    if (name === 'email') {
      this.setState({ email: value || '' });
    }
    if (name === 'displayName') {
      this.setState({ displayName: value });
    }
  };

  render() {
    const { isOpen, displayName, email, isEditing } = this.state;

    return (
      <AppContext.Consumer>
        {({ ctxLogout }) => (
          <MeQueryContainer>
            {({ me }) => (
              <UpdateMeMutationContainer meInput={{ email, displayName }}>
                {({ updateMeMutation, loading }) => (
                  <>
                    <AvatarBtnStyled onClick={this.toggleMenu}>
                      {me ? me.email.substr(0, 1) : '..'}
                    </AvatarBtnStyled>
                    {isOpen && me ? (
                      <WrapStyled>
                        <HeaderMenuStyled>
                          <h3>Profile</h3>
                          <ActionsStyled>
                            {isEditing ? (
                              <ButtonBase
                                disabled={loading}
                                onClick={async () => {
                                  await updateMeMutation();
                                  this.deactivateEdit();
                                }}
                              >
                                save
                              </ButtonBase>
                            ) : (
                              <ButtonBase
                                onClick={() => {
                                  this.activateEdit(me);
                                }}
                              >
                                <SvgEdit />
                              </ButtonBase>
                            )}
                            <CloseBtnStyled onClick={this.toggleMenu}>
                              x
                            </CloseBtnStyled>
                          </ActionsStyled>
                        </HeaderMenuStyled>
                        <ContentMenuStyled>
                          <AvatarStyled>{me.email.substr(0, 1)}</AvatarStyled>
                          {isEditing ? (
                            <>
                              <InputBase
                                value={displayName}
                                name="displayName"
                                onChange={this.handleInputChange}
                              />
                              <InputBase
                                value={email}
                                name="email"
                                onChange={this.handleInputChange}
                              />
                            </>
                          ) : (
                            <>
                              <NameStyled>
                                {me.displayName || 'No name'}
                              </NameStyled>
                              <EmailStyled>{me.email}</EmailStyled>
                            </>
                          )}
                        </ContentMenuStyled>
                        <LogoutMutationContainer>
                          {({ logout, loading: loadingLogout }) => (
                            <SignOutBtnStyled
                              disabled={loadingLogout}
                              onClick={async () => {
                                await logout();
                                await ctxLogout();
                              }}
                            >
                              Sign out
                            </SignOutBtnStyled>
                          )}
                        </LogoutMutationContainer>
                      </WrapStyled>
                    ) : null}
                  </>
                )}
              </UpdateMeMutationContainer>
            )}
          </MeQueryContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default MenuProfile;
