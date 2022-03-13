import React, { memo } from 'react'
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material'
import { WHITE_COLOR, MEDIUM_PURPLE, DARK_BLUE, DARK_PURPLE, DATE_TEXT_COLOR } from '../../../../configs/colors'
import InputGroup from '../Layout/InputGroup';
import { makeStyles } from "@mui/styles";
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  label?: string,
  inputSize?: number,
  labelSize?: number,
  required: boolean,
  name: string
  data: {
    group: string,
    value: string,
    name: string
  }[],
}

const useStyles = makeStyles(({
  input: {
    '& .MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        padding: '0',
        border: `1px solid ${DARK_BLUE}`,

        '& input': {
          padding: '0 0 0 10px',
          border: 'none',
        },

        '& fieldset': {
          padding: '0',
          border: 'none',

          '& legend': {
            display: 'none'
          }
        },

        '& .MuiChip-root': {
          backgroundColor: MEDIUM_PURPLE,
          color: WHITE_COLOR
        }
      }
    }
  },

  list: {
    backgroundColor: DARK_PURPLE,
    color: WHITE_COLOR,

    '& .MuiListSubheader-root': {
      backgroundColor: DARK_PURPLE,
      color: DATE_TEXT_COLOR,
      fontSize: '16px',
      fontWeight: '700'
    },

    '& .MuiSvgIcon-root': {
      color: WHITE_COLOR,
    }
  }
}))

const ControlSelectMultiGroupInput = (props: Props) => {
  const {
    label,
    name,
    required,
    inputSize,
    labelSize,
    data
  } = props;

  const { control } = useFormContext();

  const classes = useStyles();

  return (
    <InputGroup
      label={label}
      required={required}
      inputSize={inputSize ? inputSize : undefined}
      labelSize={labelSize || labelSize === 0 ? labelSize : 2}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            className={classes.input}
            options={data}
            disableCloseOnSelect
            disableClearable
            ListboxProps={{
              className: classes.list
            }}
            onChange={(e, data) => {
              field.onChange(data)
            }}
            groupBy={(option) => String(option.group)}
            getOptionLabel={(option) => {
              if (option?.name) {
                return option.name
              }
            }}
            renderOption={(props, option, { selected }) => {
              return <li {...props}>
                <Checkbox
                  checked={selected}
                />
                {option.name}
              </li>
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                disabled
              />
            )}
          />
        )}
      />
    </InputGroup>
  )
}

export default memo(ControlSelectMultiGroupInput)