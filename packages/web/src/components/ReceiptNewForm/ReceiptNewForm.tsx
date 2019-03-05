import {
  AvatarUser,
  Button,
  ButtonBase,
  styled,
  TextField,
} from '@splitshare/ui';
import sortBy from 'lodash.sortby';
import * as React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { CURRENCIES } from '../../constants';
import { BILL_QUERY } from '../../graphql/BillQuery';
import { CREATE_RECEIPT_MUTATION } from '../../graphql/CreateReceiptMutation';
import { ME_QUERY } from '../../graphql/MeQuery';
import { User } from '../../types';
import getCurrencySymbol from '../../utils/getCurrencySymbol';
import SvgCheckmark from '../icons/Checkmark';
import UserSplitInput from './UserSplitInput';

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
  percentage: number;
  customized: boolean;
}
interface IState {
  customSplit: boolean;
  users: {
    [key: string]: IStateUser;
  };
  paidById: string | null;
  total: number;
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
  SET_PAYER: 'SET_PAYER',
  TOTAL_CHANGE: 'TOTAL_CHANGE',
  USER_SPLIT_CHANGE: 'USER_SPLIT_CHANGE',
  VALUE_CHANGE: 'VALUE_CHANGE',
};

const initState = (users: User[]): IState => {
  return {
    company: '',
    country: '',
    currency: 'EUR',
    customSplit: false,
    paidById: null,
    total: 0,
    // We need to normalize the users for easier references
    users: users.reduce((prev, u) => {
      prev[u.id] = {
        // TODO: put this into use. I mean the customization key.
        customized: false,
        userId: u.id,
        value: 0,
      };
      return prev;
    }, {}),
  };
};

const reducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case actions.TOTAL_CHANGE: {
      const { users } = state;
      const { value } = payload;
      const keys = Object.keys(users);
      // We always split the total into 50/50 or depending on the user length.
      const nextSplitValue = Math.round((value / keys.length) * 100) / 100;

      return {
        ...state,
        total: Number(payload.value),
        users: keys.reduce((prev, key) => {
          prev[key] = {
            ...users[key],
            value: nextSplitValue,
          };
          return prev;
        }, {}),
      };
    }

    case actions.VALUE_CHANGE: {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    }

    case actions.SET_PAYER: {
      return {
        ...state,
        paidById: payload.userId,
      };
    }

    case actions.USER_SPLIT_CHANGE: {
      const user = state.users[payload.userId];

      // In case we don't have a user (edge/bug case?) we return normal state
      if (!user) {
        return { ...state };
      }

      // In case the payload value is bigger we
      if (payload.value >= state.total) {
        return {
          ...state,
          users: Object.keys(state.users).reduce((prev, key) => {
            const stateUser = state.users[key];
            const isEditedUser = stateUser.userId === user.userId;
            prev[key] = {
              ...stateUser,
              customized: isEditedUser ? true : stateUser.customized,
              value: isEditedUser ? payload.value : 0,
            };
            return prev;
          }, {}),
        };
      }

      // 10 1
      // Difference we'll need to re-distribute
      let remainder = Math.abs(user.value - payload.value);
      if (remainder > state.total) {
        remainder = state.total;
      }
      // Are we deducting from user value
      const shouldDeduct = user.value < payload.value;

      const sortedUsers = sortBy(Object.entries(state.users), ['[1].value']);

      let actionUserPassed = false;

      const nextUsers = sortedUsers.map((u, i) => {
        if (u[0] === user.userId) {
          actionUserPassed = true;
          return {
            ...u,
            [1]: {
              ...u[1],
              customized: true,
              value: payload.value,
            },
          };
        }

        const usersLeft = actionUserPassed
          ? sortedUsers.length - i
          : sortedUsers.length - 1 - i;

        const userValuePart = remainder / usersLeft;

        let safeValueToUse = userValuePart;

        if (shouldDeduct) {
          const canDeduct = Math.floor(u[1].value - userValuePart) >= 0;
          safeValueToUse = canDeduct ? userValuePart : u[1].value;
        }

        const nextValue = shouldDeduct
          ? u[1].value - safeValueToUse
          : u[1].value + safeValueToUse;

        remainder -= safeValueToUse;

        return {
          ...u,
          [1]: {
            ...u[1],
            value: Math.round(nextValue * 100) / 100,
          },
        };
      });

      return {
        ...state,
        users: nextUsers.reduce((prev, next) => {
          prev[next[0]] = next[1];
          return prev;
        }, {}),
      };
    }
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

  async function submitForm(
    ev: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>
  ) {
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
          splitsInput: Object.keys(state.users).reduce((prev, key) => {
            return state.users[key].value !== 0
              ? [...prev, state.users[key]]
              : prev;
          }, []),
        },
      });
      // TODO: Refetch the receipts query for the bill on the mutation.
      console.log(res);
      onCancel();
    } catch (err) {
      throw new Error(err);
    }
  }

  function handleChange(
    ev: React.SyntheticEvent<HTMLInputElement>,
    actionType: string
  ): void {
    dispatch({
      payload: {
        key: ev.currentTarget.id,
        value: ev.currentTarget.value,
      },
      type: actionType,
    });
  }

  console.log(state);

  return (
    <WrapStyled>
      <FormStyled onSubmit={submitForm}>
        <FieldsetStyled>
          <TextField
            label="Title / Company"
            name="company"
            id="company"
            value={state.company}
            type="text"
            autoComplete={false}
            onChange={(ev: React.SyntheticEvent<HTMLInputElement>) => {
              handleChange(ev, actions.VALUE_CHANGE);
            }}
          />
          <TextField
            label="Total"
            name="total"
            id="total"
            value={state.total}
            type="number"
            autoComplete={false}
            onChange={(ev: React.SyntheticEvent<HTMLInputElement>) => {
              handleChange(ev, actions.TOTAL_CHANGE);
            }}
          />
          <select
            onChange={(ev: React.SyntheticEvent<HTMLSelectElement>) => {
              handleChange(ev as any, actions.VALUE_CHANGE);
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
                position: 'relative',
              }}
            >
              <ButtonBase
                onClick={(ev: React.SyntheticEvent) => {
                  ev.preventDefault();
                  dispatch({
                    payload: { userId: state.paidById === u.id ? null : u.id },
                    type: actions.SET_PAYER,
                  });
                }}
              >
                <AvatarUser
                  name={u.displayName || u.email}
                  style={{
                    border:
                      u.id === state.paidById
                        ? '2px solid #46DC75'
                        : '2px solid transparent',
                  }}
                />
                <span style={{ margin: '0 8px' }}>
                  {u.displayName || u.email}
                </span>
                <span
                  style={{
                    color: '#46DC75',
                    fontSize: '10px',
                  }}
                >
                  {u.id === state.paidById ? 'paid' : ''}
                </span>
              </ButtonBase>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  marginLeft: 'auto',
                }}
              >
                <UserSplitInput
                  value={state.users[u.id].value}
                  userId={u.id}
                  maxValue={state.total}
                  onChange={(userId, value) => {
                    dispatch({
                      payload: {
                        userId,
                        value,
                      },
                      type: actions.USER_SPLIT_CHANGE,
                    });
                  }}
                />
                <span>{getCurrencySymbol(state.currency)}</span>
              </div>
            </div>
          ))}
          <Button
            disabled={
              Number(state.total) === 0 ||
              state.company === '' ||
              state.paidById === null
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
    </WrapStyled>
  );
};

export default ReceiptNewForm;
