import React, { memo } from 'react'
import { Checkbox, MenuItem, Select } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import InputGroup from '../Layout/InputGroup'
import { DARK_BLUE, DARK_PURPLE, WHITE_COLOR } from '../../../../configs/colors'
import { RequiredRuleProps } from '../../../../models/input'
import { makeStyles } from '@mui/styles'

interface Props {
  label: string,
  name: string,
  required: RequiredRuleProps,
  data?: { value: string | number, name: string }[]
  multiple?: boolean,
  inputSize?: number,
  labelSize?: number,
  defaultValue?: string
}

const useStyles = makeStyles(({
  select: {
    '&.MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `none`,

        '& legend': {
          display: 'none'
        }
      },

      '& .MuiSelect-select': {
        border: `1px solid ${DARK_BLUE}`,

        '& .MuiCheckbox-root': {
          display: 'none'
        }
      },
    }
  }
}))

const ControlSelectInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext();
  const classes = useStyles()
  return (
    <InputGroup
      label={props.label}
      required={props.required.value}
      errrorMessage={errors[`${props.name}`]?.message}
      inputSize={props.inputSize ? props.inputSize : 4}
      labelSize={props.labelSize || props.labelSize === 0 ? props.labelSize : 2}
    >
      <Controller
        name={props.name}
        control={control}
        rules={{
          required: props.required
        }}
        render={({ field }) => {
          return (
            <Select
              {...field}
              multiple={
                props.multiple
                  ? props.multiple
                  : false}
              value={field.value}
              defaultValue={props.defaultValue}
              displayEmpty
              className={classes.select}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: DARK_PURPLE,
                    color: WHITE_COLOR,
                    maxHeight: '300px',
                    maxWidth: '280px'
                  }
                }
              }}
            >
              {
                props.data
                && props.data.length > 0
                && props.data.map(item => (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                  >
                    {props.multiple && (
                      <Checkbox
                        checked={field.value && field.value?.indexOf(item.value) > -1}
                      />
                    )}
                    {item.name}
                  </MenuItem>
                ))
              }
            </Select>
          )
        }}
      />
    </InputGroup>
  )
}

export default memo(ControlSelectInput)