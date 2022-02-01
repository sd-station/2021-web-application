import { ListApi } from "../../api/list-api.js";
export class csTrelloListSummary extends HTMLElement {
    container;
    InitalizeComponent() {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
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
        var h = document.createElement("h3");
        h.textContent = "loading .. ";
        this.insertBefore(h, this.children.length > 0 ? this.children[0] : null);
        var id = this.getAttribute("data-id");
        var data = await new ListApi().GetItem(id);
        h.textContent = data.data.name;
    }
    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}
window.customElements.define("trello-list-summary", csTrelloListSummary);
//# sourceMappingURL=trello-list-summary.element.js.map