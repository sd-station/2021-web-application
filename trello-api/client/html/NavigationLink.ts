export class NavigationLink {
    param = new Map() as Map<string, string>;

    AddParam(key: string, val: string) {
        this.param.set(key, val)
        this.BuildLink();
        return this;
    }
    link!: string;
    SetLink(arg0: string) {
        this.link = arg0;
        this.BuildLink();
        return this;
    }
    private BuildLink() {

        let lnk = this.link;
        var chr = "?";
        this.param.forEach(function (value, key) {
            lnk += `${chr}${key}=${value}`
            chr = "&";
        })

        this.element.href = lnk;
    }
    SetHtml(txt: string) {
        this.element.innerHTML = txt;
        return this;
    }
    SetClass(arg0: string) {
        this.element.classList.add(arg0);
        return this;
    }
    element: HTMLAnchorElement;
    constructor() {
        this.element = document.createElement("a")
    }
}