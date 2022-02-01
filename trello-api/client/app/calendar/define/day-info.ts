import { ITrelloBoard } from "trello-api";
import { ITrelloCard } from "trello-card-api";
import { ITrelloList } from "trello-list-api";
import { TrelloBoardApi } from "../../../trello/api/board-api.js";
import { TrelloCardApi } from "../../../trello/api/card-api.js";
import { CardUpdateApi } from "../../../trello/api/card-update.api.js";
import { ListApi } from "../../../trello/api/list-api.js";
import { Page } from "../../page/page.js"

export class csDayInfo extends HTMLElement {
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
    async Display_Data() {

        var options = {
            title: this.getAttribute("data-date")!
        }
        var content = await Page.GetComponent("/app/calendar/define/day-info.html", options);

        this.innerHTML = content;

        this.querySelector("#btn-new-card")?.addEventListener("click", async _ => {

            var ifr = document.createElement("iframe");
            ifr.src = "/trello/card/edit/index.html"
            Page.CreateModal(ifr, { mode: "solid-float" });
            ifr.onload = () => {
                //>> state loading
                var data = { command: 'set-state', value: "loading" };
                ifr.contentWindow!.postMessage(data, window.location.href);

                //>> set date
                var data = { command: 'set-date', value: options.title };
                ifr.contentWindow!.postMessage(data, window.location.href);

                //>> 
                var data = { command: 'set-data', value:  "manual" };
                ifr.contentWindow!.postMessage(data, window.location.href);

            };



        })
    }

    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}

window.customElements.define("calendar-dayinfo", csDayInfo)
