import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { ReactionApi } from "../../api/ReactionApi.js";
export class csReactionItem extends HTMLElement {
    container;
    collection;
    hasOwener;
    InitalizeComponent() {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.hasOwener = this.collection.map(h => h.idMember).indexOf(User.trello.member.id) >= 0;
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
        var addition = this.collection.length;
        if (this.hasOwener && !this.HasProprty())
            addition += 1;
        if (!this.hasOwener && this.HasProprty())
            addition -= 1;
        if (addition == 0) {
            this.style.display = "none";
            return;
        }
        this.innerHTML = "";
        if (this.hasOwener)
            this.classList.add("me");
        else
            this.classList.remove("me");
        this.appendChild(Page.MakeElement("span", "emoji", `${this.collection[0].emoji.native}`));
        this.appendChild(Page.MakeElement("span", "number", `${addition}`));
        this.title = this.collection[0].emoji.name ?? this.collection[0].emoji.shortName;
        var container = Page.MakeElement("div", "container", this.collection.map(h => h.member.fullName ?? h.member.username).join("\n"));
        this.appendChild(container);
    }
    HasProprty() {
        return this.collection.map(h => h.idMember).indexOf(User.trello.member.id) >= 0;
    }
    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
        this.addEventListener("click", async (event) => {
            if (this.classList.contains("clicked")) {
                event.preventDefault();
                return;
            }
            this.hasOwener = !this.hasOwener;
            this.classList.add("clicked", this.hasOwener ? "add-theme" : "delete-theme");
            if (this.hasOwener) {
                var data = await new ReactionApi().AddReaction(this.collection[0].idModel, this.collection[0].emoji.unified);
                this.collection.push(data.data);
            }
            else {
                var se = this.collection.filter(h => h.idMember == User.trello.member.id)[0];
                var data = await new ReactionApi().RemoveReaction(se.idModel, se.id);
                this.collection = this.collection.filter(h => h.idMember != User.trello.member.id);
            }
            this.classList.remove("clicked", "add-theme", "delete-theme");
            this.Display_Data();
        });
    }
}
window.customElements.define("reaction-item", csReactionItem);
//# sourceMappingURL=reaction-item.js.map