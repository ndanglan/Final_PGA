import React from 'react'
import {
  Controller,
  useFormContext
} from 'react-hook-form'
import { makeStyles } from '@mui/styles';
import { Autocomplete, TextField } from '@mui/material';
import FormControlGroup from '../FormControlGroup';
import { CommonSelectProps } from '../../../../models/products'
import {
  DARK_PURPLE,
  MEDIUM_PURPLE,
  WHITE_COLOR,
} from '../../../../configs/colors';

interface Props {
  label: string,
  name: string,
  data?: CommonSelectProps[],
  required: {
    value: boolean,
    message: string
  }
}

const useStyles = makeStyles(({
  autocomplete: {
    '& .MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        padding: '0 !important',

        '& .MuiOutlinedInput-input': {
          padding: '10px 15px',
          borderColor: 'transparent',
        },

        '& .MuiAutocomplete-endAdornment': {

          '& .MuiAutocomplete-clearIndicator': {
            display: 'none'
          }
        },

        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        },

        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',

          '& legend': {
            display: 'none'
          }
        },

        '& .MuiChip-root': {
          backgroundColor: MEDIUM_PURPLE,

          '& .MuiChip-label': {
            color: '#fff'
          }
        }
      }
    }
  }
}))

const ControlAutocompleteInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext();

  const classes = useStyles();

  return (
    <FormControlGroup
      label={props.label}
      required={props.required.value}
      errrorMessage={errors[`${props.name}`]?.message}
    >
      <Controller
        control={control}
        name={props.name}
        render={({ field: { onChange, value, onBlur } }) => {
          const defaultVal = props?.data?.filter(item => item.id === value);

          return (
            <Autocomplete
              className={classes.autocomplete}
              disablePortal
              value={{
                id: value,
                name: defaultVal && defaultVal[0] ? defaultVal[0].name : ''
              }}
              ListboxProps={{
                style: {
                  backgroundColor: DARK_PURPLE,
                  color: WHITE_COLOR
                }
              }}
              options={props.data ? props.data : []}
              getOptionLabel={(option) => option?.name ? option.name : ''}
              renderInput={
                (params) =>
                  <TextField
                    {...params}
                    placeholder={`Type to search ${props.label}`}
                  />
              }
              onChange={(_, data) => {
                if (typeof data?.id === 'string' || typeof data?.id === 'number') {
                  onChange(data?.id)
                }
              }}
              onBlur={onBlur}
            />
          )
        }}
        rules={{
          required: props.required
        }}
      />
    </FormControlGroup>
  )
}

export default ControlAutocompleteInput