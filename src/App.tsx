import React from 'react';
import './App.css';
import { Routes } from './Routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from './utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchThunk } from './modules/common/redux/thunk';
import { API_PATHS } from './configs/api';
import { RESPONSE_STATUS_SUCCESS } from './utils/httpResponseCode';
import { setUserInfo } from './modules/auth/redux/authReducer';

function App() {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
