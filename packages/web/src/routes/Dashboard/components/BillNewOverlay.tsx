import * as React from 'react';
import { Button, styled, TextField } from '@splitshare/ui';
import CreateBillContainer from '../containers/CreateBillContainer';
import InviteBillUserContainer from '../containers/InviteBillUserContainer';
import { Bill } from '../../../types';

interface IProps {
  onCancel: () => void;
}
interface IState {
  name?: string; // Comment: it is undefined only to please the this.handleChange method
  email?: string; // Comment: it is undefined only to please the this.handleChange method
  page?: number; // Comment: it is undefined only to please the this.handleChange method
  billId?: string | null;
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
class BillNewOverlay extends React.PureComponent<IProps, IState> {
  public state = {
    billId: null,
    email: '',
    name: '',
    page: 0,
  };

  public handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    this.setState({ [name]: value } as Partial<IState>);
  };

  afterBillCreated = (data: Bill): void => {
    console.log('apollo stuff', data);
    this.setState({ page: 1, billId: data.id });
  };

  public render() {
    const { name, page, billId, email } = this.state;
    const { onCancel } = this.props;

    return (
      <WrapStyled>
        <h3>Create new bill</h3>
        {page === 0 ? (
          <CreateBillContainer billInput={{ name }}>
            {({ createBill, loading }) => (
              <FormStyled
                onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
                  ev.preventDefault();
                  const res = (await createBill()) as any;
                  console.log('stuff', res);
                  this.afterBillCreated(res.data.createBill);
                }}
              >
                <TextField
                  label="Name"
                  name="name"
                  id="name"
                  value={name}
                  type="text"
                  autoComplete={false}
                  onChange={this.handleChange}
                />
                <Button type="submit">Create bill</Button>
              </FormStyled>
            )}
          </CreateBillContainer>
        ) : null}
        {page === 1 ? (
          <InviteBillUserContainer
            inviteInput={{ billId: billId || '', email }}
          >
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
        ) : null}
        <Button onClick={onCancel}>Cancel</Button>
      </WrapStyled>
    );
  }
}

export default BillNewOverlay;
