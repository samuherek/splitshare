import React from 'react';
import { useQueryReceipt } from '../../../graphql/receipt/queryReceipt';
import { useDateUtils } from '../../../libs/date-utils';
import Button from '../../../ui/Button';
import Dialog, { useDialogState } from '../../../ui/Dialog';
import DialogActions from '../../../ui/DialogActions';
import DialogContent from '../../../ui/DialogContent';
import ErrorMessage from '../../../ui/ErrorMessage';
import Typography from '../../../ui/Typography';
import { getSplitKey } from '../../../utils/split';
import { getDisplayName } from '../../../utils/user';

type Props = {
  receiptId: string | null;
  callback: () => void;
};

function ReceiptDetailsDialog({ receiptId, callback }: Props) {
  const { isOpen, openDialog, closeDialog } = useDialogState();
  const dateUtils = useDateUtils();

  const { data, loading, error } = useQueryReceipt({
    receiptId: receiptId || '',
    queryOpts: {
      skip: !receiptId,
    },
  });

  React.useEffect(() => {
    if (receiptId && !isOpen) {
      openDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptId, openDialog]);

  const receipt = data?.receipt;

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
          <DialogContent>
            <Typography variant="h3" component="h3">
              {receipt.title}
            </Typography>
            <Typography>
              paid by {getDisplayName(receipt.paidBy)} on{' '}
              {dateUtils.format(receipt.paidAt, 'euFullDate')}
            </Typography>

            <Typography>
              {receipt.total} {receipt.currency}
            </Typography>

            {receipt.splits.map(split => (
              <div key={getSplitKey(split)}>
                <Typography>
                  {getDisplayName(split.user)} owes to{' '}
                  {getDisplayName(split.owingTo)}
                </Typography>
                <span>
                  {split.value} {split.currency}
                </span>
              </div>
            ))}

            <Typography>{receipt.comment}</Typography>
          </DialogContent>
        ) : null}
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default ReceiptDetailsDialog;
