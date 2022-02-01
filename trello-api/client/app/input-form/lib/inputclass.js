export class InputClass {
    Element;
    get Text() {
        return this.Element.value;
    }
    set Text(v) {
        this.Element.value = v;
    }
    constructor(q) {
        this.Element = document.querySelector(q);
    }
}
//# sourceMappingURL=inputclass.js.map