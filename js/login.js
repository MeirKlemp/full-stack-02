/* File: login.js
 * This file handles the functionality of logging in and registering a new
 * user.
 */

"use strict";

/* Name of the auto login cookie. */
const LOGIN_COOKIE_NAME = "username";
/* Number of days until expiration of the auto login cookie. */
const LOGIN_COOKIE_DAYS = 20;

/*
 * Initializes the login and register page and auto logins if the user
 * requested it. This function must run before any other function in this file.
 */
function initializeLogin() {
    autoLogin();

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

    sessionStorage.currentUsername = username;
    location.href = "./html/home.html";
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

    sessionStorage.currentUsername = username;
    location.href = "./html/home.html";
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

    sessionStorage.currentUsername = username;
    location.href = "./html/home.html";
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
    const keepLoggedIn = document.getElementById("chkAutoLogin").value;
    if (keepLoggedIn) {
        const expires = new Date();
        expires.setDate(expires.getDate() + LOGIN_COOKIE_DAYS);
        document.cookie = `${LOGIN_COOKIE_NAME}=${username};` +
            `expires=${expires.toUTCString()}`;
    }
}
