export default class $ {
    /**
     * get elemnt by id
     * @param idStr the id of the elment to get
     * @returns the elment with the given id
     */
    static id(idStr) {
        return document.getElementById(idStr);
    }
    /**
     * get the window object of the browser
     */
    static get w() {
        return window;
    }
    static getCookie(key) {
        const cookies = document.cookie;
        const cookiesArr = cookies.split(";");
        const retPair = cookiesArr.find((c) => c.split("=")[0].replace(/\s/g, "") === key);
        if (!retPair) {
            return undefined;
        }
        return retPair.split("=")[1];
    }
    static set cookie(value) {
        if (value.indexOf('=') != -1) {
            const key = value.split('=')[0];
            const val = value.split('=')[1];
            const all = document.cookie.split(";");
            for (let i = 0; i < all.length; i++) {
                if (all[i].split("=")[0].trim() == key.trim()) {
                    all[i] = `${key}=${val}`;
                    document.cookie = all.reduce((prev, next) => `${prev}${prev == '' ? '' : ';'}${next}`, "");
                    return;
                }
            }
            const prev = all.reduce((prev, next) => `${prev}${prev == '' ? '' : ';'}${next}`, "");
            document.cookie = `${prev}${prev ? ';' : ''}${key}=${val};`;
        }
    }
    /*
     * Returns parameter's value from url if exists. Otherwise, returns `null`.
     */
    static param(param) {
        const paramsString = document.location.href.split("?")[1];
        if (!paramsString) {
            return null;
        }
        const params = new URLSearchParams(paramsString);
        return params.get(param);
    }
    static session(storage) {
        return sessionStorage[storage];
    }
}
