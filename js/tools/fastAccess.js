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
}
