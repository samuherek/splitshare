import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { styled, TextField, Button } from '@splitshare/ui';
import LoginContainer from './containers/LoginContainer';

interface IState {
  email?: string;
  password?: string;
}

const WrapStyled: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const FormStyled: any = styled.form`
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
`;

class Login extends React.PureComponent<RouteComponentProps, IState> {
  public state = {
    email: '',
    password: '',
  };

  public handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    this.setState({ [name]: value } as Partial<IState>);
  };

  // public handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
  //   ev.preventDefault();
  //   console.log('submitting', this.state);
  // };

  public render() {
    const { email, password } = this.state;

    return (
      <LoginContainer variables={this.state}>
        {({ login, loading, user }) => (
          <WrapStyled>
            <FormStyled
              onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
                ev.preventDefault();
                await login();
                navigate('/');
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
              <Button type="submit">Login</Button>
            </FormStyled>
          </WrapStyled>
        )}
      </LoginContainer>
    );
  }
}

export default Login;
