import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { styled, TextField, Button } from '@splitshare/ui';

import RegisterContainer from './containers/RegisterContainer';
import { AppContext } from 'src/context/AppProvider';

interface IState {
  email?: string;
  password?: string;
}

const WrapStyled: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const FormStyled: any = styled.form`
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
`;

class Signup extends React.PureComponent<RouteComponentProps, IState> {
  public state = {
    email: '',
    password: '',
  };

  public handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    this.setState({ [name]: value } as Partial<IState>);
  };

  public render() {
    const { email, password } = this.state;

    return (
      <AppContext.Consumer>
        {({ ctxLogin }) => (
          <RegisterContainer email={email} password={password}>
            {({ register, loading }) => (
              <WrapStyled>
                <FormStyled
                  onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
                    ev.preventDefault();
                    await register();
                    ctxLogin();
                  }}
                >
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    value={password}
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Button type="submit">Register</Button>
                </FormStyled>
                <Link to="/auth/login">Already have an account</Link>
              </WrapStyled>
            )}
          </RegisterContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Signup;
