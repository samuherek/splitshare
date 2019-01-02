import * as React from 'react';
import { Button, styled, TextField } from '@splitshare/ui';
import CreateBillContainer from '../containers/CreateBillContainer';

interface IProps {
  onCancel: () => void;
}
interface IState {
  name?: string;
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
    name: '',
  };

  public handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    this.setState({ [name]: value } as Partial<IState>);
  };

  public render() {
    const { name } = this.state;
    return (
      <CreateBillContainer billInput={{ name }}>
        {({ createBill, loading }) => (
          <WrapStyled>
            <h3>Create new bill</h3>
            <FormStyled
              onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
                ev.preventDefault();
                const bill = await createBill();
                console.log('success', bill);
              }}
            >
              <TextField
                label="Name"
                name="name"
                id="name"
                value={name}
                type="text"
                onChange={this.handleChange}
              />
              <Button type="submit">Create bill</Button>
            </FormStyled>
            <Button onClick={this.props.onCancel}>Cancel</Button>
          </WrapStyled>
        )}
      </CreateBillContainer>
    );
  }
}

export default BillNewOverlay;
