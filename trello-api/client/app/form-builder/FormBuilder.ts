export class FormBuilder {



    public get formdata(): { [x: string]: string } {
        var d = {} as { [x: string]: string };
        this.Inputs.forEach((k, v) => {
            d[v] = k.value;
        })
        return d;
    }

    OnSubmit!: () => void;
    input(arg0: string, content: string = "") {
        var el = this.add<HTMLInputElement>({ name: arg0, type: "input" })
        el.value = content;
    }
    textarea(arg0: string, content: string = "") {
        var el = this.add<HTMLTextAreaElement>({ name: arg0, type: "textarea" })
        el.value = content;
    }

    element: HTMLElement;
    Inputs = new Map<string, HTMLInputElement>();

    constructor() {
        this.element = this.H("input-form")
        this.element.classList.add("vertical-form")
    }
    add<T>(opt: { name: string, type: "input" | "textarea" }) {
        var label = this.H("label")
        var span = this.H("span")
        span.append(document.createTextNode(opt.name.replaceAll("-", " ")))
        var input = this.from<HTMLInputElement>(opt.type);
        input.dir = "auto";
        this.Inputs.set(opt.name, input);
        label.appendChild(span)
        label.appendChild(input)
        this.element.appendChild(label)
        return input as unknown as T;
    }
    from<T>(arg0: string) {
        return document.createElement(arg0) as unknown as T;
    }
    H(H: string) {
        return document.createElement(H);
    }

    finilize() {


        if (this.OnSubmit) {
            var lbl = this.CreateChild(this.element, "label")
            var btn = this.CreateChild(lbl, "button")
            btn.textContent = "Save";
            btn.addEventListener("click", event => {
                this.OnSubmit();
            })
        }
    }
    CreateChild(lbl: HTMLElement, arg1: string) {
        var el = this.H(arg1);
        lbl.appendChild(el)
        return el;
    }

}