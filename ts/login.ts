/* File: login.js
 * This file handles the functionality of logging in, logging out, and
 * registering a new user.
 */
//import { getParam, getCookie, setCookie, removeCookie } from "./common.js";
import { NO_LOGIN_FORM, NO_REGISTER_FORM } from "./errors.js";
import $ from "./tools/fastAccess.js";

/* Name of the auto login cookie. */
const LOGIN_COOKIE_NAME = "username";
/* Number of days until expiration of the auto login cookie. */
const LOGIN_COOKIE_DAYS = 20;

/* Postfix of cookies that track the number of attempted logins. */
const ATTEMPTS_COOKIE_POSTFIX = "_attempts";
/* Number of attempts to login allowed before getting blocked. */
const ATTEMPTS_MAX = 5;
/* Number of minutes the attempts cookie stays alive. */
const ATTEMPTS_MINUTES = 10;

const registerForm = $.id("frmRegister") as any;
if (!registerForm) {
  throw new Error(NO_REGISTER_FORM);
}

const loginForm = $.id("frmLogin") as any;
if (!loginForm) {
  throw new Error(NO_LOGIN_FORM);
}

/*
 * Logs out or auto logs in, then initializes the login and register forms.
 */
window.onload = function () {
  if (!logout()) {
    autoLogin();
  }

  loginForm.addEventListener("submit", (ev: any) => {
    ev.preventDefault();
    login();
  });

  registerForm.addEventListener("submit", (ev: any) => {
    ev.preventDefault();
    register();
  });
};

/*
 * Checks if last user wanted to auto login. If they wanted, then it auto
 * logins.
 */
function autoLogin() {
  const username = $.getCookie(LOGIN_COOKIE_NAME);

  if (username) {
    getin(username);
  }
}

/*
 * Validates the login form's credentials. If it is valid, logins. Otherwise,
 * it shows a message to the user.
 */
function login() {
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (!localStorage[username]) {
    loginError("Invalid username or password");
    return;
  }

  // Checks the password, and blocks the user if attempted to login to many
  // times.
  const attemptsCookie = username + ATTEMPTS_COOKIE_POSTFIX;
  let attemptsTemp = $.getCookie(attemptsCookie);
  if (!attemptsTemp) {
    attemptsTemp = "";
  }
  const attempts = parseInt(attemptsTemp);
  const user = JSON.parse(localStorage[username]);
  if (attempts >= ATTEMPTS_MAX || user.password !== password) {
    // Updates the the number of attempts in the attempts cookie.
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + ATTEMPTS_MINUTES);
    $.cookie = `${attemptsCookie}=${isNaN(attempts) ? 1 : attempts + 1}`;
    $.expireCookie = expires;

    loginError("Invalid username or password");
    return;
  }

  setAutoLogin(username);

  getin(username);
}

/*
 * Validates the register form's credentials. If it is valid, registers the new
 * user. Otherwise, it shows a message to the user.
 */
function register() {
  const username = registerForm.username.value;
  const password = registerForm.password.value;
  const password2 = registerForm.password2.value;

  if (!isValidUsername(username)) {
    registerError(
      "Invalid username. Username must contain at least 1" +
        " character, and special characters are forbidden."
    );
    return;
  }

  if (localStorage[username]) {
    registerError("Username already exists");
    return;
  }

  if (password !== password2) {
    registerError("Passwords do not match");
    return;
  }

  if (!isValidPassword(password)) {
    registerError(
      "Invalid password. Password must contain:<br>" +
        "* at least 1 upper case letter<br>" +
        "* at least 1 lower case letter<br>" +
        "* at least 1 digit<br>" +
        "* at least 8 characters"
    );
    return;
  }

  const user = {
    username: username,
    password: password,
  };
  localStorage[username] = JSON.stringify(user);
  $.saveLocale("users",[...$.loadLocale("users"),user])

  setAutoLogin(username);

  getin(username);
}

/*
 * Returns `true` if the given username is valid. Otherwise, returns `false`.
 * Valid username won't ruin the cookies.
 */
function isValidUsername(username: string) {
  if (username.length == 0) {
    return false;
  }

  const charPattern = /[a-zA-Z1-9!@#$%^&*._]/;
  for (const ch of username) {
    if (!charPattern.test(ch)) {
      return false;
    }
  }

  return true;
}

/*
 * Returns `true` if the given password is valid. Otherwise, returns `false`.
 * Valid password is a password with at least 1 upper case letter, 1 lower case
 * letter, 1 digit, and with length of 8 characters.
 */
function isValidPassword(password: string) {
  if (password.length < 8) {
    return false;
  }

  const digitPattern = /[0-9]/;
  const lowerPattern = /[a-z]/;
  const upperPattern = /[A-Z]/;
  return (
    digitPattern.test(password) &&
    lowerPattern.test(password) &&
    upperPattern.test(password)
  );
}

/*
 * If the checkbox to keep logged in is checked, the function saves the
 * username in cookies, so next time the website will auto login.
 */
function setAutoLogin(username: string) {
  const autoLogin = $.id("chkAutoLogin") as any;
  const keepLoggedIn = autoLogin.checked;
  if (keepLoggedIn) {
    const expires = new Date();
    expires.setDate(expires.getDate() + LOGIN_COOKIE_DAYS);
    $.cookie = `${LOGIN_COOKIE_NAME}=${username}`
    $.expireCookie = expires
  }
}

/*
 * Moves to home page after successfuly logged in or registered.
 */
function getin(username:string) {
  sessionStorage.currentUsername = username;
  location.href = "./html/home.html";
}

/*
 * Checks if the url has a parameter to logout. If it does, the function
 * logouts and removes the auto login cookie.
 * Returns `true` if logged out. Otherwise, returns `false`.
 */
function logout() {
  if ($.param("logout")?.toLowerCase() !== "true") {
    return false;
  }

  sessionStorage.removeItem("currentUsername");
  $.removeCookie(LOGIN_COOKIE_NAME);
  return true;
}

/*
 * Displays a login error message using the login error label.
 */
function loginError(errorMessage:string) {
  const label = document.getElementById("loginError") as HTMLLabelElement;
  label.classList.remove("hidden");
  label.innerHTML = errorMessage;
}

/*
 * Displays a register error message using the register error label.
 */
function registerError(errorMessage:string) {
  const label = document.getElementById("registerError") as HTMLElement;
  label.classList.remove("hidden");
  label.innerHTML = errorMessage;
}
