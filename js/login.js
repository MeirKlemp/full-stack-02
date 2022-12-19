"use strict";

function autoLogin() {
    return false;
}

function initializeLogin() {
    console.log(document.cookie);
    if (autoLogin()) {
        location.href = "./html/home.html";
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
