import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import DatePicker from '../../../components/DatePicker/components/DatePicker/DatePicker';
import ErrorMessage from '../../../components/ErrorMessage';
import UserSplit from '../../../components/UserSplit';
import useReceiptNewController from '../../../controllers/receipt/useReceiptNewController';
import {
  MutationCreateReceiptResponse,
  useMutationCreateReceipt,
} from '../../../graphql/receipt/mutationCreateReceipt';
import { Bill } from '../../../graphql/types';
import useDateNow from '../../../hooks/useDateNow';
import Dialog, { useDialogState } from '../../../ui/components/Dialog';
import DialogActions from '../../../ui/components/DialogActions';
import DialogContent from '../../../ui/components/DialogContent';
import DialogTitle from '../../../ui/components/DialogTitle';
import TextField from '../../../ui/components/TextField';
import Typography from '../../../ui/components/Typography';
import Button from '../../../ui/theme/Button';
import Fieldset from '../../../ui/theme/Fieldset';

type Props = {
  bill: Bill;
  callback: () => void;
};

function AddReceiptDialog({ bill, callback }: Props) {
  const { isOpen, openDialog, closeDialog } = useDialogState();
  const now = useDateNow();

  const {
    title,
    total,
    paidAt,
    paidBy,
    splits,
    allowSubmit,
  } = useReceiptNewController({ users: bill.users, splits: {} });

  const [createReceipt, { loading, error }] = useMutationCreateReceipt({
    billId: bill.id,
    title: title.value,
    paidAt: paidAt.value || now.toDate(),
    paidById: paidBy.value || '',
    total: total.parsedValue,
    currency: bill.currency,
    splits: splits.getInputSplits(),
  });

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    if (allowSubmit) {
      const [err, res]: [
        Error,
        ExecutionResult<MutationCreateReceiptResponse>
      ] = await tryToCatch(createReceipt);

      if (!err && res.data?.createReceipt) {
        callback();
        closeDialog();
      }
    }
  }

  return (
    <>
      <Button onClick={openDialog}>Add receipt</Button>
      <Dialog
        isOpen={isOpen}
        onClose={!loading && closeDialog}
        variant="fullscreen"
        duration={150}
      >
        <DialogTitle>
          <Typography variant="h3" component="h3">
            Create receipt for {bill.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Fieldset disabled={loading}>
              <TextField
                name="receipt-title"
                label="Title"
                required
                value={title.value}
                onChange={title.onChange}
              />
              <DatePicker
                value={paidAt.value}
                onChange={paidAt.onChange}
                openToView="date"
                disableFuture={true}
                views={['year', 'month', 'date']}
                inputFormat="DD. MMM, YYYY"
                // @ts-ignore
                label="Paid at day"
                required={true}
              />
              <TextField
                name="receipt-total"
                value={total.value}
                onChange={total.onChange}
                required={true}
                label="Total"
              />
              {bill.users.map(user => (
                <UserSplit
                  key={user.id}
                  user={user}
                  isPayer={user.id === paidBy.value}
                  onPaidByChange={paidBy.onChange}
                  value={splits.getSplitValue(user.id)}
                  onValueChange={splits.onChange}
                />
              ))}
              {splits.errors
                ? splits.errors.map((err, i) => (
                    <div key={i}>{err.message}</div>
                  ))
                : null}
            </Fieldset>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={loading}>
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !allowSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default AddReceiptDialog;
