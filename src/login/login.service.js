import { ApiUrl } from "../shared/constants";
import * as service from "../utilities/http-service";
import * as authMan from "../authentication/auth-manager";
import 'url-search-params-polyfill';

export function userLogin(loginDetails) {
  let params = new URLSearchParams();
  params.append('userName', loginDetails.userName);
  params.append('password', loginDetails.password);
  params.append('grant_type', 'password');
  return service.axiosPost(ApiUrl.AUTH_TOKEN, params);
}
export function userLogout() {
  var authDetails = authMan.getAuth();
  return authDetails && authDetails.nic ? service.axiosGet(`${ApiUrl.LOGOUT_URL}/${authDetails.Nic}/1`) : Promise.resolve('loggedout');
}

export function refreshToken(refresh_token, nic) {
  let params = new URLSearchParams();
  var authDetails = authMan.getAuth();
  params.append('refresh_token', refresh_token);
  params.append('grant_type', 'refresh_token');
  params.append('Nic', nic);

  let config = {
    // __isRetryRequest: true
  }
  return service.axiosPost(ApiUrl.AUTH_TOKEN, params, config);
}

export function ping(nic) {
  let params = new URLSearchParams();
  var authDetails = authMan.getAuth();
  params.append('Nic', nic);

  let config = {
    // __isRetryRequest: true
  }
  let getURL = `${ApiUrl.PING_URL}/${nic}/1`;
  return service.axiosGet(getURL);
}

export function getDefaultDashboard() {
  return service.axiosGet(ApiUrl.DEFAULT_DASHBOARD);
}
