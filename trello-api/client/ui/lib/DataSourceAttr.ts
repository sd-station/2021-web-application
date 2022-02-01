
export class DataSourceAttr {
    target!: HTMLElement;


    public get hasitem(): boolean {
        return this.target.hasAttribute("data-src");
    }

    constructor(trg: HTMLElement) {
        this.target = trg;
      
    }
    ItemOf<T>() {
        var txt = this.target.getAttribute("data-src")!
        this.target.removeAttribute("data-src");
        return JSON.parse(txt) as T;
    }



}

 