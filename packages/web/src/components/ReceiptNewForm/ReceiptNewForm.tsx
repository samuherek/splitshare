import * as React from 'react';
import { Formik } from 'formik';
import { Button, styled, TextField } from '@splitshare/ui';

import MeQueryContainer from '../../graphql/MeQuery';
import CreateReceiptMutationContainer from '../../graphql/CreateReceiptMutation';
import { CURRENCIES } from '../../constants';

interface IProps {
  onCancel: () => void;
  billId: string;
}

interface IReceiptFormValues {
  company: string;
  comment?: string;
  category?: string;
  country?: string;
  total: number;
  currency: string;
}

const WrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 50px 0;

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
  category: '',
  comment: '',
  company: '',
  country: '',
  currency: 'EUR',
  total: 1,
};

class ReceiptNewForm extends React.PureComponent<IProps> {
  render() {
    const { onCancel, billId } = this.props;
    return (
      <WrapStyled>
        <h3>Create new Receipt</h3>
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
                  splitsInput={[{ userId: me!.id, value: values.total }]}
                  receiptInput={{ ...values, paidById: me!.id }}
                >
                  {({ createReceiptMutation, loading }) => (
                    <FormStyled
                      onSubmit={async (
                        ev: React.FormEvent<HTMLFormElement>
                      ) => {
                        ev.preventDefault();
                        await createReceiptMutation();
                        onCancel();
                      }}
                    >
                      <FieldsetStyled disabled={loading}>
                        <TextField
                          label="Company"
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
                          value={values.total}
                          type="number"
                          autoComplete={false}
                          onChange={handleChange}
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
                        <TextField
                          label="Category"
                          name="category"
                          id="category"
                          value={values.category}
                          type="text"
                          autoComplete={false}
                          onChange={handleChange}
                        />
                        <TextField
                          label="Comment"
                          name="comment"
                          id="comment"
                          value={values.comment}
                          type="text"
                          autoComplete={false}
                          onChange={handleChange}
                        />
                        <Button type="submit">Create Receipt</Button>
                      </FieldsetStyled>
                    </FormStyled>
                  )}
                </CreateReceiptMutationContainer>
              )}
            </MeQueryContainer>
          )}
        </Formik>
        <Button onClick={onCancel}>Cancel</Button>
      </WrapStyled>
    );
  }
}

export default ReceiptNewForm;
