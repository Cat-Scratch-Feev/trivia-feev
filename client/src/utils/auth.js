import decode from "jwt-decode";

class AuthService {
  // Breaks down token for user data
  getUserData() {
    return decode(this.getToken());
  }

  // Checks if there is a valid token or not
  loggedIn() {
    const token = this.getToken();
    return token && !this.expiredToken(token) ? true : false;
  }

  // Check token expiration
  expiredToken() {
    const decodedToken = decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  // Gets token from local storage
  getToken() {
    return localStorage.getItem("auth_token");
  }

  // Sets token to local storage and reloads page
  login(authToken) {
    localStorage.setItem("auth_token", Token);
    window.location.assign("/");
  }

  // Removes token from local storage and reloads page
  logout() {
    localStorage.removeItem("auth_token");
    window.location.reload();
  }
}
export default new AuthService();
