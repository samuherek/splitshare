import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import ErrorMessage from '../../../components/ErrorMessage';
import {
  MutationUpdateBillResponse,
  useMutationUpdateBill,
} from '../../../graphql/bill/mutationUpdateBill';
import Button from '../../../ui/theme/Button';

type Props = {
  billId: string;
  callback: () => void;
  archived: boolean;
};

function ArchiveButton({ billId, callback, archived }: Props) {
  const [archiveConfirmation, setArchiveConfirmation] = React.useState(false);

  const [updateBill, { loading, error }] = useMutationUpdateBill({
    billId,
    closed: !archived,
  });

  async function handleSubmit() {
    const [err, res]: [
      Error,
      ExecutionResult<MutationUpdateBillResponse>
    ] = await tryToCatch(updateBill);

    if (!err && res.data?.updateBill) {
      callback();
    }
  }

  return (
    <>
      {archiveConfirmation ? (
        <>
          <Button
            disabled={loading}
            onClick={() => setArchiveConfirmation(false)}
          >
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            {archived ? 'Yes unarchive' : 'Yes archive'}
          </Button>
        </>
      ) : (
        <Button onClick={() => setArchiveConfirmation(true)}>
          {archived ? 'Unarchive bill' : 'Archive bill'}
        </Button>
      )}
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default ArchiveButton;
