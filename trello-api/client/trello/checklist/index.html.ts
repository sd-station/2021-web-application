import { Page } from "../../app/page/page.js";
import { ShowDataDetails } from "../../app/ui/show-data-details.js";
import { PageParameters } from "../../Lib/searchoptions.js";
import { User } from "../../app/user/User.js";
import { csTrelloComment } from "../action/define/trello-comment.js";
import { CheckListApi } from "../api/checklist-api.js";
import { ContainerElement } from "../../app/ui/default/default-element.js";
import { csTrelloChecklist } from "./define/trello-checklist.js";
import { AppModal } from "../../app/modal/app-modal.js";
Page.Include("/trello/checklist/define/trello-checklist")
Page.Include("/trello/checkitem/define/trello-checkitem")
document.body.classList.add("loading");

await User.Loaded();

const container = document.querySelector("item-container") as HTMLElement;

const cardid = Page.Param("card-id");


var dataloader = await new CheckListApi().OfCard(cardid);

var data = dataloader.ToList();

data.forEach(brd => {
    var c = document.createElement("trello-checklist") as csTrelloChecklist;
    c.dir = "auto";
    c.setAttribute("data-src", JSON.stringify(brd))
    container.appendChild(c);
})

new ShowDataDetails()
    .DisplayDetails("code", data)
    .DisplayLisk(dataloader.link)

if (data.length == 0) new ContainerElement(container)
    .Image("/assets/trello/task.svg")
    .MessageBox("No *Task* Here")


document.body.classList.remove("loading");

document.querySelector("#btn-add-new")?.addEventListener("click", _ => {
    var r = new AppModal();
    r.CreateModal();
    r.InitializeFrame(new PageParameters().AssignParameters(["card-id", "card-title"], "./add/index.html"));
   
})

