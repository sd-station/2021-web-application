export class csDrawIcon extends HTMLElement {
    container;
    connectedCallback() {
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
    constructor() {
        super();
        var kt = this.innerHTML;
        fetch(`/assets/${kt}.svg`).then(async (h) => {
            var size = 24;
            var content = await h.text();
            this.container.innerHTML =
                `
            <style>
                svg {  width: ${size}px;  height: ${size}px;  }
                :host{ display:flex; slign-items:center; }
            </style>
            
            ${content}`;
        });
        this.container = this.attachShadow({ mode: 'closed' });
    }
}
window.customElements.define("draw-icon", csDrawIcon);
//# sourceMappingURL=draw-icon.define.js.map