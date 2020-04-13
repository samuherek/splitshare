// @flow
import React from 'react';

interface Props {
  initialState?: boolean;
}

export default function useDialogState({ initialState = false }: Props = {}) {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const openDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeDialog = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggleDialog = React.useCallback(() => setIsOpen(s => !s), [setIsOpen]);

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
}
