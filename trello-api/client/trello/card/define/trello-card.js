import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { Trello } from "../../helper/trello-helper.js";
export class csTrelloCard extends HTMLElement {
    container;
    item;
    InitalizeComponent() {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        if (this.IsLoaded)
            this.Page_Loaded();
    }
    async Page_Loaded() {
        var tmp = await fetch("/template/trello-card.html");
        var temp = await tmp.text();
        this.container.innerHTML = Page.KeyReplacement(temp, this.item);
        if (this.item.cover.color) {
            this.container.querySelector("main").style.backgroundColor =
                this.item.cover.color;
        }
        this.container.querySelector("main").addEventListener("click", _ => {
            User.SetAndUpdate("card", this.item.id, this.item.name);
            Page.Navigation.Navigate(Trello.message.page.index);
        });
        if (this.item.closed)
            this.classList.add("state-closed");
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
    get IsLoaded() {
        if (this.item)
            return true;
        if (!this.hasAttribute("data-src")) {
            this.container.textContent = "Data Not Found";
            return false;
        }
        this.item = JSON.parse(this.getAttribute("data-src"));
        this.removeAttribute("data-src");
        return true;
    }
    constructor() {
        super();
        /// uncomment to use shadow
        this.InitalizeComponent();
    }
}
window.customElements.define("trello-card", csTrelloCard);
//# sourceMappingURL=trello-card.js.map