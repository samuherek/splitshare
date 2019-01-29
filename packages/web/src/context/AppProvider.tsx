import * as React from 'react';
import { ApolloClient } from 'apollo-boost';
import { navigate } from '@reach/router';

import { ME_QUERY } from '../graphql/MeQuery';

interface IAppProviderProps {
  client: ApolloClient<{}>;
  children: React.ReactNode;
}

export interface IAppContext {
  authenticated: boolean;
  ctxLogin: () => void;
  ctxLogout: () => void;
  loading: boolean;
}

const AppContext = React.createContext({
  authenticated: false,
  ctxLogin() {},
  ctxLogout() {},
  loading: true,
});

class AppProvider extends React.PureComponent<IAppProviderProps, IAppContext> {
  public state = {
    authenticated: false,

    loading: true,

    ctxLogin: () => {
      this.setState({ authenticated: true });
      navigate('/');
    },

    ctxLogout: async () => {
      const { client } = this.props;
      await client.clearStore();
      this.setState({ authenticated: false });
      navigate('/auth/login');
    },
  };

  public async componentDidMount() {
    const { client } = this.props;
    const { data } = await client.query({
      query: ME_QUERY,
    });
    this.setState({
      authenticated: !!data.me,
      loading: false,
    });
  }

  public render() {
    const { loading } = this.state;

    if (loading) {
      return 'loading app';
    }

    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
export { AppContext };
