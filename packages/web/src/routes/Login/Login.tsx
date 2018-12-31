import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { styled, TextField, Button } from '@splitshare/ui';

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

const FormStyled: any = styled.div`
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

  public handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log('submitting', this.state);
  };

  public render() {
    const { email, password } = this.state;

    return (
      <WrapStyled>
        <FormStyled onSubmit={this.handleSubmit}>
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
    );
  }
}

export default Login;
