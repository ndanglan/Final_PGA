import React from 'react'
import {
  Controller,
  useFormContext
} from 'react-hook-form'
import InputGroup from '../../common/components/Layout/InputGroup';
import { makeStyles } from '@mui/styles';
import { Autocomplete, TextField } from '@mui/material';
import { CommonSelectProps } from '../../../models/products'
import {
  MEDIUM_PURPLE,
} from '../../../configs/colors';

interface Props {
  label: string,
  name: string,
  required: boolean,
  data?: CommonSelectProps[],
  labelSize?: number,
  inputSize?: number
}

const useStyles = makeStyles(({
  autocomplete: {
    '& .MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        padding: '0 !important',

        '& .MuiOutlinedInput-input': {
          borderColor: 'transparent',
          padding: '0  0 0 10px',
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

const ControlAutocompleteMultipleInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext();

  const classes = useStyles();

  return (
    <InputGroup
      label={props.label}
      required={props.required}
      inputSize={props.inputSize ? props.inputSize : 6}
      labelSize={props.labelSize ? props.labelSize : 2}
      errorsType={errors[`${props.name}`] ? 'required' : undefined}
    >
      <Controller
        control={control}
        name={props.name}
        render={({
          field: { onChange, onBlur, value, ...others }
        }) => {

          return (
            <Autocomplete
              {...others}
              onBlur={onBlur}
              value={value}
              multiple
              filterSelectedOptions
              className={classes.autocomplete}
              disablePortal
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
                onChange(data);
              }}
            />
          )
        }}
        rules={{
          required: true
        }}
      />
    </InputGroup>
  )
}

export default ControlAutocompleteMultipleInput