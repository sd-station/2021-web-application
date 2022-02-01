import { Page } from "../../../app/page/page.js";
import { WorkspaceApi } from "../../api/workspace-api.js";
export class csTrelloWorkspaceSummary extends HTMLElement {
    container;
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
        var id = this.getAttribute("data-id");
        var param = { name: id };
        if (id != "personal") {
            var data = await new WorkspaceApi().GetItem(id);
            if (data.HasItem)
                param.name = data.data.displayName;
            else {
                param.name = "invited";
                Page.log("invited", data);
            }
        }
        this.container.innerHTML =
            await Page.GetComponent("/trello/workspace/define/trello-workspace-summary.html", param);
        if (param.name == "invited") {
            this.container.querySelector("h3").style.color = "#707070";
        }
    }
    constructor() {
        super();
        this.container = this.attachShadow({ mode: 'closed' });
    }
}
window.customElements.define("trello-workspace-summary", csTrelloWorkspaceSummary);
//# sourceMappingURL=trello-workspace-summary.element.js.map