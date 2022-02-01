import { Page } from "../../app/page/page.js";
import { ContainerElement } from "../../app/ui/default/default-element.js";
import { ShowDataDetails } from "../../app/ui/show-data-details.js";
import { User } from "../../app/user/User.js";
import { TrelloCardApi } from "../api/card-api.js";
Page.Include("define/trello-card");
document.querySelector("#work-space-title").textContent =
    User.trello.workspace.name;
document.querySelector("#board-title").textContent =
    User.trello.board.name;
document.querySelector("#list-title").textContent =
    User.trello.list.name;
document.body.classList.add("loading");
const container = document.querySelector("item-container");
var dataloader = await new TrelloCardApi().OfList(User.trello.list.id);
var data = dataloader.ToList();
data.forEach(brd => {
    var c = document.createElement("trello-card");
    c.setAttribute("data-src", JSON.stringify(brd));
    container.appendChild(c);
});
if (data.length == 0) {
    new ContainerElement(container).MessageBox("Data Not Found");
}
new ShowDataDetails()
    .DisplayDetails("code", data)
    .DisplayLisk(dataloader.link);
document.body.classList.remove("loading");
//# sourceMappingURL=index.html.js.map