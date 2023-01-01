export default class $ {
  /**
   * get elemnt by id
   * @param idStr the id of the elment to get
   * @returns the elment with the given id
   */
  public static id(idStr: string) {
    return document.getElementById(idStr);
  }

  /**
   * get the window object of the browser
   */
  public static get w(): Window {
    return window;
  }

  public static getCookie(key: string): string | undefined {
    const cookies = document.cookie;
    const cookiesArr = cookies.split(";");
    const retPair = cookiesArr.find(
      (c) => c.split("=")[0].replace(/\s/g, "") === key
    );
    if (!retPair) {
      return undefined;
    }
    return retPair.split("=")[1];
  }

  public static set cookie(value:string){
    if(value.indexOf('=')!=-1){
        const key = value.split('=')[0]
        const val = value.split('=')[1]
        const all = document.cookie.split(";")
        for(let i=0;i<all.length;i++){
            if(all[i].split("=")[0].trim()==key.trim()){
                all[i] = `${key}=${val}`
                document.cookie = all.reduce((prev,next)=>`${prev}${prev==''?'':';'}${next}`,"")
                return
            }
        }
        const prev = all.reduce((prev,next)=>`${prev}${prev==''?'':';'}${next}`,"")
        document.cookie = `${prev}${prev?';':''}${key}=${val};`
    }
  }

  /*
   * Returns parameter's value from url if exists. Otherwise, returns `null`.
   */
  public static param(param: string): string | null {
    const paramsString = document.location.href.split("?")[1];
    if (!paramsString) {
      return null;
    }

    const params = new URLSearchParams(paramsString);
    return params.get(param);
  }

  public static session(storage: string): any {
    return sessionStorage[storage];
  }
}
