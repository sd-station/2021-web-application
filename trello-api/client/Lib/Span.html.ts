export class Span extends HTMLElement {
    container!: ShadowRoot;
    InitalizeComponent(): any {
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
    Display_Data(): any {
        this.textContent = "Method not implemented.";
    }

    constructor( text:string) {
        super();
        this.innerHTML = text;
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}

window.customElements.define("span-message", Span, { extends: "span" })