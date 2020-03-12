import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import {
  MutationCreateReceiptResponse,
  useMutationCreateReceipt,
} from '../../../graphql/receipt/mutationCreateReceipt';
import { Bill } from '../../../graphql/types';
import Button from '../../../ui/Button';
import Dialog, { useDialogState } from '../../../ui/Dialog';
import DialogActions from '../../../ui/DialogActions';
import DialogContent from '../../../ui/DialogContent';
import DialogTitle from '../../../ui/DialogTitle';
import ErrorMessage from '../../../ui/ErrorMessage';
import Fieldset from '../../../ui/Fieldset';
import TextField from '../../../ui/TextField';
import Typography from '../../../ui/Typography';

type Props = {
  bill: Bill;
  callback: () => void;
};

function AddReceiptDialog({ bill, callback }: Props) {
  const { isOpen, openDialog, closeDialog } = useDialogState();

  const [createReceipt, { loading, error }] = useMutationCreateReceipt({
    billId: bill.id,
    title: 'first bill',
    paidAt: new Date(),
    paidById: bill.users[0].id,
    total: 5,
    currency: bill.currency,
    splits: bill.users.map(u => ({ userId: u.id, value: 2.5 })),
  });

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    const [err, res]: [
      Error,
      ExecutionResult<MutationCreateReceiptResponse>
    ] = await tryToCatch(createReceipt);

    if (!err && res.data?.createReceipt) {
      callback();
      closeDialog();
    }
  }

  return (
    <>
      <Button onClick={openDialog}>Add receipt</Button>
      <Dialog isOpen={isOpen} onClose={!loading && closeDialog}>
        <DialogTitle>
          <Typography variant="h3" component="h3">
            Create receipt for {bill.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Fieldset disabled={loading}>
              <TextField label="Title" required />
            </Fieldset>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={loading}>
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default AddReceiptDialog;
