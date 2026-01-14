const TOKEN_KEY = "edumanage_token";
const USER_KEY = "edumanage_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getUserJson() {
  return localStorage.getItem(USER_KEY);
}

export function setUserJson(json: string) {
  localStorage.setItem(USER_KEY, json);
}

export function clearUserJson() {
  localStorage.removeItem(USER_KEY);
}
