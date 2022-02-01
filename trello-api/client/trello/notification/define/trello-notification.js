import { Page } from "../../../app/page/page.js";
import { DateDistance } from "../../../Lib/DateDistance.js";
export class csTrelloNotification extends HTMLElement {
    container;
    item;
    InitalizeComponent() {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        if (!this.item && !this.hasAttribute("data-src"))
            return;
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
        var data = {
            date: this.item.date,
            cardname: "",
            cardid: "",
            title: this.item.type.toString(),
            content: "",
            caption: "",
            reaction: "",
            owner: ""
        };
        if (this.item.data.card) {
            data.cardname = this.item.data.card.name;
            data.cardid = this.item.data.card.id;
        }
        if (this.item.memberCreator)
            data.owner = this.item.memberCreator.fullName;
        else
            data.owner = "System";
        data.date = new DateDistance().ToNow(new Date(this.item.date)).Distance;
        if (this.item.type == "cardDueSoon") {
            data.title = "Card Reminder";
            if (this.item.data.card.due) {
                var date = new Date(this.item.data.card.due);
                data.content = new DateDistance().BetweenDates(new Date(), date).Remaining;
            }
        }
        if (this.item.type == "addedToBoard") {
            data.title = "Add you to Project ";
            data.content = `Removed From Project ${this.item.data.board.name}`;
        }
        if (this.item.type == "removedFromBoard") {
            data.title = "Removed You From Project ";
            data.content = `Added to Project ${this.item.data.board.name}`;
        }
        if (this.item.type == "addedToCard") {
            data.title = "Add you to Card ";
            data.content = `Added to Card "${this.item.data.card.name}"`;
        }
        if (this.item.type == "removedFromCard") {
            data.title = "Removed you from Card ";
            data.content = `Removed from Card "${this.item.data.card.name}"`;
        }
        if (this.item.type == "changeCard") {
            data.title = "Card Update";
            if (this.item.data.old) {
                Object.keys(this.item.data.old).forEach(key => {
                    var cc = this.item.data.card;
                    var cold = this.item.data.old;
                    if (key == "due") {
                        data.content += `<div title="${cold[key] ? "Change Due Date From " + cold[key] : "Add Due Date"}" > <span>${key}</span> <span>${cc[key] ? new Date(cc[key]) : "Date Removed"}</span> </div>`;
                    }
                    if (key == "idList") {
                        data.content += `<div> Moved From List ${this.item.data.listBefore.name} To List ${this.item.data.listAfter.name}  </div>`;
                    }
                    if (key == "closed") {
                        if (this.item.data.card.closed)
                            data.content += `<div> Card Closed  </div>`;
                        else
                            data.content += `<div> Card Recovered  </div>`;
                    }
                });
            }
        }
        if (this.item.type == "mentionedOnCard") {
            data.title = "You Called On Card";
            data.content = this.item.data.text;
        }
        if (this.item.type == "reactionAdded") {
            data.title = "Add Reaction On Card";
            var res = "";
            this.item.reactions.forEach(k => {
                res += k.emoji.native;
            });
            data.reaction = res;
            if (this.item.data.actionType == "commentCard") {
                data.content = this.item.data.text;
            }
        }
        if (this.item.type == "commentCard") {
            data.title = "Add Comment On Card";
            data.content = this.item.data.text;
        }
        if (this.item.type == "addAttachmentToCard") {
            data.title = "Add Attachment on Card";
            var img = this.item.data.attachment.previewUrl;
            var alt = this.item.data.name;
            if (this.item.data.previews) {
                var ff = this.item.data.previews.filter(h => h.width < 350).sort((a, b) => b.width - a.width)[0];
                img = ff.url;
                alt = ff.width + "";
            }
            data.content = `<img src="${img}" alt="${alt}">`;
        }
        var temp = await Page.GetComponent("/trello/notification/define/trello-notification.html", data);
        this.innerHTML = temp;
    }
    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}
window.customElements.define("trello-notification", csTrelloNotification);
//# sourceMappingURL=trello-notification.js.map