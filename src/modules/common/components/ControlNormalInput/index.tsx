import React from 'react'
import { useFormContext } from 'react-hook-form';
import InputGroup from '../Layout/InputGroup'

interface Props {
  label: string,
  name: string,
  required: boolean,
  placeHolder?: string,
  inputSize?: number,
  labelSize?: number,
  helperText?: string,
  type?: string,
  validate?(value: string): boolean | string,
  pattern?: RegExp,
}

const ControlNormalInput = (props: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <InputGroup
      label={props.label}
      required={props.required}
      inputSize={props.inputSize ? props.inputSize : undefined}
      labelSize={props.labelSize || props.labelSize === 0 ? props.labelSize : 2}
      errorsType={errors[`${props.name}`]?.type}
      helper={props.helperText ? props.helperText : undefined}
    >
      <input
        type={props.type ? props.type : 'text'}
        placeholder={props.placeHolder}
        {...register(props.name, {
          required: props.required,
          validate:
            props.validate ?
              props.validate
              : undefined,
          pattern:
            props.pattern
              ? props.pattern
              : undefined
        })}
      />
    </InputGroup>
  )
}

export default ControlNormalInput