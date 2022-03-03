import { APIHost } from '../utils/constants';

export const API_PATHS = {
  signIn: `${APIHost}/api/authentication/login`,
  getCategory: `${APIHost}/api/categories/list`,
  getProductFiltering: `${APIHost}/api/products/list`,
  editProduct: `${APIHost}/apiAdmin/products/edit`,
  getVendors: `${APIHost}/apiAdmin/vendors/list`,
  fetchFileCSV: `${APIHost}/apiExport/export/products`,
  dowloadFileCSV: `${APIHost}/apiExport/export/dowload`
};
