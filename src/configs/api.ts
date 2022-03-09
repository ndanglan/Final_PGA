import { APIHost } from '../utils/constants';

export const API_PATHS = {
  signIn: `${APIHost}/api/authentication/login`,
  getProductFiltering: `${APIHost}/api/products/list`,
  editProduct: `${APIHost}/apiAdmin/products/edit`,
  createProduct: `${APIHost}/apiAdmin/products/create`,
  getProductDetail: `${APIHost}/apiAdmin/products/detail`,
  getCategory: `${APIHost}/api/categories/list`,
  getVendors: `${APIHost}/apiAdmin/vendors/list`,
  getConditions: `${APIHost}/apiAdmin/conditions/list`,
  getBrands: `${APIHost}/apiAdmin/brands/list`,
  getShipping: `${APIHost}/apiAdmin/shipping/list`,
  fetchFileCSV: `${APIHost}/apiExport/export/products`,
  dowloadFileCSV: `${APIHost}/apiExport/export/dowload`,
  uploadImg: `${APIHost}/api/products/upload-image`,
};
