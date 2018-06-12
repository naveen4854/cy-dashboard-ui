import { Constants } from '../shared/constants';

export function setAuth(auth) {
  localStorage.setItem(Constants.auth, JSON.stringify(auth ? auth : {}));
}
export function getAuth() {
  return JSON.parse(localStorage.getItem(Constants.auth));
}
export function clearAuth() {
  localStorage.removeItem(Constants.auth, {});
}
export function tokenExpiresOn() {
  const auth = getAuth();
  return auth ? auth[".expires"] : null;
}
export function getAuthToken() {
  const auth = getAuth();
  return auth ? auth.access_token : "";
}
export function getRefreshToken() {
  const auth = getAuth();
  return auth ? auth.refresh_token : "";
}
export function isAuthTokenRefreshInitialized() {
  let isInitialized = JSON.parse(localStorage.getItem('isInitialized'));
  return isInitialized ? true : false;
}
export function setAuthTokenRefreshInitialized(val) {
  // console.log("Refesh flag set to: " + val);
  localStorage.setItem('isInitialized', val);
}
export function isTokenExpired() {
  return tokenExpiresIn() <= 0;
}
export function tokenExpiresIn() {
  if (tokenExpiresOn())
    return Date.parse(tokenExpiresOn()) - Date.parse(new Date().toGMTString());

  return 0;
}
export function isAuthenticated() {
  return getAuth() && !isTokenExpired();
}

