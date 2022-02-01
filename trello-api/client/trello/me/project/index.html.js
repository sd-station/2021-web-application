import { Page } from "../../../app/page/page.js";
import { TrelloBoardApi } from "../../api/board-api.js";
Page.Include("/trello/workspace/define/trello-workspace-summary.element");
Page.Include("/trello/board/define/trello-board");
var link = "";
document.body.classList.add("loading");
const container = document.querySelector("item-container");
var dataloader = await new TrelloBoardApi().ofMember("me");
var data = dataloader.ToList();
new Set(data.map(b => b.idOrganization))
    .forEach(cat => {
    var h = document.createElement("trello-workspace-summary");
    var disp = "personal";
    if (cat != null) {
        disp = cat;
    }
    h.setAttribute("data-id", disp);
    container.appendChild(h);
    data.filter(k => k.idOrganization == cat).forEach(brd => {
        var c = document.createElement("trello-board");
        c.setAttribute("data-src", JSON.stringify(brd));
        container.appendChild(c);
    });
});
Page.log("Data", dataloader);
document.body.classList.remove("loading");
//# sourceMappingURL=index.html.js.map