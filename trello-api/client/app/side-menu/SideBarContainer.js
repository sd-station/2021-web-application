import { User } from "../user/User.js";
export class SideBarContainer {
    PageElement = document.querySelector(".side-bar-container");
    DisplayData() {
        this.PageElement.innerHTML = "";
        this.PageElement.classList.remove("loaded");
        this.OptionsOfUserSelections();
    }
    updatetitle() {
        var k = 1000;
        this.PageElement.innerHTML = "";
        this.titles.sort((a, b) => a.index - b.index)
            .forEach(prt => {
            if (prt.index - k > 50) {
                var hr = document.createElement("hr");
                this.PageElement.appendChild(hr);
            }
            k = prt.index;
            var Header = document.createElement("a");
            Header.className = "h2";
            Header.href = prt.link;
            Header.target = "frame";
            Header.textContent = prt.text;
            Header.id = prt.link.replaceAll("/", "-");
            this.PageElement.appendChild(Header);
        });
    }
    AddLink(ix, title, link) {
        var itm = {};
        itm.index = ix;
        itm.link = `/${link}/index.html`;
        itm.text = title;
        if (this.titles.find(j => j.link == itm.link))
            return false;
        this.titles.push(itm);
        return true;
    }
    /**
     * Show Options Based Used Selection
     */
    async OptionsOfUserSelections() {
        let inx = 100;
        this.AddLink(inx++, "start", "app/start");
        inx = 900;
        this.AddLink(inx++, "emoji", "trello/emoji");
        Object.keys(User.trello)
            .forEach(async (key) => {
            var sk = User.trello[key];
            if (sk.selected) {
                switch (key) {
                    case "member":
                        inx = 300;
                        this.AddLink(inx++, "Me", "trello/me");
                        this.AddLink(inx++, "Me / Calendar", "app/calendar");
                        this.AddLink(inx++, "Me / Workspaces", "trello/workspace");
                        this.AddLink(inx++, "Me / Projects", "trello/me/project");
                        this.AddLink(inx++, "Me / Notification", "trello/notification");
                        return;
                    case "workspace":
                        inx = 400;
                        this.AddLink(inx++, "Projects / List", "trello/board");
                        return;
                    case "board":
                        inx = 500;
                        this.AddLink(inx++, `Project "${User.trello.board.name}"`, "trello/board/view");
                        this.AddLink(inx++, "Project / Catrgoties", "trello/list");
                        return;
                    case "list":
                        inx = 600;
                        this.AddLink(inx++, `Category "${User.trello.list.name}"`, "trello/list/view");
                        this.AddLink(inx++, "Category / Cards", "trello/card");
                        return;
                    case "card":
                        inx = 700;
                        this.AddLink(inx++, `Card "${User.trello.card.name}"`, "trello/card/view");
                        this.AddLink(inx++, "Card / Notes", "trello/message");
                        this.AddLink(inx++, "Card / Tasks", "trello/checklist");
                        this.AddLink(inx++, "Card / Media", "trello/attachment");
                        return;
                    default:
                        return;
                }
            }
        });
        this.updatetitle();
    }
    titles = [];
}
//# sourceMappingURL=SideBarContainer.js.map