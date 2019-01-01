import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import MeContainer from 'src/containers/MeContainer';

export default class Home extends React.PureComponent<RouteComponentProps> {
  public render() {
    return (
      <MeContainer>
        {({ me }) => (
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
            </ul>
            <div>Home stuff</div>
            <div>{me ? me.email : null}</div>
          </div>
        )}
      </MeContainer>
    );
  }
}
