import { ExecutionResult } from 'graphql';
import React, { SyntheticEvent } from 'react';
import tryToCatch from 'try-to-catch';
import useEmailController from '../../controllers/field/useEmailController';
import {
  MutationCreateBillInviteResponse,
  useMutationCreateBillInvite,
} from '../../graphql/invite/mutationCreateBillInvite';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import Button from '../../ui/Button';
import ErrorMessage from '../../ui/ErrorMessage';
import Fieldset from '../../ui/Fieldset';
import TextField from '../../ui/TextField';

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
