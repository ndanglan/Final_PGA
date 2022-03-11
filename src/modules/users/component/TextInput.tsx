import React, { memo } from 'react'
import InputGroup from '../../common/components/Layout/InputGroup'

interface Props {
  label?: string,
  placeHolder?: string,
  inputSize?: number,
  required: boolean,
  type?: string,
  onChange(e: string): void
}

const TextInput = (props: Props) => {
  const { type, label, placeHolder, inputSize, required, onChange } = props;

  return (
    <InputGroup
      label={label}
      required={required}
      inputSize={inputSize ? inputSize : undefined}
    >
      <input
        placeholder={placeHolder}
        type={type ? type : 'text'}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  )
}

export default memo(TextInput)