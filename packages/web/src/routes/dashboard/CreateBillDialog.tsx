import { ExecutionResult } from 'graphql';
import React from 'react';
import tryToCatch from 'try-to-catch';
import CurrencyPicker from '../../components/CurrencyPicker';
import useBillNameController from '../../controllers/bill/useBillNameController';
import useCurrencyController from '../../controllers/currency/useCurrencyController';
import {
  MutationCreateBillResponse,
  useMutationCreateBill,
} from '../../graphql/bill/mutationCreateBill';
import useAllowSubmit from '../../hooks/useAllowSubmit';
import Button from '../../ui/Button';
import Dialog from '../../ui/Dialog';
import DialogActions from '../../ui/DialogActions';
import DialogContent from '../../ui/DialogContent';
import DialogTitle from '../../ui/DialogTitle';
import ErrorMessage from '../../ui/ErrorMessage';
import Fieldset from '../../ui/Fieldset';
import TextField from '../../ui/TextField';
import Typography from '../../ui/Typography';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateBillDialog({ isOpen, onClose }: Props) {
  const { name } = useBillNameController();
  const { currency } = useCurrencyController();

  const [createBill, { loading, error }] = useMutationCreateBill({
    name: name.value,
    currency: currency.value,
  });

  const allowSubmit = useAllowSubmit({ name }, { name: name.value }, ['name']);

  async function handleSubmit(ev: any) {
    ev.preventDefault();

    if (allowSubmit) {
      // TODO: Lear now to create tryToCatch module
      const [err, res]: [
        Error,
        ExecutionResult<MutationCreateBillResponse>
      ] = await tryToCatch(createBill);

      if (!err && res.data?.createBill) {
        onClose();
      }
    }
  }

  return (
    <>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <DialogTitle>
          <Typography>Start a bill</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Fieldset
              disabled={loading}
              style={{
                marginBottom: 48,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                name="name"
                label="Name"
                required
                value={name.value}
                onChange={name.onChange}
              />
              <CurrencyPicker
                value={currency.value}
                onChange={currency.onChange}
              />
            </Fieldset>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} disabled={loading || !allowSubmit}>
            Create
          </Button>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {error ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default CreateBillDialog;
