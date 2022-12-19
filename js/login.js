/* File: login.js
 * This file handles the functionality of logging in and registering a new user.
 */

"use strict";

/*
 * Initializes the login and register page and auto logins if the user requested
 * it. This function must run before any other function in this file.
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
    return false;
}

/* Validates the login form's credentials. If it is valid, logins. Otherwise, it
 * shows a message to the user. */
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

    sessionStorage.currentUsername = username;
    location.href = "./html/home.html";
}

/* Validates the register form's credentials. If it is valid, registers the new
 * user. Otherwise, it shows a message to the user. */
function register() {
    const username = document.forms.frmRegister.username.value;
    const password = document.forms.frmRegister.password.value;
    const password2 = document.forms.frmRegister.password2.value;

    if (password !== password2) {
        alert("Passwords do not match");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Invalid password. Password must contain at least 1 upper case " +
            "letter, at least 1 lower case letter, at least 1 digit and at " +
            "least 8 characters.");
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

    sessionStorage.currentUsername = username;
    location.href = "./html/home.html";
}

/*
 * Returns `true` if the given password is valid. Otherwise, returns `false`.
 * Valid password is a password with at least 1 upper case letter,  1 lower
 * case letter, 1 digit, and with length of 8 characters.
 */
function isValidPassword(password) {
    if (password.length < 8) {
        return false;
    }

    const digitPattern = /[0-9]/;
    const lowerPattern = /[a-z]/;
    const upperPattern = /[A-Z]/;
    if (!digitPattern.test(password) || !lowerPattern.test(password) ||
        !upperPattern.test(password)) {
        return false;
    }
    return true;
}
