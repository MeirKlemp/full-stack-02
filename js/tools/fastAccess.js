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
    static cookie(key) {
        const cookies = document.cookie;
        const cookiesArr = cookies.split(';');
        const retPair = cookiesArr.find(c => c.split('=')[0].replace(/\s/g, '') === key);
        if (!retPair) {
            return undefined;
        }
        return retPair.split('=')[1];
    }
    /*
 * Returns parameter's value from url if exists. Otherwise, returns `null`.
 */
    static param(param) {
        const paramsString = document.location.href.split('?')[1];
        if (!paramsString) {
            return null;
        }
        const params = new URLSearchParams(paramsString);
        return params.get(param);
    }
}
