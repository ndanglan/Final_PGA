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
import { RequiredRuleProps } from '../../../../models/input';

interface Props {
  label: string,
  name: string,
  required: RequiredRuleProps,
  data?: CommonSelectProps[],
  labelSize?: number,
  inputSize?: number,
  placeHolder?: string
}

const useStyles = makeStyles(({
  autocomplete: {
    '& .MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        padding: '0 !important',

        '& .MuiOutlinedInput-input': {
          borderColor: 'transparent',
          padding: '10px 15px',
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
    <FormControlGroup
      label={props.label}
      required={props.required.value}
      inputSize={props.inputSize ? props.inputSize : 6}
      labelSize={props.labelSize ? props.labelSize : 2}
      errrorMessage={errors[`${props.name}`]?.message}
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
              disableCloseOnSelect
              className={classes.autocomplete}
              disablePortal
              options={props.data ? props.data : []}
              getOptionLabel={(option) => option?.name ? option.name : ''}
              ListboxProps={{
                style: {
                  backgroundColor: DARK_PURPLE,
                  color: WHITE_COLOR
                }
              }}
              renderInput={
                (params) =>
                  <TextField
                    {...params}
                    placeholder={
                      props.placeHolder
                        ? props.placeHolder
                        : ''
                    }
                    variant='outlined'
                  />
              }
              onChange={(_, data) => {
                onChange(data);
              }}
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

export default ControlAutocompleteMultipleInput