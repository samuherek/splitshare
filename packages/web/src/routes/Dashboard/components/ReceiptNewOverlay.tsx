import * as React from 'react';
import { Formik } from 'formik';
import { Button, styled, TextField, ButtonBase } from '@splitshare/ui';
import QueryMyBillsContainer from 'src/routes/Bills/containers/QueryMyBillsContainer';
import CreateReceiptContainer from '../containers/CreateReceiptContainer';
import MeContainer from 'src/containers/MeContainer';

interface IProps {
  onCancel: () => void;
}
interface IState {
  billId: string | null;
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
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  padding: 50px 0;

  h3 {
    margin-bottom: 25px;
    text-align: center;
  }
`;

const CardsWrapStyled = styled.div`
  max-width: 600px;
  overflow: auto;
  max-height: 600px;
`;

const CardButtonStyled: any = styled(ButtonBase)`
  width: 100%;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 25px;
  margin-bottom: 10px;
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

    const billId = this.state.billId || '';

    return (
      <WrapStyled>
        {!billId ? (
          <>
            <h3>Pick the bill</h3>
            <CardsWrapStyled>
              <QueryMyBillsContainer>
                {({ bills }) => {
                  return bills.map(b => (
                    <CardButtonStyled
                      key={b.id}
                      onClick={() => {
                        this.setState({ billId: b.id });
                      }}
                    >
                      <span>{b.name}</span>
                    </CardButtonStyled>
                  ));
                }}
              </QueryMyBillsContainer>
            </CardsWrapStyled>
          </>
        ) : (
          <>
            <h3>Create new Receipt</h3>
            <Formik<IReceiptFormValues>
              initialValues={initialValues}
              onSubmit={(...args) => {
                console.log(...args);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <MeContainer>
                  {({ me }) => (
                    <CreateReceiptContainer
                      billId={billId}
                      splitsInput={[{ userId: me!.id, value: values.total }]}
                      receiptInput={{ ...values, paidById: me!.id }}
                    >
                      {({ createReceipt, loading }) => (
                        <FormStyled
                          onSubmit={async (
                            ev: React.FormEvent<HTMLFormElement>
                          ) => {
                            ev.preventDefault();
                            await createReceipt();
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
                            <TextField
                              label="Currency"
                              name="currency"
                              id="currency"
                              value={values.currency}
                              type="text"
                              autoComplete={false}
                              onChange={handleChange}
                            />
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
                    </CreateReceiptContainer>
                  )}
                </MeContainer>
              )}
            </Formik>
          </>
        )}
        <Button onClick={onCancel}>Cancel</Button>
      </WrapStyled>
    );
  }
}

export default ReceiptNewOverlay;
