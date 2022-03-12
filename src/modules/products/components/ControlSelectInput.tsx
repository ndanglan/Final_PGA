import React, { memo } from 'react'
import { Checkbox, MenuItem, Select } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import InputGroup from '../../common/components/Layout/InputGroup'
import { DARK_BLUE, WHITE_COLOR } from '../../../configs/colors'

interface Props {
  label: string,
  name: string,
  required: boolean,
  data?: { value: string | number, name: string }[]
  multiple?: boolean,
  inputSize?: number,
  labelSize?: number,
}

const ControlSelectInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext()
  return (
    <InputGroup
      label={props.label}
      required={props.required}
      errorsType={errors[`${props.name}`] ? 'required' : undefined}
      inputSize={props.inputSize ? props.inputSize : 4}
      labelSize={props.labelSize ? props.labelSize : 2}
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
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: DARK_BLUE,
                    color: WHITE_COLOR,
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
                        checked={field.value && field.value?.indexOf(4) > -1}
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