import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ILoginParams } from '../../../models/auth';
import { useStyles } from '../../../styles/makeStyles';
import { useForm } from 'react-hook-form';

interface Props {
  onLogin(values: ILoginParams): void;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { onLogin, errorMessage } = props;

  const onSubmit = useCallback((data: { email: string, password: string | number }) => {
    if (data) {
      onLogin(data)
    }
  }, [onLogin])

  return (
    <Box
      component="form"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && (
        <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
          <p>{errorMessage}</p>
        </div>
      )}
      <div className={classes.inputField}>
        <TextField
          error={errors.email?.message ? true : false}
          fullWidth
          label="Email"
          id="fullWidth"
          {...register('email', {
            required: "This is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          helperText={errors.email?.message ? errors.email?.message : ''}
        />
        <p>
          { }
        </p>
      </div>
      <div className={classes.inputField}>
        <TextField
          error={errors.password?.message ? true : false}
          fullWidth
          label="Password"
          id="fullWidth"
          {...register('password', {
            required: "This is required",
            minLength: {
              value: 6,
              message: 'Min length is 6'
            }
          })}
          helperText={errors.password?.message ? errors.password?.message : ''}
        />
      </div>
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
  );
};

export default LoginForm;
