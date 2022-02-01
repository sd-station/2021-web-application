import { Page } from "../../app/page/page.js";
export class UiComponent {
    src;
    content = "";
    constructor(src) {
        this.src = src;
    }
    /**
     * Initialize Component with Content
     * @param el Target Component
     */
    init(el) {
        el.innerHTML = this.content;
    }
    /**
     * Add text Section to content
     * @param arg0 section keyword
     */
    Add(arg0) {
        this.content += this.GetContent(arg0);
    }
    /**
     * Add Section With Content Replacement
     * @param arg0 section keyword
     * @param arg1 object to replace key
     */
    Apply(arg0, arg1) {
        console.log(arg0);
        this.content += Page.KeyReplacement(this.GetContent(arg0), arg1);
    }
    /**
     * Retuen Content
     * @param key section keyword
     * @returns string
     */
    GetContent(key) {
        var res = [];
        var active = false;
        var lines = this.src.split("\n");
        lines.forEach(line => {
            if (line.trimStart().startsWith("#" + key)) {
                active = true;
                return;
            }
            if (line.trimStart().startsWith("#")) {
                active = false;
                return;
            }
            if (active)
                res.push(line);
        });
        return res.filter(j => j.trim().length > 0).join("\n");
    }
}
//# sourceMappingURL=UiComponent.js.map