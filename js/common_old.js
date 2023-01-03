/* File: common.js
 * This file contains exported function that other js files may find usefull.
 */

"use strict";

/*
 * Returns parameter's value from url if exists. Otherwise, returns `null`.
 */
export function getParam(param) {
    const paramsString = document.location.href.split('?')[1];
    if (!paramsString) {
        return null;
    }

    const params = new URLSearchParams(paramsString);
    return params.get(param);
}

/*
 * Returns cookie's value if exists. Otherwise, returns `null`.
 */
export function getCookie(name) {
    const cookieIndex = document.cookie.search(name + '=');
    if (cookieIndex === -1) {
        return null;
    }

    let value = document.cookie.substring(cookieIndex + name.length + 1);

    // Removes cookies found after current cookie if exists.
    const cookieSeparator = value.search(';');
    if (cookieSeparator !== -1) {
        value = value.substring(0, cookieSeparator);
    }

    return value;
}

/*
 * Creates a new cookie with a value, expiration date, and path. The expiration
 * date and path are optional.
 */
export function setCookie(name, value, expiration, path) {
    let cookie = `${name}=${value}`;
    if (expiration) {
        cookie += `; expires=${expiration}`;
    }
    if (path) {
        cookie += `; path=` + path;
    }

    document.cookie = cookie;
}

export function removeCookie(name) {
    document.cookie = `${name}=; ` +
        `expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
