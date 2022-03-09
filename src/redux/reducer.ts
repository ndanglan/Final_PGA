import categoriesReducer, { CategoriesProps } from './../modules/common/redux/categoriesReducers';
import productsReducer, { ProductsState } from './../modules/products/redux/productsReducers';
import loadingReducer, { LoadingProps } from './../modules/common/redux/loadingReducer';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import vendorsReducer, { VendorsProps } from '../modules/common/redux/vendorsReducers';
import brandsReducers, { BrandsProps } from '../modules/common/redux/brandsReducers';
import shippingReducers, { ShippingProps } from '../modules/common/redux/shippingReducers';
import conditionsReducers, { ConditionsProps } from './../modules/common/redux/conditionsReducers';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  loading: LoadingProps;
  products: ProductsState;
  categories: CategoriesProps;
  vendors: VendorsProps;
  brands: BrandsProps;
  shipping: ShippingProps;
  conditions: ConditionsProps;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    loading: loadingReducer,
    products: productsReducer,
    categories: categoriesReducer,
    vendors: vendorsReducer,
    brands: brandsReducers,
    shipping: shippingReducers,
    conditions: conditionsReducers,
  });
}
