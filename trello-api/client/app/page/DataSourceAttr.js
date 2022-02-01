export class DataSourceAttr {
    target;
    get hasitem() {
        return this.target.hasAttribute("data-src");
    }
    constructor(trg) {
        this.target = trg;
    }
    ItemOf() {
        var txt = this.target.getAttribute("data-src");
        this.target.removeAttribute("data-src");
        return JSON.parse(txt);
    }
}
//# sourceMappingURL=DataSourceAttr.js.map