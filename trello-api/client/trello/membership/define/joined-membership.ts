import { ITrelloMember, ITrelloMemberAPI } from "trello-member-api";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { TrelloMemberApi } from "../../api/member-api.js";

export class csJoinedMembership extends HTMLElement {
    container!: ShadowRoot;
    item!: ITrelloMember;
    InitalizeComponent(): any {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'closed' });

    }
    connectedCallback() {
        if (!this.hasAttribute("data-src")) return;
        var itmtext = this.getAttribute("data-src")!;
        this.removeAttribute("data-src")
        this.item = JSON.parse(itmtext) as ITrelloMember;
        this.Display_Data();
        console.log("Connected");

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
    async Display_Data(): Promise<any> {
        this.container.innerHTML = "";
        var image = `/assets/images/profile-1.png`

        var data = {
            "name": this.item.fullName,
            "username": this.item.username,
            "id": this.item.id,
            "image": image,
            "option-remove": User.trello.member.id == this.item.id ? "hide" : "allow" ,
        }

        if(User.trello.member.id == this.item.id) data.name += " (you)"


        this.container.innerHTML = await Page.GetComponent("/trello/membership/define/joined-membership.html", data);


        this.container.querySelector("#btn-name")!.addEventListener("click", _ => {
            // User.trello.board.id = brd.id;
            // User.trello.board.name = brd.name;
            // User.SaveAndUpdate("board");
        })

        this.container.querySelector("#btn-remove")!.addEventListener("click", async _ => {
            document.body.classList.add("loading")

            if (this.hasAttribute("data-board")) {
                let id = User.trello.board.id;
                await new TrelloMemberApi().RemoveFromBoard(id, this.item.id);
                window.location.reload();
                return;
            }

            if (this.hasAttribute("data-workspace")) {
                let id = User.trello.board.id;
                await new TrelloMemberApi().RemoveFromBoard(id, this.item.id);
                window.location.reload();
                return;
            }

        })

        var usr = await new TrelloMemberApi().GetItem(this.item.id);
        if (usr.HasItem) {
            var membership = usr.ItemOf<ITrelloMemberAPI>();
            if (membership.avatarUrl) {
                var img = this.container.querySelector("#profile-image") as HTMLImageElement;
                img.style.backgroundImage = "";
                img.src = membership.avatarUrl + "/170.png"
            }
        }


    }

    constructor() {
        super();

        //#red uncomment to use shadow
        this.InitalizeComponent();
        console.log("Created");

    }
}

window.customElements.define("joined-membership", csJoinedMembership)
