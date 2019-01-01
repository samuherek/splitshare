import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';

export default class Home extends React.PureComponent<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h2>not Found!</h2>
        <p>Sorry, the page you are looking for does not exists.</p>
        <p>
          go home: <Link to="/">Home</Link>
        </p>
      </div>
    );
  }
}
