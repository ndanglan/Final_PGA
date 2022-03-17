import { Switch } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import InputGroup from '../InputGroup';
import { makeStyles } from '@mui/styles';
import { MEDIUM_PURPLE, WHITE_COLOR } from '../../../../configs/colors';
import { RequiredRuleProps } from '../../../../models/input';

interface Props {
  label: string,
  required: RequiredRuleProps,
  name: string
}

const useStyles = makeStyles(({
  switch: {
    '&.MuiSwitch-root': {
      padding: '8px',
      marginTop: '-2px',

      '& .MuiSwitch-switchBase': {
        color: WHITE_COLOR,

        '& .MuiSwitch-thumb ': {
          borderRadius: '7px'
        }
      },

      '& .MuiSwitch-track': {
        borderRadius: '22/2',
        backgroundColor: WHITE_COLOR,

        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 30,
          height: 30
        },
      },

      '& .Mui-checked+.MuiSwitch-track': {
        backgroundColor: MEDIUM_PURPLE,
        opacity: '1',
      }
    },
  },
}))

const ControlSwitchInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext();

  const classes = useStyles();

  return (
    <InputGroup
      label={props.label}
      required={props.required.value}
      inputSize={6}
      errrorMessage={errors[`${props.name}`]?.message}
    >
      <Controller
        control={control}
        name={props.name}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value === 1}
            onChange={(e) => {
              if (e.target.checked) {
                field.onChange(1);
                return;
              }
              field.onChange(0);
            }}
            className={classes.switch}
          />
        )}
        rules={{ required: props.required }}
      />
    </InputGroup>
  )
}

export default ControlSwitchInput