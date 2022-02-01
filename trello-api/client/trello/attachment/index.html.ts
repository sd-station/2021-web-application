import { ITrelloAttachmentResponse } from "trello-attachment-response";
import { Page } from "../../app/page/page.js";
import { ContainerElement } from "../../app/ui/default/default-element.js";
import { ShowDataDetails } from "../../app/ui/show-data-details.js";
import { User } from "../../app/user/User.js";
import { csTrelloComment } from "../action/define/trello-comment.js";
import { AttachmentApi } from "../api/attachment-api.js";

document.body.classList.add("loading");
const container = document.querySelector("item-container") as HTMLElement;
var dataloader = await new AttachmentApi().OfCard(Page.Param("card-id"));
var data = dataloader.ToList() as ITrelloAttachmentResponse[];

data.forEach(brd => {
    var c = document.createElement("trello-comment") as csTrelloComment;
    c.dir = "auto";
    c.setAttribute("data-type", "image")
    c.setAttribute("data-src", JSON.stringify(brd))
    container.appendChild(c);

    // c.addEventListener("click", _ => {
    //     User.trello.board.id = brd.id;
    //     User.trello.board.name = brd.name;
    //     User.SaveAndUpdate();
    // })
})

if(data.length == 0) new ContainerElement(container)
.Image("/assets/trello/media.svg")
.MessageBox("No *File* Here")

new ShowDataDetails()
    .DisplayDetails("code", data)
    .DisplayLisk(dataloader.link)

document.body.classList.remove("loading");
