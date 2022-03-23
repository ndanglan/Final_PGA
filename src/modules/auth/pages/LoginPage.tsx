import React, { useState } from 'react';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import LoginForm from '../components/LoginForm';
import logo from '../../../logo-420-x-108.png';
import { ILoginParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { setUserInfo } from '../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { getErrorMessageResponse } from '../../../utils';
import { setLoading } from '../../common/redux/loadingReducer';
import { Redirect } from 'react-router';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const auth = Cookies.get(ACCESS_TOKEN_KEY);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      dispatch(setLoading(true))

      const json = await dispatch(
        fetchThunk(
          API_PATHS.signIn,
          'post',
          { email: values.email, password: values.password }
        ),
      );

      dispatch(setLoading(false))

      if (json.success) {
        dispatch(setUserInfo(json.user));
        Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie);
        dispatch(replace(ROUTES.productList));

        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  if (auth) {
    return <Redirect
      to={{
        pathname: ROUTES.productList,
      }}
    />
  }

  return (
    <div
      style={{
        backgroundColor: '#323259',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src={logo}
        alt=""
        style={{
          maxWidth: '250px',
          margin: '32px'
        }}
      />
      <LoginForm
        onLogin={onLogin}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default LoginPage;
