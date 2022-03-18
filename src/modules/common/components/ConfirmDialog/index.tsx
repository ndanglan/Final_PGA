import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BG_HOVER, DARK_PURPLE, MEDIUM_PURPLE, RED_COLOR, WHITE_COLOR } from '../../../../configs/colors';

export interface DialogProps {
  open: boolean,
  title: string,
  content: string,
  onClose?(): void,
  onConfirm?(): void
}

const useStyles = makeStyles({
  button: {
    '&.MuiButton-root': {
      color: WHITE_COLOR,
    },

    '&.MuiButton-root:hover': {
      opacity: '0.9',
      backgroundColor: BG_HOVER
    }
  }
})

const ConfirmDialog = (props: DialogProps) => {
  const { open, content, title, onClose, onConfirm, ...other } = props;
  const classes = useStyles();

  return (
    <Dialog
      sx={{
        margin: '0',
        padding: '0',
        backgroundColor: 'rgba(0,0,0,0.2)'
      }}
      PaperProps={{
        style: {
          backgroundColor: DARK_PURPLE,
          padding: '0 10px'
        }
      }}
      open={open}
      {...other}
    >
      <DialogTitle
        sx={{
          color: WHITE_COLOR,
          padding: '20px'
        }}
      >{title}</DialogTitle>
      <DialogContent
        sx={{
          padding: '20px'
        }}>
        <DialogContentText
          sx={{
            color: WHITE_COLOR
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{
        display: "flex",
        justifyContent: 'space-between',
        padding: '20px'
      }}
      >
        <div>
          <Button
            className={classes.button}
            onClick={onConfirm}
            sx={{
              backgroundColor: MEDIUM_PURPLE
            }}
          >
            Yes
          </Button>
        </div >
        <div>
          <Button
            className={classes.button}
            onClick={onClose}
            sx={{
              backgroundColor: RED_COLOR
            }}
          >
            No
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;