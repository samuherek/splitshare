import * as React from 'react';
import { ApolloClient } from 'apollo-boost';
import { navigate } from '@reach/router';

import { ME_QUERY } from '../containers/MeContainer';

interface IAppProviderProps {
  apolloClient: ApolloClient<{}>;
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
      const { apolloClient } = this.props;
      await apolloClient.resetStore();
      this.setState({ authenticated: false });
      navigate('/auth/login');
    },
  };

  public async componentDidMount() {
    const { apolloClient } = this.props;
    const { data } = await apolloClient.query({
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
