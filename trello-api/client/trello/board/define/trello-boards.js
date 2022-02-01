import { Page } from "../../../app/page/page.js";
import { ContainerElement } from "../../../app/ui/default/default-element.js";
import { ShowDataDetails } from "../../../app/ui/show-data-details.js";
import { User } from "../../../app/user/User.js";
import { Trello } from "../../helper/trello-helper.js";
import { TrelloBoardApi } from "../../api/board-api.js";
export class csBoardlist extends HTMLElement {
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
        document.body.classList.add("loading");
        const container = this;
        var DataLoader = await new TrelloBoardApi().OfWorkspace(User.trello.workspace.id);
        var tmp = await fetch("/template/trello-board.html");
        var temp = await tmp.text();
        var data = DataLoader.ToList();
        data.forEach(brd => {
            var c = document.createElement("trello-board");
            c.innerHTML = Page.KeyReplacement(temp, brd);
            container.appendChild(c);
            c.addEventListener("click", _ => {
                User.trello.board.id = brd.id;
                User.trello.board.name = brd.name;
                User.SaveAndUpdate("board");
                Page.Navigation.Navigate(Trello.Board.page.view);
            });
        });
        if (data.length == 0) {
            new ContainerElement(container)
                .Image("/assets/trello/board.svg")
                .MessageBox("No Board Here");
        }
        new ShowDataDetails()
            .DisplayDetails("code", data)
            .DisplayLisk(DataLoader.link);
        document.body.classList.remove("loading");
    }
    constructor() {
        super();
        this.classList.add("item-container");
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}
window.customElements.define("trello-boards", csBoardlist);
//# sourceMappingURL=trello-boards.js.map