import React from 'react';
import Button from '../../ui/Button';
import Dialog from '../../ui/Dialog';
import DialogActions from '../../ui/DialogActions';
import DialogContent from '../../ui/DialogContent';
import DialogTitle from '../../ui/DialogTitle';
import TextField from '../../ui/TextField';
import Typography from '../../ui/Typography';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateBillDialog({ isOpen, onClose }: Props) {
  return (
    <>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <DialogTitle>
          <Typography>Start a bill</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateBillDialog;
