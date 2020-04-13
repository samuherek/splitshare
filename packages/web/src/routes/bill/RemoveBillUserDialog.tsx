import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import ErrorMessage from '../../components/ErrorMessage';
import {
  MutationRemoveBillUserResponse,
  useMutationRemoveBillUser,
} from '../../graphql/bill/mutationRemoveBillUser';
import { BillUser } from '../../graphql/types';
import Dialog, { useDialogState } from '../../ui/components/Dialog';
import DialogActions from '../../ui/components/DialogActions';
import DialogContent from '../../ui/components/DialogContent';
import DialogTitle from '../../ui/components/DialogTitle';
import Typography from '../../ui/components/Typography';
import Button from '../../ui/theme/Button';

type Props = {
  billUser: BillUser | null;
  billId: string;
  callback: () => void;
};

function RemoveBillUserDialog({ billUser, billId, callback }: Props) {
  const [cachedUser, setCachedUser] = React.useState<BillUser | null>(billUser);

  const { isOpen, openDialog, closeDialog } = useDialogState();

  const [removeBillUser, { loading, error }] = useMutationRemoveBillUser({
    billId,
    userId: cachedUser?.id ?? '',
  });

  React.useEffect(() => {
    if (billUser && !isOpen) {
      setCachedUser(billUser);
      openDialog();
    } else if (!billUser && isOpen) {
      closeDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billUser]);

  async function handleRemoveBillUser() {
    const [err, res]: [
      Error,
      ExecutionResult<MutationRemoveBillUserResponse>
    ] = await tryToCatch(removeBillUser);

    if (!err && res.data?.removeBillUser) {
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
            If you remove{' '}
            <strong>{cachedUser?.firstName || cachedUser?.email}</strong> from
            the bill, the will no longer be able to access it. Though you can
            always invite them back.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveBillUser} disabled={loading}>
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

export default RemoveBillUserDialog;
