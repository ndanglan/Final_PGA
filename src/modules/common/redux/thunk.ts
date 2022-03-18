import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { push } from 'connected-react-router';
import Cookies from 'js-cookie';
import { ROUTES } from './../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../utils/httpResponseCode';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { setLogoutAction } from '../../auth/redux/authReducer';


export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch) => {
    const res = await fetch(url, {
      credentials: 'include',
      method,
      body: typeof body === 'object' ? JSON.stringify(body) : body,
      headers:
      {
        'Content-Type': contentType || 'application/json',
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
      cache: 'no-store',
    });

    const json = await res.json();

    if (res.status === RESPONSE_STATUS_UNAUTHORIZED) {
      dispatch(setLogoutAction())
      dispatch(push(ROUTES.login))
    }

    return json;
  };
}


export function fetchThunkFormData(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body: FormData,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch) => {
    const res = await fetch(url, {
      credentials: 'include',
      method,
      body: body,
      headers:
      {
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
      cache: 'no-store',
    });

    const json = await res.json();

    if (res.status === RESPONSE_STATUS_UNAUTHORIZED) {
      dispatch(setLogoutAction())
      dispatch(push(ROUTES.login))
    }

    return json;
  };
} 
