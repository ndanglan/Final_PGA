import React, { memo } from 'react'
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material'
import { WHITE_COLOR, MEDIUM_PURPLE, DARK_BLUE } from '../../../configs/colors'
import InputGroup from '../../common/components/Layout/InputGroup';
import { makeStyles } from "@mui/styles";

interface Props {
  label?: string,
  inputSize?: number,
  required: boolean,
  data: {
    group: string,
    value: string,
    name: string
  }[],
  onChange(e: any): void
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
  }
}))

const SelectMultiGroupInput = (props: Props) => {
  const {
    label,
    required,
    inputSize,
    data,
    onChange
  } = props;

  const classes = useStyles();

  return (
    <InputGroup
      label={label}
      required={required}
      inputSize={inputSize ? inputSize : undefined}
    >
      <Autocomplete
        multiple
        className={classes.input}
        options={data}
        disableClearable
        onChange={(e, data) => onChange(data.map(item => item.value))}
        groupBy={(option) => String(option.group)}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            disabled
          />
        )}
      />
    </InputGroup>
  )
}

export default memo(SelectMultiGroupInput)