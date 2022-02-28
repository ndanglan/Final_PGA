const ROUTES_PRODUCT = '/products';
const ROUTES_USERS = '/user';

export const ROUTES = {
  login: '/login',
  productList: `${ROUTES_PRODUCT}/manage-product`,
  productDetail: `${ROUTES_PRODUCT}/product-detail`,
  addProduct: `${ROUTES_PRODUCT}/new-product`,
  userList: `${ROUTES_USERS}/manage-user`,
  userDetail: `${ROUTES_USERS}/user-detail`,
  addUser: `${ROUTES_USERS}/new-user`
};
