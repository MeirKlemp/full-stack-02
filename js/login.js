/* File: login.js
 * This file handles the functionality of logging in, logging out, and
 * registering a new user.
 */

"use strict";

import {getParam, getCookie, setCookie, removeCookie} from './common.js';

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
    const username = getCookie(LOGIN_COOKIE_NAME);

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
            " and special characters are forbidden.");
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
 * Valid username won't ruin the cookies.
 */
function isValidUsername(username) {
    if (username.length == 0) {
        return false;
    }

    const charPattern = /[a-zA-Z1-9!@#$%^&*._]/
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
        setCookie(LOGIN_COOKIE_NAME, username, expires);
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
    if (getParam("logout")?.toLowerCase() !== "true") {
        return false;
    }

    sessionStorage.removeItem("currentUsername");
    removeCookie(LOGIN_COOKIE_NAME);
    return true;
}
