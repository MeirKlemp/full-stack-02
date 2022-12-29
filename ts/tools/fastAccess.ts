
export default  class ${
    /**
     * get elemnt by id
     * @param idStr the id of the elment to get
     * @returns the elment with the given id
     */
    public static id(idStr:string){
        return document.getElementById(idStr)
    }

    /**
     * get the window object of the browser
     */
    public static get w():Window{
        return window
    }

    public static cookie(key:string):string|undefined{
        const cookies = document.cookie
        const cookiesArr = cookies.split(';')
        const retPair = cookiesArr.find(c=>c.split('=')[0].replace(/\s/g,'')===key)
        if(!retPair){
            return undefined
        }
        return retPair.split('=')[1]
    }

}