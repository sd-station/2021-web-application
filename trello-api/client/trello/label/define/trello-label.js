export class csTrelloLabel extends HTMLElement {
    container;
    item;
    InitalizeComponent() {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'closed' });
    }
    connectedCallback() {
        if (this.hasAttribute("data-src")) {
            this.item = JSON.parse(this.getAttribute("data-src"));
            this.Display_Data(this.item.name?.trim().length > 0 ? this.item.name : this.item.color);
            this.style.backgroundColor = this.item.color;
        }
        else
            this.Display_Data("Method not implemented.");
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
    Display_Data(message) {
        this.container.innerHTML = `
    <link rel="stylesheet" href="/css/trello-label.css">
   <div> ${message}</div>
        `;
    }
    constructor() {
        super();
        /// uncomment to use shadow
        this.InitalizeComponent();
    }
}
window.customElements.define("trello-label", csTrelloLabel);
//# sourceMappingURL=trello-label.js.map