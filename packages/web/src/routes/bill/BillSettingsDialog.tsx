import { navigate } from '@reach/router';
import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import ButtonIcon from '../..//ui/components/ButtonIcon';
import CurrencyPicker from '../../components/CurrencyPicker';
import ErrorMessage from '../../components/ErrorMessage';
import SvgCogLight from '../../components/icons/CogLight';
import useBillNameController from '../../controllers/bill/useBillNameController';
import useCurrencyController from '../../controllers/currency/useCurrencyController';
import {
  MutationUpdateBillResponse,
  useMutationUpdateBill,
} from '../../graphql/bill/mutationUpdateBill';
import { Bill } from '../../graphql/types';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import Dialog, { useDialogState } from '../../ui/components/Dialog';
import DialogActions from '../../ui/components/DialogActions';
import DialogContent from '../../ui/components/DialogContent';
import DialogTitle from '../../ui/components/DialogTitle';
import TextField from '../../ui/components/TextField';
import Typography from '../../ui/components/Typography';
import Button from '../../ui/theme/Button';
import Fieldset from '../../ui/theme/Fieldset';
import { maybe } from '../../utils/object';
import ArchiveButton from './billSettingsDialog/ArchiveButton';
import DeleteButton from './billSettingsDialog/DeleteButton';

type Props = {
  bill: Bill;
};

function BillSettingsDialog({ bill }: Props) {
  const [navigateAway, setNavigateAway] = React.useState(false);

  const { isOpen, openDialog, closeDialog } = useDialogState();

  const { name } = useBillNameController({ name: bill.name });
  const { currency } = useCurrencyController({ currency: bill.currency });

  const [createBill, { loading, error }] = useMutationUpdateBill({
    billId: bill.id,
    ...maybe('name', name.value, (val) => val !== bill.name),
    ...maybe('currency', currency.value, (val) => val !== bill.currency),
  });

  const allowSubmit = useAllowSubmit(
    { name: bill.name, currency: bill.currency },
    { name: name.value, currency: currency.value }
  );

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    if (allowSubmit) {
      const [err, res]: [
        Error,
        ExecutionResult<MutationUpdateBillResponse>
      ] = await tryToCatch(createBill);

      if (!err && res.data?.updateBill) {
        // console.log('success', res);
      }
    }
  }

  return (
    <>
      <ButtonIcon onClick={openDialog}>
        <SvgCogLight />
      </ButtonIcon>
      <Dialog
        isOpen={isOpen}
        onClose={!loading && closeDialog}
        onExited={() => {
          if (navigateAway) navigate('/');
        }}
      >
        <DialogTitle>
          <Typography component="h3" variant="h3">
            Bill settings
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Fieldset
              disabled={loading}
              style={{
                marginBottom: 24,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                label="Name"
                name="name"
                value={name.value}
                onChange={name.onChange}
              />
              <CurrencyPicker
                value={currency.value}
                onChange={currency.onChange}
              />
            </Fieldset>
            <Button type="submit" disabled={!allowSubmit}>
              Update
            </Button>
          </form>
          <br />
          <div>
            <Typography variant="h4" component="h4">
              {Boolean(bill.closedAt) ? 'Unarchive bill' : 'Archive bill'}
            </Typography>
            <Typography>
              {Boolean(bill.closedAt)
                ? 'If you wish to reopen the bill, you can do so here. All actions will be allowed again.'
                : 'If you archive the bill, you will no longer be able to add receipts or change anything. However you will still be able to read everything.'}
            </Typography>
            <ArchiveButton
              archived={Boolean(bill.closedAt)}
              billId={bill.id}
              callback={closeDialog}
            />
          </div>
          <br />
          <div>
            <Typography variant="h4" component="h4">
              Delete bill
            </Typography>
            <Typography>
              If you decide to delete the bill, please keep in mind we will
              delete all the data relevant to this bill. All data will be lost.
            </Typography>
            <DeleteButton
              billId={bill.id}
              callback={() => {
                setNavigateAway(true);
                closeDialog();
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default BillSettingsDialog;
