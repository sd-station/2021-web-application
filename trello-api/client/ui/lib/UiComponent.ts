import { Page } from "../../app/page/page.js"

export class UiComponent {

    content: string = "";

    constructor(public src: string) {

    }

    /**
     * Initialize Component with Content
     * @param el Target Component
     */
    init(el: HTMLElement) {
        el.innerHTML = this.content;
    }

    /**
     * Add text Section to content
     * @param arg0 section keyword
     */
    Add(arg0: string) {
        this.content += this.GetContent(arg0);
    }

    /**
     * Add Section With Content Replacement
     * @param arg0 section keyword
     * @param arg1 object to replace key
     */
    Apply(arg0: string, arg1: { [x: string]: any; }) {
        console.log(arg0);
        
        this.content += Page.KeyReplacement(this.GetContent(arg0), arg1)
    }

    /**
     * Retuen Content
     * @param key section keyword
     * @returns string
     */
    private GetContent(key: string) {
        var res = [] as string[];
        var active = false
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

            if (active) res.push(line);
        })

        return res.filter(j => j.trim().length > 0).join("\n")

    }




}
