import { Page } from "../../../app/page/page.js";
import { ShowDataDetails } from "../../../app/ui/show-data-details.js";
import { User } from "../../../app/user/User.js";
import { TrelloMemberApi } from "../../api/member-api.js";
import { csJoinedMembership } from "../../membership/define/joined-membership.js";

 

Page.SetTitle(User.trello.workspace.name)

document.body.classList.add("loading");
const container = document.querySelector("item-container") as HTMLElement;
var dataloader = await new TrelloMemberApi().OfWorkspace(User.trello.workspace.id);
var data = dataloader.ToList();

data.forEach(itm => {
    var jm = document.createElement("joined-membership") as csJoinedMembership;
    jm.setAttribute("data-src", JSON.stringify(itm))
    jm.setAttribute("data-promision", "admin")
    container.appendChild(jm)
})

Page.log("members" , dataloader)


var dataloader2 = await new TrelloMemberApi().membershipsOfWorkspace(User.trello.workspace.id);
Page.log("membership" , dataloader2)
 

document.body.classList.remove("loading");
