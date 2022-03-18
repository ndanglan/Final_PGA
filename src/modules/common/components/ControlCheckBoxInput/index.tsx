import React from 'react'
import { Checkbox } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import InputGroup from '../InputGroup';

interface Props {
  label: string,
  required: boolean,
  name: string,
  inputSize?: number,
  labelSize?: number,
  dataTrue: number | string,
  dateFalse: number | string
}

const ControlCheckBoxInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <InputGroup
      label={props.label}
      required={props.required}
      inputSize={props.inputSize ? props.inputSize : 6}
      labelSize={props.labelSize ? props.labelSize : 2}
      errorsType={errors[`${props.name}`] ? 'required' : undefined}
    >
      <Controller
        control={control}
        name={props.name}
        render={({ field: { onChange, ...others } }) => (
          <Checkbox
            {...others}
            checked={others.value === props.dataTrue}
            onChange={e => {
              if (e.target.checked) {
                onChange(props.dataTrue)
                return;
              }

              onChange(props.dateFalse)
            }}
          />
        )}
        rules={{ required: props.required }}
      />
    </InputGroup>
  )
}

export default ControlCheckBoxInput