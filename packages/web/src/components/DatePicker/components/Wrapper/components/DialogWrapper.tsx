import React from 'react';
import Dialog from '../../../../../ui/components/Dialog';
import DialogActions from '../../../../../ui/components/DialogActions';
import DialogContent from '../../../../../ui/components/DialogContent';
import Button from '../../../../../ui/theme/Button';
import DateInput, { DateInputProps } from '../../DateInput/DateInput';

type DialogWrapperProps = {
  open: boolean;
  inputProps: DateInputProps<any, any>;
  children: React.ReactNode;
  onDismiss: () => void;
  onAccept: () => void;
};

// const PaperStyled = styled(Paper)`
//   display: flex;
//   flex-direction: column;
//   margin: 48px;
//   position: relative;
//   overflow-y: auto;
//   flex: 0 1 auto;
//   max-height: calc(100% - 96px);
//   max-width: 600px;

//   @media print {
//     overflow-y: visible;
//     box-shadow: none;
//   }
// `;

// const DocumentDivStyled = styled.div`
//   display: flex;
//   justify-content: center;
//   /* height: 100%; */
//   outline: none;
// `;

function DialogWrapper({
  open,
  inputProps,
  children,
  onDismiss,
  onAccept,
  ...rest
}: DialogWrapperProps) {
  return (
    <>
      <DateInput {...inputProps} {...rest} />
      <Dialog isOpen={open} onClose={onDismiss}>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onDismiss}>Cancel</Button>
          <Button onClick={onAccept}>Ok</Button>
        </DialogActions>
      </Dialog>
      {/* <Modal role="dialog" isOpen={open} onClose={onDismiss}>
        <Grow appear in={open} duration={170}>
          <DocumentDivStyled
            role="document"
            tabIndex={0}
            onClick={handleBackdropClick}
          >
            <PaperStyled>{children}</PaperStyled>
          </DocumentDivStyled>
        </Grow>
      </Modal> */}
    </>
  );
}

export default DialogWrapper;
