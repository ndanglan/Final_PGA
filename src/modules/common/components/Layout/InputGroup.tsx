import React, { memo } from 'react'
import { FormGroup, FormHelperText, Grid, } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { BORDER_COLOR, DARK_PURPLE, MEDIUM_BLUE, WHITE_COLOR } from '../../../../configs/colors'
import { LiteralUnion } from 'react-hook-form';

interface Props {
  label?: string,
  helper?: string,
  children: any,
  required: boolean,
  labelSize?: number,
  inputSize?: number,
  error?: boolean;
  errorsType?: LiteralUnion<"required" | "min" | "max" | "maxLength" | "minLength" | "pattern" | "validate" | "valueAsNumber" | "valueAsDate" | "value" | "setValueAs" | "shouldUnregister" | "onChange" | "onBlur" | "disabled" | "deps", string> | undefined
}

const useStyles = makeStyles(({
  formControl: {
    position: 'relative',

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

    '& input': {
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
      },

      '& .MuiFormHelperText-root': {
        color: '#979797'
      },
    },

    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px !important',
    },

    '& .MuiSvgIcon-root': {
      color: `${WHITE_COLOR} !important`
    }
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
        sx={{
          display: props.labelSize === 0 ? 'none' : 'inline-block'
        }}
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
          position: 'relative',
        }}>
        {props.children}
        {props.errorsType === 'required' &&
          <FormHelperText error={true}>
            This field is required
          </FormHelperText>
        }
        {props.errorsType === 'pattern' &&
          <FormHelperText error={true}>
            Pattern is invalid
          </FormHelperText>
        }
        {props.errorsType === 'validate' &&
          <FormHelperText error={true}>
            Password is not match
          </FormHelperText>
        }
      </Grid>
    </FormGroup>
  )
}

export default memo(InputGroup)