import { Page } from "../../app/page/page.js";
import { ContainerElement } from "../../app/ui/default/default-element.js";
import { ShowDataDetails } from "../../app/ui/show-data-details.js";
import { User } from "../../app/user/User.js";
import { NotificationApi } from "../api/notification-api.js";
import { csTrelloNotification } from "./define/trello-notification.js";

Page.Include("./define/trello-notification.js");

document.body.classList.add("loading");
const container = document.querySelector("item-container") as HTMLElement;

var DataLoader = await new NotificationApi().OfMember(User.trello.member.id);

var data = DataLoader.ToList();

data.forEach(itm1 => {
    var c = document.createElement("trello-notification") as csTrelloNotification;
    c.dir = "auto";
    c.setAttribute("data-src", JSON.stringify(itm1))
    container.appendChild(c);
})

new ShowDataDetails()
    .DisplayDetails("code", data)
    .DisplayLisk(DataLoader.link)

if (data.length == 0) {
    new ContainerElement(container).MessageBox(DataLoader.ResponseText)
}

document.body.classList.remove("loading");
