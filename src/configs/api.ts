import { APIHost } from '../utils/constants';

export const API_PATHS = {
  signIn: `${APIHost}/api/authentication/login`,
  getCategory: `${APIHost}/api/categories/list`,
  getProductFiltering: `${APIHost}/api/products/list`,
  editProduct: `https://api.gearfocus.div4.pgtest.co/apiAdmin/products/edit`,
};
