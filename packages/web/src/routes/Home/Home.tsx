import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import MeContainer from 'src/containers/MeContainer';
import LogoutContainer from 'src/containers/LogoutContainer';
import { AppContext } from 'src/context/AppProvider';

export default class Home extends React.PureComponent<RouteComponentProps> {
  public render() {
    return (
      <AppContext.Consumer>
        {({ ctxLogout }) => (
          <MeContainer>
            {({ me }) => (
              <LogoutContainer>
                {({ logout, client }) => (
                  <div>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/auth/signup">Signup</Link>
                      </li>
                      <li>
                        <Link to="/auth/login">Login</Link>
                      </li>
                      <li>
                        {me ? (
                          <button
                            onClick={async () => {
                              await logout();
                              ctxLogout();
                            }}
                          >
                            Logout
                          </button>
                        ) : null}
                      </li>
                    </ul>
                    <div>Home stuff</div>
                    <div>{me ? me.email : null}</div>
                  </div>
                )}
              </LogoutContainer>
            )}
          </MeContainer>
        )}
      </AppContext.Consumer>
    );
  }
}
