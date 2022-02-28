import { APIHost } from '../utils/constants';

// enum APIService {
//   api,
//   apiAdmin,
//   apiVendor,
// }

// function getBaseUrl(service: APIService) {
//   if (service === APIService.api) {
//     return `/api`;
//   } else if (service === APIService.apiAdmin) {
//     return `/apiAdmin`;
//   } else if (service === APIService.apiVendor) {
//     return `/apiVendor`;
//   }

//   return '';
// }

export const API_PATHS = {
  signIn: `${APIHost}/api/authentication/login`,
};
