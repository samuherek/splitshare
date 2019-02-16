import * as React from 'react';
import { Button, styled, TextField, AvatarUser } from '@splitshare/ui';

import { BILL_QUERY } from '../../graphql/BillQuery';
import { CREATE_RECEIPT_MUTATION } from '../../graphql/CreateReceiptMutation';
import { CURRENCIES } from '../../constants';
import { ME_QUERY } from '../../graphql/MeQuery';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { User } from '../../types';
import getCurrencySymbol from '../../utils/getCurrencySymbol';
import SvgCheckmark from '../icons/Checkmark';

interface IProps {
  onCancel: () => void;
  billId: string;
}

interface IAction {
  type: string;
  payload: any;
}

interface IStateUser {
  userId: string;
  value: number;
}
interface IState {
  users: IStateUser[];
  total: string;
  company: string;
  country: string;
  currency: string; // TODO: change to enums
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

const actions = {
  TOTAL_CHANGE: 'TOTAL_CHANGE',
  USER_TOTAL_CHANGE: 'USER_TOTAL_CHANGE',
  VALUE_CHANGE: 'VALUE_CHANGE',
};

const initState = (users: User[]): IState => {
  return {
    company: '',
    country: '',
    currency: 'EUR',
    total: '0',
    users: users.map(u => ({ userId: u.id, value: 0 })),
  };
};

const reducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case actions.TOTAL_CHANGE: {
      const { users } = state;
      const { value } = payload;
      const nextSplitValue = Math.round((value / users.length) * 100) / 100;
      const nextUsers = users.map(u => ({
        ...u,
        value: nextSplitValue,
      }));
      return { ...state, total: payload.value, users: nextUsers };
    }
    case actions.VALUE_CHANGE: {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    }
    case actions.USER_TOTAL_CHANGE:
      return { ...state };
    default:
      throw new Error('Not provided action');
  }
};

const ReceiptNewForm: React.FC<IProps> = ({ billId, onCancel }) => {
  const billQuery = useQuery(BILL_QUERY, {
    variables: { id: billId },
  });
  const meQuery = useQuery(ME_QUERY);
  const createReceiptMutation = useMutation(CREATE_RECEIPT_MUTATION);
  const [state, dispatch] = React.useReducer(
    reducer,
    billQuery.data.bill.users,
    initState
  );

  return (
    <WrapStyled>
      <FormStyled
        onSubmit={async (ev: React.FormEvent<HTMLFormElement>) => {
          ev.preventDefault();
          try {
            const res = await createReceiptMutation({
              variables: {
                billId,
                receiptInput: {
                  company: state.company,
                  currency: state.currency,
                  paidAt: new Date(),
                  paidById: meQuery.data.me.id,
                  total: Number(state.total),
                },
                splitsInput: state.users.filter(u => u.value !== 0),
              },
            });
            // TODO: Refetch the receipts query for the bill on the mutation.
            console.log(res);
            onCancel();
          } catch (err) {
            throw new Error(err);
          }
        }}
      >
        <FieldsetStyled>
          <TextField
            label="Title / Company"
            name="company"
            id="company"
            value={state.company}
            type="text"
            autoComplete={false}
            onChange={({ currentTarget }: any) => {
              dispatch({
                payload: {
                  key: 'company',
                  value: currentTarget.value,
                },
                type: actions.VALUE_CHANGE,
              });
            }}
          />
          <TextField
            label="Total"
            name="total"
            id="total"
            value={state.total}
            type="number"
            autoComplete={false}
            onChange={({ currentTarget }: any) => {
              dispatch({
                payload: {
                  value: currentTarget.value,
                },
                type: actions.TOTAL_CHANGE,
              });
            }}
          />
          <select
            onChange={({ currentTarget }: any) => {
              dispatch({
                payload: {
                  key: 'currency',
                  value: currentTarget.value,
                },
                type: actions.VALUE_CHANGE,
              });
            }}
            value={state.currency}
            id="currency"
            name="currency"
          >
            {CURRENCIES.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {billQuery.data.bill.users.map((u: User, i: number) => (
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
                {state.users[i].value}
                {getCurrencySymbol(state.currency)}
              </span>
            </div>
          ))}
          <Button
            disabled={Number(state.total) === 0 || state.company === ''}
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
    </WrapStyled>
  );
};

export default ReceiptNewForm;
