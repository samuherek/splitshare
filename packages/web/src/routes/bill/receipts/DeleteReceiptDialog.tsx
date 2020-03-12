import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import {
  MutationDeleteReceiptResponse,
  useMutationDeleteReceipt,
} from '../../../graphql/receipt/mutationDeleteReceipt';
import { Receipt } from '../../../graphql/types';
import Button from '../../../ui/Button';
import Dialog, { useDialogState } from '../../../ui/Dialog';
import DialogActions from '../../../ui/DialogActions';
import DialogContent from '../../../ui/DialogContent';
import DialogTitle from '../../../ui/DialogTitle';
import ErrorMessage from '../../../ui/ErrorMessage';
import Typography from '../../../ui/Typography';

type Props = {
  receipt: Receipt | null;
  billId: string;
  callback: () => void;
};

function DeleteReceiptDialog({ receipt, callback, billId }: Props) {
  const [cachedReceipt, setCachedReceipt] = React.useState<Receipt | null>(
    receipt
  );

  const { isOpen, openDialog, closeDialog } = useDialogState();

  const [deleteReceipt, { loading, error }] = useMutationDeleteReceipt({
    receiptId: cachedReceipt?.id ?? '',
    // TODO: this should be done in a different way. I pass it down only
    // because of refetch/update
    billId,
  });

  React.useEffect(() => {
    if (receipt && !isOpen) {
      setCachedReceipt(receipt);
      openDialog();
    } else if (!receipt && isOpen) {
      closeDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt]);

  async function handleSubmit() {
    const [err, res]: [
      Error,
      ExecutionResult<MutationDeleteReceiptResponse>
    ] = await tryToCatch(deleteReceipt);

    if (!err && res.data?.deleteReceipt) {
      callback();
    }
  }

  return (
    <>
      <Dialog isOpen={isOpen} onClose={callback}>
        <DialogTitle>
          <Typography variant="h2" component="h2">
            Are you sure?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            If you delete the {cachedReceipt?.title} it will be removed from the
            bill as well as the balance.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} disabled={loading}>
            Delete
          </Button>
          <Button onClick={callback} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default DeleteReceiptDialog;
