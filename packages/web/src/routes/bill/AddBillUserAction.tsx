import { ExecutionResult } from 'graphql';
import React, { SyntheticEvent } from 'react';
import tryToCatch from 'try-to-catch';
import ErrorMessage from '../../components/ErrorMessage';
import useEmailController from '../../controllers/field/useEmailController';
import {
  MutationCreateBillInviteResponse,
  useMutationCreateBillInvite,
} from '../../graphql/invite/mutationCreateBillInvite';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import TextField from '../../ui/components/TextField';
import Button from '../../ui/theme/Button';
import Fieldset from '../../ui/theme/Fieldset';

type Props = {
  billId: string;
};

function AddBillUserAction({ billId }: Props) {
  const [editing, setEditing] = React.useState(false);

  const { email } = useEmailController();

  const [createBillInvite, { loading, error }] = useMutationCreateBillInvite({
    billId,
    email: email.value,
  });

  const allowSubmit = useAllowSubmit({ email: '' }, { email: email.value }, [
    'email',
  ]);

  async function handleSubmit(ev: SyntheticEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (allowSubmit) {
      const [err, res]: [
        Error,
        ExecutionResult<MutationCreateBillInviteResponse>
      ] = await tryToCatch(createBillInvite);

      if (!err && res.data?.createBillInvite) {
        email.onChange({ target: { value: '' } });
        setEditing(false);
      }
    }
  }

  return (
    <>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <Fieldset disabled={loading}>
            <TextField
              name="bill-user"
              value={email.value}
              onChange={email.onChange}
              placeholder="email"
            />
          </Fieldset>
        </form>
      ) : (
        <Button onClick={() => setEditing(true)}>Invite user</Button>
      )}
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default AddBillUserAction;
