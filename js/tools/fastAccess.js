class _fastAccess_ui {
    constructor() { }
    get col() {
        const elem = document.createElement("div");
        elem.className = "col";
        return elem;
    }
    row(...cols) {
        const elem = document.createElement("div");
        elem.className = "row";
        cols.forEach((c) => elem.appendChild(c));
        return elem;
    }
}
class _fastAccess_cookie {
}
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
    // public static getCookie(key: string): string | undefined {
    //   const cookies = document.cookie;
    //   const cookiesArr = cookies.split(";");
    //   const retPair = cookiesArr.find(
    //     (c) => c.split("=")[0].replace(/\s/g, "") === key
    //   );
    //   if (!retPair) {
    //     return undefined;
    //   }
    //   return retPair.split("=")[1];
    // }
    // public static set cookie(value:string){
    //   if(value.indexOf('=')!=-1){
    //       const key = value.split('=')[0]
    //       const val = value.split('=')[1]
    //       const all = document.cookie.split(";")
    //       for(let i=0;i<all.length;i++){
    //           if(all[i].split("=")[0].trim()==key.trim()){
    //               all[i] = `${key}=${val}`
    //               document.cookie = all.reduce((prev,next)=>`${prev}${prev==''?'':';'}${next}`,"")
    //               return
    //           }
    //       }
    //       const prev = all.reduce((prev,next)=>`${prev}${prev==''?'':';'}${next}`,"")
    //       document.cookie = `${prev}${prev?';':''}${key}=${val};`
    //   }
    // }
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
    /**
     * put object in the clocale storage
     * @param key the key in the locale storage
     * @param dat the data to set to the locale storage
     */
    static saveLocale(key, dat) {
        const asStr = JSON.stringify(dat);
        localStorage.setItem(key, asStr);
    }
    static loadLocale(key) {
        const dat = localStorage.getItem(key);
        if (dat === null) {
            return undefined;
        }
        return JSON.parse(dat);
    }
    // public static set expireCookie(value:Date){
    //   $.cookie = `expires=${value}`
    // }
    // public static set cookiePath(value:string){
    //   $.cookie = `path=${value}`
    // }
    static removeCookie(name) {
        document.cookie = `${name}=; ` + `expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    static setCookie(name, value, expiration, path) {
        let cookie = `${name}=${value}`;
        if (expiration) {
            cookie += `; expires=${expiration}`;
        }
        if (path) {
            cookie += `; path=` + path;
        }
        document.cookie = cookie;
    }
    /*
     * Returns cookie's value if exists. Otherwise, returns `null`.
     */
    static getCookie(name) {
        const cookieIndex = document.cookie.search(name + "=");
        if (cookieIndex === -1) {
            return null;
        }
        let value = document.cookie.substring(cookieIndex + name.length + 1);
        // Removes cookies found after current cookie if exists.
        const cookieSeparator = value.search(";");
        if (cookieSeparator !== -1) {
            value = value.substring(0, cookieSeparator);
        }
        return value;
    }
}
$.ui = new _fastAccess_ui();
