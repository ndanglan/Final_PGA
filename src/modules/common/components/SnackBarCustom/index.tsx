import React from 'react'
import { Alert, IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  message: string,
  duration?: number,
  type?: 'success' | 'info' | 'warning' | 'error',
  open: boolean,
  onClose?(): void
}

const SnackBarCustom = (props: Props) => {
  const { message, open, type, duration, onClose } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={duration ? duration : 1500}
      onClose={onClose}
    >
      <Alert
        variant='filled'
        onClose={onClose}
        severity={type}
        sx={{ width: '300px' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBarCustom