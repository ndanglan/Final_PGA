import React from 'react'
import { useFormContext } from 'react-hook-form';
import InputGroup from '../../common/components/Layout/InputGroup'

interface Props {
  label: string,
  name: string,
  required: boolean,
  placeHolder?: string,
  inputSize?: number,
  helperText?: string
}

const ControlNormalInput = (props: Props) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <InputGroup
      label={props.label}
      required={props.required}
      inputSize={props.inputSize ? props.inputSize : undefined}
      errorsType={errors[`${props.name}`]?.type}
      helper={props.helperText ? props.helperText : undefined}
    >
      <input
        type="text"
        placeholder={props.placeHolder}
        {...register(props.name, {
          required: props.required
        })}
      />
    </InputGroup>
  )
}

export default ControlNormalInput