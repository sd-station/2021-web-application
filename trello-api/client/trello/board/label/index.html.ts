import { ShowDataDetails } from "../../../app/ui/show-data-details.js";
import { User } from "../../../app/user/User.js";
import { LabelApi } from "../../api/label-api.js";

document.body.classList.add("loading");
const container = document.querySelector("item-container") as HTMLElement;
var dataloader = await new LabelApi().ofBoard(User.trello.board.id);
var data = dataloader.ToList();

data.forEach(itm1 => {
    var c = document.createElement("trello-label");
    c.dir = "auto";
    c.setAttribute("data-src", JSON.stringify(itm1))
    container.appendChild(c);

})

new ShowDataDetails()
    .DisplayDetails("code", data)
    .DisplayLisk(dataloader.link)

document.body.classList.remove("loading");
