import { Page } from "../../../app/page/page.js";
export class csCardColorPicker extends HTMLElement {
    container;
    connectedCallback() {
        this.Display_Data();
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
    async Display_Data() {
        this.container.innerHTML = await Page.GetComponent("/trello/card/define/card-colorpicker.html");
        var colors = ["pink", "yellow", "lime", "blue", "black", "orange", "red", "purple", "sky", "green"];
        colors.forEach(itm => {
            var cl = document.createElement("div");
            cl.style.backgroundColor = itm;
            this.container.appendChild(cl);
            cl.addEventListener("click", _ => {
                var p = new CustomEvent("on-pick-color", { detail: itm });
                this.dispatchEvent(p);
            });
        });
    }
    constructor() {
        super();
        this.container = this.attachShadow({ mode: 'open' });
    }
}
window.customElements.define("card-colorpicker", csCardColorPicker);
//# sourceMappingURL=card-colorpicker.js.map