import { Page } from "../../../app/page/page.js"

export class csCardTimePicker extends HTMLElement {
    container!: ShadowRoot;

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
        this.container.innerHTML =
            await Page.GetComponent("/trello/card/define/card-timepicker.html", {
                min: `${new Date().getFullYear()}-01-01`
            })

        var dta = this.container.querySelector("#txt-datepicker") as HTMLInputElement;


        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        dta.value = now.toISOString().slice(0, 16);


        this.container.querySelector("#btn-save-document")?.addEventListener("click", _ => {


            var dtav = dta.valueAsNumber + new Date().getTimezoneOffset() * 60 * 1000;



            var k = new CustomEvent("on-pick-date", { detail: dtav });
            this.dispatchEvent(k);
        })

    }

    constructor() {
        super();
        this.container = this.attachShadow({ mode: 'open' });
    }
}

window.customElements.define("card-timepicker", csCardTimePicker)
