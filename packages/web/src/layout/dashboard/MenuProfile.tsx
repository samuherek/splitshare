import * as React from 'react';
import { styled, ButtonBase, SvgEdit } from '@splitshare/ui';
import MeContainer from 'src/containers/MeContainer';
import LogoutContainer from 'src/containers/LogoutContainer';
import { AppContext } from 'src/context/AppProvider';

interface IState {
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

// TODO: Figure out the typing here
const CloseBtnStyled: any = styled(ButtonBase)`
  background: transparent;
  position: absolute;
  right: 15px;
  top: 50%;
  padding: 10px 15px;
  transform: translateY(-50%);

  &:active {
    transform: translateY(-49%);
  }
`;

const ContentMenuStyled = styled.div`
  padding: 25px 0 40px;
  text-align: center;
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
    isOpen: true,
  };

  toggleMenu = () => this.setState(() => ({ isOpen: !this.state.isOpen }));

  render() {
    const { isOpen } = this.state;

    return (
      <AppContext.Consumer>
        {({ ctxLogout }) => (
          <MeContainer>
            {({ me }) => (
              <>
                <AvatarBtnStyled onClick={this.toggleMenu}>
                  {me ? me.email.substr(0, 1) : '..'}
                </AvatarBtnStyled>
                {isOpen && me ? (
                  <WrapStyled>
                    <HeaderMenuStyled>
                      <h3>Profile</h3>
                      <SvgEdit />
                      <CloseBtnStyled onClick={this.toggleMenu}>
                        x
                      </CloseBtnStyled>
                    </HeaderMenuStyled>
                    <ContentMenuStyled>
                      <AvatarStyled>{me.email.substr(0, 1)}</AvatarStyled>
                      <NameStyled>{me.displayName || 'No name'}</NameStyled>
                      <EmailStyled>{me.email}</EmailStyled>
                    </ContentMenuStyled>
                    <LogoutContainer>
                      {({ logout, loading }) => (
                        <SignOutBtnStyled
                          disabled={loading}
                          onClick={async () => {
                            await logout();
                            await ctxLogout();
                          }}
                        >
                          Sign out
                        </SignOutBtnStyled>
                      )}
                    </LogoutContainer>
                  </WrapStyled>
                ) : null}
              </>
            )}
          </MeContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default MenuProfile;
