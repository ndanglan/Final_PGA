import { Typography } from '@mui/material'
import React from 'react'
import FormControlGroup from '../FormControlGroup'

interface Props {
  label: string,
  inputSize?: number,
  labelSize?: number,
  required: boolean,
  value: string | number
}

const LabelGroup = (props: Props) => {
  const { label, inputSize, labelSize, required, value } = props
  return (
    <FormControlGroup
      label={label}
      inputSize={inputSize ? inputSize : 3}
      labelSize={labelSize ? labelSize : 3}
      required={required}
    >
      <Typography variant="subtitle1">
        {value}
      </Typography>
    </FormControlGroup>
  )
}

export default LabelGroup