import React from 'react'
import { useFormContext } from 'react-hook-form';
import { RequiredRuleProps } from '../../../../models/input';
import InputGroup from '../Layout/InputGroup'

interface Props {
  label: string,
  name: string,
  required: RequiredRuleProps,
  placeHolder?: string,
  inputSize?: number,
  labelSize?: number,
  helperText?: string,
  type?: string,
  validate?(value: string): boolean | string,
  pattern?: {
    value: RegExp,
    message: string
  }
}

const ControlNormalInput = (props: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <InputGroup
      label={props.label}
      required={props.required.value}
      inputSize={props.inputSize ? props.inputSize : undefined}
      labelSize={props.labelSize || props.labelSize === 0 ? props.labelSize : 2}
      helper={props.helperText ? props.helperText : undefined}
      errrorMessage={errors[`${props.name}`]?.message}
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
          pattern: props.pattern ? props.pattern : undefined

        })}
      />
    </InputGroup>
  )
}

export default ControlNormalInput