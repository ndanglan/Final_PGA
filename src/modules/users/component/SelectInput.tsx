import React, { memo } from 'react'
import { MenuItem, Select } from '@mui/material'
import InputGroup from '../../common/components/Layout/InputGroup'
import { DARK_BLUE, DARK_PURPLE, WHITE_COLOR } from '../../../configs/colors'
import { makeStyles } from '@mui/styles'

interface Props {
  label?: string,
  inputSize?: number,
  required: boolean,
  data: {
    value: string,
    name: string
  }[],
  onChange(e: string): void
}

const useStyles = makeStyles(({
  select: {
    '&.MuiOutlinedInput-root': {
      '& .MuiSelect-select': {
        border: `1px solid ${DARK_BLUE}`
      },

      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',

        '& legend': {
          display: 'none'
        }
      }
    }
  }
}))

const SelectInput = (props: Props) => {
  const { label, inputSize, required, data, onChange } = props;

  const classes = useStyles();

  return (
    <InputGroup
      label={label}
      required={required}
      inputSize={inputSize ? inputSize : undefined}
    >
      <Select
        className={classes.select}
        onChange={(e) => {
          if (typeof e.target.value === 'string') {
            onChange(e.target.value)
          }
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: DARK_PURPLE,
              color: WHITE_COLOR,
              maxHeight: '200px'
            }
          }
        }}
      >
        {data && data.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </InputGroup>
  )
}

export default memo(SelectInput)