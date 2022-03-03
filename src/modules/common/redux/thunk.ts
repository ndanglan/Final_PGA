import { ROUTES } from './../../../configs/routes';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../utils/httpResponseCode';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Cookies from 'js-cookie';
import { setLogoutAction } from '../../auth/redux/authReducer';
import { push } from 'connected-react-router';

export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
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
