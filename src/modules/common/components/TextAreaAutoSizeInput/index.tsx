import { TextareaAutosize } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { MEDIUM_BLUE, WHITE_COLOR } from '../../../../configs/colors';
import InputGroup from '../Layout/InputGroup';

interface Props {
  label: string,
  required: boolean,
  name: string,
  inputSize?: number,
  labelSize?: number,
}

const TextAreaAutoSizeInput = (props: Props) => {
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
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            minRows={4}
            placeholder="Type status"
            style={{
              borderRadius: '3px',
              padding: '10px',
              color: WHITE_COLOR,
              outline: 'none',
              backgroundColor: MEDIUM_BLUE,
              width: '100%',
              border: `1px solid ${MEDIUM_BLUE}`,
            }}
          />
        )}
        rules={{ required: props.required }}
      />
    </InputGroup>
  )
}

export default TextAreaAutoSizeInput