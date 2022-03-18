import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { ILoginParams } from '../../../models/auth';
import { useStyles } from '../../../styles/makeStyles';
import ControlNormalInput from '../../common/components/ControlNormalInput';
import { emailRegex } from '../../../utils';

interface Props {
  onLogin(values: ILoginParams): void;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, errorMessage } = props;

  const classes = useStyles();

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = useCallback((data: { email: string, password: string | number }) => {
    if (data) {
      onLogin(data)
    }
  }, [onLogin])

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'red'
            }}
          >
            <p>{errorMessage}</p>
          </div>
        )}
        <ControlNormalInput
          name="email"
          label="Email"
          inputSize={9}
          labelSize={2}
          required={{
            value: true,
            message: 'This field is required!'
          }}
          pattern={{
            value: emailRegex,
            message: 'Email is invalid'
          }}
          placeHolder="Type your email"
        />
        <ControlNormalInput
          name="password"
          type="password"
          label="Password"
          inputSize={9}
          labelSize={2}
          required={{
            value: true,
            message: 'This field is required!'
          }}
          minLength={{
            value: 6,
            message: 'Password needs at least 6 characters'
          }}
          placeHolder="Type your password"
        />
        <div
          className={classes.mainButton}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px'
          }}>
          <Button
            type="submit"
            className={classes.mainButton}  >
            Sign In
          </Button>
        </div>
      </Box>
    </FormProvider >
  );
};

export default LoginForm;
