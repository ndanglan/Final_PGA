import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../../models/profile';

export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
}

export const setAuthorization = createCustomAction('auth/setAuthorization',
  (data: AuthToken) => ({
    data,
  }));

export const setUserInfo = createCustomAction('auth/setUserInfo',
  (data: IUser) => ({
    data,
  }));

export const setLogoutAction = createCustomAction('auth/setLogoutAction')

const actions = { setAuthorization, setUserInfo, setLogoutAction };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(setLogoutAction):
      return { ...state, user: {}, auth: {} };
    default:
      return state;
  }
}
