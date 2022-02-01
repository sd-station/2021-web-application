

export class Linker {
    AddQuery(query: { [x: string]: any; }) {
        var keys = Object.keys(query).filter(g => query[g] != null && query[g].length > 0);
        if (keys.length == 0) return "";
        return   keys.map(k => `&${k}=${query[k]}`).join("");
    }
    Join(arg0: string) {
        this.link = arg0 + this.link;
        return this;
    }

    constructor(public link: string) {

    }
    Apply(item: { [x: string]: any }) {

        Object.keys(item).forEach(key => {
            while (this.link.indexOf(`{${key}}`) > 0) {
                this.link = this.link.replace(`{${key}}`, `${decodeURI(item[key])}`)
            };
        })
        return this;
    }
}

export class ComponentEmitter {
    Apply(item: { [x: string]: any }) {

        Object.keys(item).forEach(key => {
            while (this.RawString.indexOf(`{{${key}}}`) > 0) {
                this.RawString = this.RawString.replace(`{{${key}}}`, `${decodeURI(item[key])}`)
            };
        })

    }
    selector: string;

    RawString: string = "";



    public get IsSupported(): boolean {
        return this.RawString.length > 0;
    }

    StackPanel(className: string = "") {
        var s = document.createElement("stack-panel");
        s.innerHTML = this.RawString;
        if (className.length > 0) s.className = className;
        return s;
    }

    constructor(selector: string) {
        this.selector = selector;
        this.Update();

    }

    Update() {
        this.RawString = document.querySelector(this.selector)?.innerHTML ?? "";

    }


    //** Replace Contnet With Keys */
    Div(className: string = ""): HTMLElement {
        var s = document.createElement("div");
        s.innerHTML = this.RawString;
        if (className.length > 0) s.className = className;
        return s;
    }
}
