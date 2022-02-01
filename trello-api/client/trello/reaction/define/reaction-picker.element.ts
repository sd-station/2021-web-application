import { Page } from "../../../app/page/page.js"
import { EmojiInitializer } from "../../emoji/lib/emoji.init.js";

export class csReactionPicker extends HTMLElement {
    container!: ShadowRoot;

    connectedCallback() {
        this.Display_Data();
        fetch("/trello/reaction/define/reaction-picker.element.html")
            .then(g => g.text())
            .then(g => {
                this.container.innerHTML = g;
                var init = new EmojiInitializer()
                init.RootElement = this.container;
                init.initialize();
            });

    }
    //disconnectedCallback() {
    //...
    //}
    //ributeChangedCallback(name, oldValue, newValue) {
    //...
    //
    //doptedCallback() {
    //...
    //

    /**
     * Display Item
     */
    Display_Data(): any {

        Page.State = "lock-scroll"

        this.container.addEventListener("click", event => {

            var pass = event.target as HTMLElement;


            if (pass.tagName == "DIV") {
                if (pass.classList.contains("transparent-area")) {
                    this.parentElement?.removeChild(this);
                    Page.State = "unlock-scroll"
                }
            }

            if (pass.tagName == "EMOJI-ICON") {

                var kr = new CustomEvent("on-icon-selection", { detail: pass.getAttribute("data-id") });
                this.dispatchEvent(kr);

                this.parentElement?.removeChild(this);
                Page.State = "unlock-scroll"
            }

        })
    }

    constructor() {
        super();
        this.container = this.attachShadow({ mode: 'closed' });
    }
}

window.customElements.define("reaction-picker", csReactionPicker)
