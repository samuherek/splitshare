import * as React from 'react';
import { Formik } from 'formik';
import { Button, styled, TextField, AvatarUser } from '@splitshare/ui';

import MeQueryContainer from '../../graphql/MeQuery';
import CreateReceiptMutationContainer from '../../graphql/CreateReceiptMutation';
import { CURRENCIES } from '../../constants';
import { User } from '../../types';
import getCurrencySymbol from '../../utils/getCurrencySymbol';
import SvgCheckmark from '../icons/Checkmark';

interface IProps {
  onCancel: () => void;
  billId: string;
  users: User[];
}

interface IState {
  total: string;
}

interface IReceiptFormValues {
  company: string;
  country?: string;
  total: number;
  currency: string;
}

const WrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 15px 0 50px;

  button {
    max-width: 150px;
  }

  h3 {
    margin-bottom: 25px;
  }
`;

const FormStyled: any = styled.form`
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
`;

const FieldsetStyled = styled.fieldset`
  border: none;
`;

const initialValues: IReceiptFormValues = {
  company: '',
  country: '',
  currency: 'EUR',
  total: 1,
};

class ReceiptNewForm extends React.PureComponent<IProps, IState> {
  state = {
    total: '0',
  };

  handleTotalChange = (ev: any) => {
    this.setState({ total: ev.target.value });
  };

  render() {
    const { total } = this.state;
    const { onCancel, billId, users } = this.props;

    const splitsInput = users.map(u => ({
      userId: u.id,
      value: Number(total) / users.length,
    }));
    console.log(splitsInput);
    return (
      <WrapStyled>
        {/* <h3>Create new Receipt</h3> */}
        <Formik<IReceiptFormValues>
          initialValues={initialValues}
          onSubmit={(...args) => {
            console.log(...args);
          }}
        >
          {({ values, handleChange }) => (
            <MeQueryContainer>
              {({ me }) => (
                <CreateReceiptMutationContainer
                  billId={billId}
                  splitsInput={splitsInput}
                  receiptInput={{
                    ...values,
                    paidAt: new Date(),
                    paidById: me!.id,
                    total: Number(total),
                  }}
                >
                  {({ createReceiptMutation, loading }) => (
                    <FormStyled
                      onSubmit={async (
                        ev: React.FormEvent<HTMLFormElement>
                      ) => {
                        ev.preventDefault();
                        if (Number(total) === 0) {
                          return;
                        }
                        await createReceiptMutation();
                        onCancel();
                      }}
                    >
                      <FieldsetStyled disabled={loading}>
                        <TextField
                          label="Title / Company"
                          name="company"
                          id="company"
                          value={values.company}
                          type="text"
                          autoComplete={false}
                          onChange={handleChange}
                        />
                        <TextField
                          label="Total"
                          name="total"
                          id="total"
                          value={total}
                          type="number"
                          autoComplete={false}
                          onChange={this.handleTotalChange}
                        />
                        <select
                          onChange={handleChange}
                          value={values.currency}
                          id="currency"
                          name="currency"
                        >
                          {CURRENCIES.map(c => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {users.map(u => (
                          <div
                            key={u.id}
                            style={{
                              alignItems: 'center',
                              display: 'flex',
                              margin: '15px 0',
                            }}
                          >
                            <AvatarUser name={u.displayName || u.email} />
                            <span style={{ margin: '0 8px' }}>
                              {u.displayName || u.email}
                            </span>
                            <span>
                              {Number(total) / users.length}
                              {getCurrencySymbol(values.currency)}
                            </span>
                          </div>
                        ))}
                        <Button
                          disabled={
                            Number(total) === 0 || values.company === ''
                          }
                          type="submit"
                          variant="primary"
                          shape="contained"
                          iconBefore={SvgCheckmark}
                          style={{ marginTop: '25px' }}
                        >
                          Create Receipt
                        </Button>
                      </FieldsetStyled>
                    </FormStyled>
                  )}
                </CreateReceiptMutationContainer>
              )}
            </MeQueryContainer>
          )}
        </Formik>
      </WrapStyled>
    );
  }
}

export default ReceiptNewForm;
