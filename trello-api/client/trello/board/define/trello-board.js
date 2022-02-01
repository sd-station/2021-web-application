import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { Trello } from "../../helper/trello-helper.js";
export class csTrelloBoard extends HTMLElement {
    container;
    item;
    InitalizeComponent() {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.item = JSON.parse(this.getAttribute("data-src"));
        this.removeAttribute("data-src");
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
        this.innerHTML =
            await Page.GetComponent("/trello/board/define/trello-board.element.html", this.item);
    }
    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
        this.addEventListener("click", _ => {
            User.trello.board.id = this.item.id;
            User.trello.board.name = this.item.name;
            User.SaveAndUpdate("board");
            Page.Navigation.NavigateTo(Trello.Board.page.view);
        });
    }
}
window.customElements.define("trello-board", csTrelloBoard);
//# sourceMappingURL=trello-board.js.map