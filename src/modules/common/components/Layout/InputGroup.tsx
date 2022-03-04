import React from 'react'
import { FormGroup, FormHelperText, FormLabel, Grid, Input, InputLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { BLACK_COLOR, BORDER_COLOR, DARK_BLUE, DARK_PURPLE, MEDIUM_BLUE, WHITE_COLOR } from '../../../../configs/colors'

interface Props {
  label: string,
  helper?: string,
  children: JSX.Element[] | JSX.Element,
  required: boolean,
  labelSize?: number,
  inputSize?: number,
  error?: boolean;
}

const useStyles = makeStyles(({
  formControl: {
    '&.MuiFormGroup-root': {
      flexDirection: 'row',
      color: WHITE_COLOR,
      columnGap: '20px',
      position: 'relative',
      marginBottom: '1.5rem',

      '& .grid-label': {
        padding: '0 15px',
        margin: '0.25rem 0',
        textTransform: 'capitalize',
        textAlign: 'right'
      }
    },

    '& input, & button': {
      borderRadius: '0.25rem',
      fontSize: '15px',
      fontWeight: '500',
      padding: '10px 15px',
      height: '40px',
      backgroundColor: MEDIUM_BLUE,
      color: '#fff',
      border: `1px solid ${BORDER_COLOR}`,
      outline: 'none',
      width: '100%',
      textAlign: 'left'
    },

    '& .MuiOutlinedInput-root': {
      width: '100%',
      color: WHITE_COLOR,
      backgroundColor: MEDIUM_BLUE,

      '& .MuiSelect-select': {
        padding: '0',
        height: '40px',

      },

      '& .MuiSvgIcon-root': {
        color: WHITE_COLOR
      },

      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `none`,

        '& legend': {
          display: 'none'
        }
      }
    },

    '& .MuiFormHelperText-root': {
      color: '#979797'
    },
  }
}))

const InputGroup = (props: Props) => {
  const classes = useStyles();
  return (
    <FormGroup className={classes.formControl}>
      <Grid
        item
        md={props.labelSize ? props.labelSize : 2}
        className='grid-label'
        component="label"
      >
        {props.label}
        {props.required && (
          <FormHelperText
            error={true}
            component="span"
            sx={{
              padding: '0 5px'
            }}
          >
            *
          </FormHelperText>
        )}
      </Grid>
      <Grid
        item
        md={props.inputSize ? props.inputSize : 4}
        sx={{
          padding: '0 15px',
          position: 'relative',
        }}>
        {props.children}
        {props.helper && (
          <FormHelperText error={props.error}>
            {props.helper}
          </FormHelperText>
        )}
      </Grid>
    </FormGroup>
  )
}

export default InputGroup