import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';

export default class Home extends React.PureComponent<RouteComponentProps> {
  public render() {
    return (
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
      </div>
    );
  }
}
