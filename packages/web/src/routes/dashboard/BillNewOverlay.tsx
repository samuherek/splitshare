import * as React from 'react';
import { Button, styled, TextField } from '@splitshare/ui';
import { Bill } from '../../types';
import CreateBillMutationContainer from '../../graphql/CreateBillMutation';
import CreateBillInviteMutationContainer from '../../graphql/CreateBillInviteMutation';

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
    this.setState({ page: 1, billId: data.id });
  };

  public render() {
    const { name, page, billId, email } = this.state;
    const { onCancel } = this.props;

    return (
      <WrapStyled>
        {page === 0 ? <h3>Create new bill</h3> : <h3>Invite to the bill</h3>}
        {page === 0 ? (
          <CreateBillMutationContainer name={name}>
            {({ createBillMutation, loading }) => (
              <FormStyled
                onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
                  ev.preventDefault();
                  const res = (await createBillMutation()) as any;
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
          </CreateBillMutationContainer>
        ) : null}
        {page === 1 ? (
          <CreateBillInviteMutationContainer
            billId={billId || ''}
            email={email}
          >
            {({ createBillInviteMutation, loading }) => (
              <FormStyled
                onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
                  ev.preventDefault();
                  await createBillInviteMutation();
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
          </CreateBillInviteMutationContainer>
        ) : null}
        <Button onClick={onCancel}>Cancel</Button>
      </WrapStyled>
    );
  }
}

export default BillNewOverlay;
