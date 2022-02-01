export class FormBuilder {
    get formdata() {
        var d = {};
        this.Inputs.forEach((k, v) => {
            d[v] = k.value;
        });
        return d;
    }
    OnSubmit;
    input(arg0, content = "") {
        var el = this.add({ name: arg0, type: "input" });
        el.value = content;
    }
    textarea(arg0, content = "") {
        var el = this.add({ name: arg0, type: "textarea" });
        el.value = content;
    }
    element;
    Inputs = new Map();
    constructor() {
        this.element = this.H("input-form");
        this.element.classList.add("vertical-form");
    }
    add(opt) {
        var label = this.H("label");
        var span = this.H("span");
        span.append(document.createTextNode(opt.name.replaceAll("-", " ")));
        var input = this.from(opt.type);
        input.dir = "auto";
        this.Inputs.set(opt.name, input);
        label.appendChild(span);
        label.appendChild(input);
        this.element.appendChild(label);
        return input;
    }
    from(arg0) {
        return document.createElement(arg0);
    }
    H(H) {
        return document.createElement(H);
    }
    finilize() {
        if (this.OnSubmit) {
            var lbl = this.CreateChild(this.element, "label");
            var btn = this.CreateChild(lbl, "button");
            btn.textContent = "Save";
            btn.addEventListener("click", event => {
                this.OnSubmit();
            });
        }
    }
    CreateChild(lbl, arg1) {
        var el = this.H(arg1);
        lbl.appendChild(el);
        return el;
    }
}
//# sourceMappingURL=FormBuilder.js.map