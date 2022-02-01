import { ITrelloActionComment } from "trello-action-comment";
import { CommentRenderer } from "./renderer/comment-renderer.js"
import { ImageRenderer } from "./renderer/image-renderer.js";
import { TextRenderer } from "../../message/lib/text-renderer.js";


export class csTrelloComment extends HTMLElement {
    private container!: ShadowRoot;


    InitalizeComponent(): any {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }

    /**
     * Display Item
     */
    async Display_Data(): Promise<any> {

        let term = "text";
        if (this.hasAttribute("data-type")) term = this.getAttribute("data-type")!;

        let src = "";
        if (this.hasAttribute("data-src")) {
            src = this.getAttribute("data-src")!;
            this.removeAttribute("data-src")!
        }

        this.container.innerHTML = "";

        switch (term) {
            case "text":
                this.container.appendChild(await new TextRenderer(src) .RenderText());
                break;
            case "image":
              
                this.container.appendChild(await new ImageRenderer(src).RenderImage());
                break;
            case "check-list":
                this.container.appendChild(new CommentRenderer(src).RenderCheckList());
                break;
            default:
                this.container.appendChild(new CommentRenderer(src).RenderAsRawText());
                break;
        }



    }

    constructor() {
        super();

        //#red uncomment to use shadow
        this.InitalizeComponent();


    }

    connectedCallback() {

        this.Display_Data();
    }
}

window.customElements.define("trello-comment", csTrelloComment)
