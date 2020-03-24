import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import DatePicker from '../../../components/DatePicker/components/DatePicker/DatePicker';
import UserSplit from '../../../components/UserSplit';
import useReceiptEditController from '../../../controllers/receipt/useReceiptEditController';
import {
  MutationUpdateReceiptResponse,
  useMutationUpdateReceipt,
} from '../../../graphql/receipt/mutationUpdateReceipt';
import { useQueryReceipt } from '../../../graphql/receipt/queryReceipt';
import { Receipt } from '../../../graphql/types';
import useDateNow from '../../../hooks/useDateNow';
import { useDateUtils } from '../../../libs/date-utils';
import { getInputSplitsFromSplits } from '../../../libs/splits';
import Button from '../../../ui/Button';
import Dialog, { useDialogState } from '../../../ui/Dialog';
import DialogActions from '../../../ui/DialogActions';
import DialogContent from '../../../ui/DialogContent';
import DialogTitle from '../../../ui/DialogTitle';
import ErrorMessage from '../../../ui/ErrorMessage';
import Fieldset from '../../../ui/Fieldset';
import TextField from '../../../ui/TextField';
import Typography from '../../../ui/Typography';
import { maybe } from '../../../utils/object';
import {
  hasArrayLength,
  hasDate,
  hasStringLength,
  isNumber,
  notEqual,
} from '../../../utils/validation';

type Props = {
  receipt: Receipt | null;
  callback: () => void;
};

function EditReceiptDialog({ receipt: receiptProp, callback }: Props) {
  const { isOpen, openDialog, closeDialog } = useDialogState();
  const dateUtils = useDateUtils();
  const now = useDateNow();

  const receiptQuery = useQueryReceipt({
    receiptId: receiptProp?.id ?? '',
    queryOpts: {
      skip: !receiptProp,
    },
  });

  // We use a temp object with all the fields as a fallback
  // so Typescript does not complain and we still are in typechecking.
  // @ts-ignore
  const receipt: Receipt = receiptQuery.data?.receipt ?? {
    id: '',
    title: '',
    total: 0,
    paidAt: now,
    paidBy: { id: '' },
    splits: [],
  };

  const {
    title,
    total,
    paidAt,
    paidBy,
    splits,
    allowSubmit,
  } = useReceiptEditController({
    title: receipt.title,
    total: receipt.total,
    paidAt: receipt.paidAt,
    paidById: receipt.paidBy.id,
    splits: receipt.splits,
  });

  const [updateReceipt, { loading, error }] = useMutationUpdateReceipt({
    receiptId: receipt.id,
    ...maybe('title', title.value, notEqual(receipt.title), hasStringLength),
    ...maybe(
      'paidAt',
      paidAt.value,
      notEqual(receipt.paidAt),
      hasDate(dateUtils)
    ),
    ...maybe(
      'paidById',
      paidBy.value,
      notEqual<string | null>(receipt.paidBy.id),
      hasStringLength
    ),
    ...maybe('total', total.parsedValue, notEqual(receipt.total), isNumber),
    ...maybe('splits', getInputSplitsFromSplits(splits.value), hasArrayLength),
  });

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    if (allowSubmit) {
      const [err, res]: [
        Error,
        ExecutionResult<MutationUpdateReceiptResponse>
      ] = await tryToCatch(updateReceipt);

      if (!err && res.data?.updateReceipt) {
        callback();
        closeDialog();
      }
    }
  }

  React.useEffect(() => {
    if (receiptProp && !isOpen) {
      openDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptProp, openDialog]);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={!loading && closeDialog}
        variant="fullscreen"
        duration={150}
        onExited={callback}
      >
        {receipt ? (
          <>
            <DialogTitle>
              <Typography variant="h3" component="h3">
                Edit {receipt.title}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Fieldset disabled={loading}>
                  <TextField
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
                    value={total.value}
                    onChange={total.onChange}
                    required={true}
                    label="Total"
                  />
                  {receipt.splits.map(split => (
                    <UserSplit
                      key={split.user.id}
                      user={split.user}
                      isPayer={split.user.id === paidBy.value}
                      onPaidByChange={paidBy.onChange}
                      value={splits.getSplitValue(split.user.id)}
                      onValueChange={splits.onChange}
                    />
                  ))}
                  {splits.errors?.map((err, i) => (
                    <div key={i}>{err.message}</div>
                  ))}
                </Fieldset>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Close</Button>
              <Button onClick={handleSubmit} disabled={loading || !allowSubmit}>
                Update
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default EditReceiptDialog;
