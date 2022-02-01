
import { ShowDataDetails } from "../../app/ui/show-data-details.js"
import { User } from "../../app/user/User.js"
import { Trello } from "../helper/trello-helper.js"
import { WorkspaceApi } from "../api/workspace-api.js"
import { ITrelloWorkspace } from "trello-org-api"
import { Page } from "../../app/page/page.js"
import { ContainerElement } from "../../app/ui/default/default-element.js"
import { csTrelloWorkspace } from "./define/trello-workspace.js"
import { AppModal } from "../../app/modal/app-modal.js"
Page.Include("./define/trello-workspace.js");
document.body.classList.add("loading");
const container = document.querySelector("item-container") as HTMLElement;
var dataloader = await new WorkspaceApi().OfMember(User.trello.member.id);

var data = dataloader.ToList() as ITrelloWorkspace[];



data.forEach(itm1 => {
    var c = document.createElement("trello-workspace") as csTrelloWorkspace;
    c.classList.add("glow-on-hover")

    c.dir = "auto";
    c.setAttribute("data-src", JSON.stringify(itm1))

    if (itm1.memberships.length > 1) {
        c.classList.add("team-work")
    } else { c.classList.add("single") }
    container.appendChild(c);



})

// show Data
Page.log("code", dataloader);


if (data.length == 0)
    new ContainerElement(container)
        .Image("/assets/trello/workspace.svg")
        .MessageBox("No Workspace Found")

document.body.classList.remove("loading");


document.querySelector("#btn-add-workspace")!.addEventListener("click", _ => {
    new AppModal().InitializeFrame("/trello/workspace/wizard/start/index.html")
})