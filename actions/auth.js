import fetch from "isomorphic-fetch";
import cookie from "js-cookie";

export const preSignup = user => {
  return fetch("/api/presignup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const signUp = token => {
  return fetch("/api/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(token)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
export const signIn = user => {
  return fetch("/api/signin", {
    method: "POST",
    headers: {
      "COntent-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
export const setCookie = (key, value) => {
  if (process.browser) {
    return cookie.set(key, value, {
      expires: 1
    });
  }
};
export const removeCookie = key => {
  if (process.browser) {
    return cookie.remove(key);
  }
};

export const getCookie = key => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setLS = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLS = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, cb) => {
  setCookie("token", data.token);
  setLS("user", data.user);
  cb();
};

export const isAuth = () => {
  if (process.browser) {
    const isCookie = getCookie("token");
    if (isCookie) {
      if (localStorage.getItem("user")) {
        return localStorage.getItem("user");
      } else {
        return false;
      }
    }
  }
};

export const signOut = cb => {
  removeCookie("token");
  removeLS("user");
  cb();
  return fetch("/signout", {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
