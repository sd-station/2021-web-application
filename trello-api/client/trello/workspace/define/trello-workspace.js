import { DataSourceAttr } from "../../../ui/lib/DataSourceAttr.js";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
export class csTrelloWorkspace extends HTMLElement {
    container;
    item;
    InitalizeComponent() {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        var ds = new DataSourceAttr(this);
        if (ds.hasitem) {
            this.item = ds.ItemOf();
            this.Display_Data();
        }
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
        this.innerHTML = await Page.GetComponent("trello/workspace/define/trello-workspace.html", {
            title: this.item.displayName,
            name: this.item.name,
            desc: this.item.desc
        });
    }
    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
        this.addEventListener("click", _ => {
            User.trello.workspace.id = this.item.id;
            User.trello.workspace.name = this.item.displayName;
            User.SaveAndUpdate("workspace");
            Page.Navigation.NavigateTo("/trello/workspace/view/index.html");
        });
    }
}
window.customElements.define("trello-workspace", csTrelloWorkspace);
//# sourceMappingURL=trello-workspace.js.map