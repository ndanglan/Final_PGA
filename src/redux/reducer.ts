import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import productsReducer, { ProductsState } from './../modules/products/redux/productsReducers';
import loadingReducer, { LoadingProps } from './../modules/common/redux/loadingReducer';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  loading: LoadingProps;
  products: ProductsState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    loading: loadingReducer,
    products: productsReducer,
  });
}
