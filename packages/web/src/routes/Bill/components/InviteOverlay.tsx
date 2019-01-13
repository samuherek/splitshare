import * as React from 'react';
import { Button, styled, TextField } from '@splitshare/ui';
import InviteBillUserContainer from '../../Dashboard/containers/InviteBillUserContainer';

interface IProps {
  onCancel: () => void;
  billId: string;
  billTitle: string;
}
interface IState {
  email?: string; // Comment: it is undefined only to please the this.handleChange method
}

const WrapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100%;
`;

const FormStyled: any = styled.form`
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
`;
class InviteOverlay extends React.PureComponent<IProps, IState> {
  public state = {
    email: '',
  };

  public handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    this.setState({ [name]: value } as Partial<IState>);
  };

  public render() {
    const { email } = this.state;
    const { billId, onCancel, billTitle } = this.props;

    return (
      <WrapStyled>
        <h3>Invite user to {billTitle}</h3>
        <InviteBillUserContainer inviteInput={{ billId: billId || '', email }}>
          {({ inviteUser, loading }) => (
            <FormStyled
              onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
                ev.preventDefault();
                await inviteUser();
                onCancel();
              }}
            >
              <TextField
                label="Email"
                name="email"
                id="email"
                value={email}
                type="text"
                autoComplete={false}
                onChange={this.handleChange}
              />
              <Button type="submit">Invite user</Button>
            </FormStyled>
          )}
        </InviteBillUserContainer>
        <Button onClick={onCancel}>Cancel</Button>
      </WrapStyled>
    );
  }
}

export default InviteOverlay;
