import * as React from 'react';
import { Button, styled, TextField } from '@splitshare/ui';

interface IProps {
  onCancel: () => void;
}
interface IState {
  billId: string | null;
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
class ReceiptNewOverlay extends React.PureComponent<IProps, IState> {
  state = {
    billId: null,
  };

  handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    console.log(name, value);
    // this.setState({ [name]: value } as Partial<IState>);
  };

  render() {
    const { onCancel } = this.props;
    return (
      <WrapStyled>
        <h3>Create new Receipt</h3>
        <FormStyled
          onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            onCancel();
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
          <Button type="submit">Create Receipt</Button>
        </FormStyled>
        <Button onClick={onCancel}>Cancel</Button>
      </WrapStyled>
    );
  }
}

export default ReceiptNewOverlay;
