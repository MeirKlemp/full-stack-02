/* File: login.js
 * This file handles the functionality of logging in, logging out, and
 * registering a new user.
 */

"use strict";

/* Name of the auto login cookie. */
const LOGIN_COOKIE_NAME = "username";
/* Number of days until expiration of the auto login cookie. */
const LOGIN_COOKIE_DAYS = 20;

/*
 * Logs out or auto logs in, then initializes the login and register forms.
 */
window.onload = function() {
    if (!logout()) {
        autoLogin();
    }

    document.forms.frmLogin.addEventListener("submit", (ev) => {
        ev.preventDefault();
        login();
    });

    document.forms.frmRegister.addEventListener("submit", (ev) => {
        ev.preventDefault();
        register();
    });
}

/*
 * Checks if last user wanted to auto login. If they wanted, then it auto
 * logins.
 */
function autoLogin() {
    if (!document.cookie || !document.cookie.includes("username=")) {
        return;
    }

    const autoLoginIndex = document.cookie.search(LOGIN_COOKIE_NAME + '=');
    if (autoLoginIndex === -1) {
        return;
    }

    let username = document.cookie.substring(autoLoginIndex
        + LOGIN_COOKIE_NAME.length + 1);

    // Removes cookies found after username's cookie.
    const cookieSeparator = username.search(';');
    if (cookieSeparator !== -1) {
        username = username.substring(0, cookieSeparator);
    }

    getin(username);
}

/*
 * Validates the login form's credentials. If it is valid, logins. Otherwise,
 * it shows a message to the user.
 */
function login() {
    const username = document.forms.frmLogin.username.value;
    const password = document.forms.frmLogin.password.value;

    if (!localStorage[username]) {
        alert("Invalid username or password");
        return;
    }

    const user = JSON.parse(localStorage[username]);
    if (user.password !== password) {
        alert("Invalid username or password");
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
    const username = document.forms.frmRegister.username.value;
    const password = document.forms.frmRegister.password.value;
    const password2 = document.forms.frmRegister.password2.value;

    if (password !== password2) {
        alert("Passwords do not match");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Invalid password. Password must contain at least 1 upper case "
            + "letter, at least 1 lower case letter, at least 1 digit and at "
            + "least 8 characters.");
        return;
    }

    if (!isValidUsername(username)) {
        alert("Invalid username. Username must contain at least 1 character," +
            " and semicolons are forbidden");
        return;
    }

    if (localStorage[username]) {
        alert("Username already exists");
        return;
    }

    const user = {
        username: username,
        password: password,
    };
    localStorage[username] = JSON.stringify(user);

    setAutoLogin(username);

    getin(username);
}

/*
 * Returns `true` if the given username is valid. Otherwise, returns `false`.
 * Valid username is a username with at least 1 character and without
 * semicolons, because semicolons ruines the cookie.
 */
function isValidUsername(username) {
    if (username.length == 0) {
        return false;
    }

    if (username.includes(';')) {
        return false;
    }

    return true;
}

/*
 * Returns `true` if the given password is valid. Otherwise, returns `false`.
 * Valid password is a password with at least 1 upper case letter, 1 lower case
 * letter, 1 digit, and with length of 8 characters.
 */
function isValidPassword(password) {
    if (password.length < 8) {
        return false;
    }

    const digitPattern = /[0-9]/;
    const lowerPattern = /[a-z]/;
    const upperPattern = /[A-Z]/;
    return digitPattern.test(password) && lowerPattern.test(password) &&
        upperPattern.test(password);
}

/*
 * If the checkbox to keep logged in is checked, the function saves the
 * username in cookies, so next time the website will auto login.
 */
function setAutoLogin(username) {
    const keepLoggedIn = document.getElementById("chkAutoLogin").checked;
    if (keepLoggedIn) {
        const expires = new Date();
        expires.setDate(expires.getDate() + LOGIN_COOKIE_DAYS);
        document.cookie = `${LOGIN_COOKIE_NAME}=${username};` +
            `expires=${expires.toUTCString()}`;
    }
}

/*
 * Moves to home page after successfuly logged in or registered.
 */
function getin(username) {
    sessionStorage.currentUsername = username;
    location.href = "./html/home.html";
}

/*
 * Checks if the url has a parameter to logout. If it does, the function
 * logouts and removes the auto login cookie.
 * Returns `true` if logged out. Otherwise, returns `false`.
 */
function logout() {
    const paramsString = document.location.href.split('?')[1];
    if (!paramsString) {
        return false;
    }

    const params = new URLSearchParams(paramsString);
    if (params.get("logout")?.toLowerCase() !== "true") {
        return false;
    }

    sessionStorage.removeItem("currentUsername");
    document.cookie = `${LOGIN_COOKIE_NAME}=; ` +
        `expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    return true;
}
