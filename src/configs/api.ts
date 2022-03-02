import { APIHost } from '../utils/constants';

export const API_PATHS = {
  signIn: `${APIHost}/api/authentication/login`,
  getCategory: `${APIHost}/api/categories/list`,
  getProductFiltering: `${APIHost}/api/products/list`
};
