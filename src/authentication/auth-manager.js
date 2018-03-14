import {Constants} from '../shared/constants';

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
  const auth = this.getAuth();
  return auth ? auth[".expires"] : null;
}
export function getAuthToken() {
  const auth = this.getAuth();
  return auth ? auth.access_token : "";
}
export function getRefreshToken() {
  const auth = this.getAuth();
  return auth ? auth.refresh_token : "";
}
export function isAuthTokenRefreshInitialized() {
  let isInitialized = JSON.parse(localStorage.getItem('isInitialized'));
  return isInitialized ? true : false;
}
export function setAuthTokenRefreshInitialized(val) {
  console.log("Refesh flag set to: " + val);
  localStorage.setItem('isInitialized', val);
}
export function isTokenExpired() {
  return this.tokenExpiresIn() <= 0;
}
export function tokenExpiresIn() {
  if (this.tokenExpiresOn())
    return Date.parse(this.tokenExpiresOn()) - Date.parse(new Date().toGMTString());

  return 0;
}
export function isAuthenticated() {
  return this.getAuth() && !this.isTokenExpired();
}
// export function triggerRefreshToken() {
//   let timeDiff = this.tokenExpiresIn();
//   console.log(isNaN(timeDiff));
//   if (this.getRefreshToken() && !isNaN(timeDiff)) {
//     this.setAuthTokenRefreshInitialized(true);
//     console.log("TOKEN REFRESH timeout SET FOR: " + timeDiff, this.tokenExpiresOn());
//     setTimeout(() => {
//       console.log("TOKEN REFRESH STARTED")
//       let refToken = this.getRefreshToken();
//       authService.refreshToken(refToken);
//     }, timeDiff - 1000);
//   } else {
//     console.log("NO REFRESH TOKEN FOUND")
//     this.setAuthTokenRefreshInitialized(false);
//   }
// }
