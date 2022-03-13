import React from 'react'
import {
  Controller,
  useFormContext
} from 'react-hook-form'
import InputGroup from '../Layout/InputGroup';
import { makeStyles } from '@mui/styles';
import { Autocomplete, TextField } from '@mui/material';
import { CommonSelectProps } from '../../../../models/products'
import {
  MEDIUM_PURPLE,
} from '../../../../configs/colors';

interface Props {
  label: string,
  name: string,
  data?: CommonSelectProps[],
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

const ControlAutocompleteInput = (props: Props) => {
  const { control, watch, formState: { errors } } = useFormContext();

  const classes = useStyles();

  return (
    <InputGroup
      label={props.label}
      required={true}
      errorsType={errors[`${props.name}`] ? 'required' : undefined}
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
          required: true
        }}
      />
    </InputGroup>
  )
}

export default ControlAutocompleteInput