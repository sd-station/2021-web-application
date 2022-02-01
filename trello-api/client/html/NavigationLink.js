export class NavigationLink {
    param = new Map();
    AddParam(key, val) {
        this.param.set(key, val);
        this.BuildLink();
        return this;
    }
    link;
    SetLink(arg0) {
        this.link = arg0;
        this.BuildLink();
        return this;
    }
    BuildLink() {
        let lnk = this.link;
        var chr = "?";
        this.param.forEach(function (value, key) {
            lnk += `${chr}${key}=${value}`;
            chr = "&";
        });
        this.element.href = lnk;
    }
    SetHtml(txt) {
        this.element.innerHTML = txt;
        return this;
    }
    SetClass(arg0) {
        this.element.classList.add(arg0);
        return this;
    }
    element;
    constructor() {
        this.element = document.createElement("a");
    }
}
//# sourceMappingURL=NavigationLink.js.map