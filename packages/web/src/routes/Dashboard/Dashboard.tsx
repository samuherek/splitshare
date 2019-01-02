import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

export default class Dashboard extends React.PureComponent<
  RouteComponentProps
> {
  public render() {
    return (
      <div>
        <div>Dashboard</div>
      </div>
    );
  }
}
