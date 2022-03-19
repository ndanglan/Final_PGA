import { InputBase, InputBaseProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { RequiredRuleProps } from '../../../../models/input';
import FormControlGroup from '../FormControlGroup'

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
  },
  minLength?: {
    value: number,
    message: string
  }
}

const useStyles = makeStyles(({
  input: {
    height: '40px',
    width: '100%',

    '& input': {
      color: '#fff',
      border: '1px solid #13132b',
      outline: 'none',
      padding: '10px 15px',
      fontSize: '15px',
      textAlign: 'left',
      fontWeight: '500',
      borderRadius: '0.25rem',
      backgroundColor: '#252547'
    }
  }
}))

const ControlNormalInput = (props: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const classes = useStyles()

  return (
    <FormControlGroup
      label={props.label}
      required={props.required.value}
      inputSize={props.inputSize ? props.inputSize : undefined}
      labelSize={props.labelSize || props.labelSize === 0 ? props.labelSize : 2}
      helper={props.helperText ? props.helperText : undefined}
      errrorMessage={errors[`${props.name}`]?.message}
    >
      <InputBase
        className={classes.input}
        type={props.type ? props.type : 'text'}
        placeholder={props.placeHolder}
        {...register(props.name, {
          required: props.required,
          validate:
            props.validate ?
              props.validate
              : undefined,
          pattern: props.pattern ? props.pattern : undefined,
          minLength: props.minLength ? props.minLength : undefined

        })}
      />
    </FormControlGroup>
  )
}

export default ControlNormalInput