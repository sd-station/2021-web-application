import { ShowDataDetails } from "../../../app/ui/show-data-details.js";
import { User } from "../../../app/user/User.js";
import { TrelloMemberApi } from "../../api/member-api.js";
document.querySelector("#page-title").textContent = User.trello.board.name;
document.body.classList.add("loading");
const container = document.querySelector("item-container");
var dataloader = await new TrelloMemberApi().OfBoard(User.trello.board.id);
var data = dataloader.ToList();
data.forEach(itm => {
    var jm = document.createElement("joined-membership");
    jm.setAttribute("data-src", JSON.stringify(itm));
    jm.setAttribute("data-promision", "admin");
    container.appendChild(jm);
});
new ShowDataDetails()
    .DisplayDetails("code", data)
    .DisplayLisk(dataloader.link);
document.body.classList.remove("loading");
//# sourceMappingURL=index.html.js.map