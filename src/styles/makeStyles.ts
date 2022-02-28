import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  bgRoot: {
    backgroundColor: '#323259'
  },

  appBar: {
    '&.MuiAppBar-root': {
      backgroundColor: '#323259'
    },

    '& .MuiToolbar-root': {
      padding: '1rem'
    },

    '& .MuiTypography-h5': {
      fontSize: '28px'
    },
  },

  accountButtonAppBar: {
    position: 'relative',
    opacity: 0.5,
    transition: '0.3s all ease-in-out',

    '& .popover-account': {
      display: 'none',
      position: 'absolute',
      minWidth: "200px",
      padding: '0.5rem 1rem',
      backgroundColor: '#fff',
      right: 0,
      borderRadius: '5px',

      '& .MuiTypography-subtitle1': {
        color: '#000',
        fontSize: '14px'
      },

      '& a': {
        display: 'block',
        marginTop: '10px',
        color: '#000',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: '15px',
        cursor: 'pointer',

        '&:hover': {
          color: '#5ca1e7'
        }
      }
    },

    '&:hover': {
      opacity: 1,

      '& .popover-account': {
        display: 'block'
      }
    }
  },

  sideBar: {
    '& .MuiPaper-root': {
      top: '80px',
      zIndex: '999',
      backgroundColor: '#323259',
    },

    '& .MuiListItemButton-root': {
      borderBottom: '1px solid #000',
      color: '#fff',

      '& .MuiListItemIcon-root': {
        color: '#fff',
      }
    },

    '& .collapse-item-active': {
      color: '#b18aff',

      '& .MuiListItemIcon-root': {
        color: '#b18aff !important',
      }
    }
  },

  mainButton: {
    '& .MuiButton-root': {
      backgroundColor: '#b18aff',
      color: '#fff',
      transition: '0.3s all ease-in-out',
      '&:hover': {
        backgroundColor: '#b18aff',
        color: '#1b1b38',
      }
    }
  },

  textPrimary: {
    color: '#fff'
  },

  textSecondary: {
    color: '#066dd8'
  },

  inputField: {
    '& .MuiInputLabel-root': {
      color: '#fff',

      '&.Mui-focused': {
        color: "#fff"
      }
    },
    // đổi màu khi focus
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: '#fff'
      }
    },

    '& input': {
      color: '#fff',
      borderColor: '#fff',
      backgroundColor: '#252547',
      borderRadius: '5px'
    }
  }
})