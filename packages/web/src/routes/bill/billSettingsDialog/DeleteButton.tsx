import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import {
  MutationDeleteBillResponse,
  useMutationDeleteBill,
} from '../../../graphql/bill/mutationDeleteBill';
import Button from '../../../ui/Button';
import ErrorMessage from '../../../ui/ErrorMessage';

type Props = {
  billId: string;
  callback: () => void;
};

function DeleteButton({ billId, callback }: Props) {
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

  const [deleteBill, { loading, error }] = useMutationDeleteBill({ billId });

  async function handleSubmit() {
    const [err, res]: [
      Error,
      ExecutionResult<MutationDeleteBillResponse>
    ] = await tryToCatch(deleteBill);

    if (!err && res.data?.deleteBill) {
      callback();
    }
  }

  return (
    <>
      {deleteConfirmation ? (
        <>
          <Button
            disabled={loading}
            onClick={() => setDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            Yes delete
          </Button>
        </>
      ) : (
        <Button onClick={() => setDeleteConfirmation(true)}>Delete bill</Button>
      )}
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default DeleteButton;
