import React from 'react'
import { Alert, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  content: string,
  type: 'success' | 'info' | 'warning' | 'error' | undefined,
  onClose(): void
}

const ToastifyCustom = (props: Props) => {
  return (
    <Alert

      variant="filled"
      severity={props.type}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            props.onClose()
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {props.content}
    </Alert>
  )
}

export default ToastifyCustom