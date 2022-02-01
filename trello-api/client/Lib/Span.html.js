export class Span extends HTMLElement {
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
    Display_Data() {
        this.textContent = "Method not implemented.";
    }
    constructor(text) {
        super();
        this.innerHTML = text;
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}
window.customElements.define("span-message", Span, { extends: "span" });
//# sourceMappingURL=Span.html.js.map