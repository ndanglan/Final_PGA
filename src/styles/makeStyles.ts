import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  bgRoot: {
    backgroundColor: '#323259'
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