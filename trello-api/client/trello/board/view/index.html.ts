import { ITrelloCard } from "trello-card-api";
import { Page } from "../../../app/page/page.js";
import { ContainerElement } from "../../../app/ui/default/default-element.js";
import { User } from "../../../app/user/User.js"
import { TrelloBoardApi } from "../../api/board-api.js";
import { TrelloCardApi } from "../../api/card-api.js";
import { csTrelloCard } from "../../card/define/trello-card.js";
import { csTrelloListSummary } from "../../list/define/trello-list-summary.element.js";
 
Page.Include("/trello/card/define/trello-card.js");
Page.Include("/trello/list/define/trello-list-summary.element.js");

 
Page.State = "loading";
Page.SetTitle(User.trello.board.name)


document.querySelector("#btn-delete-board")!.
    addEventListener("click", async _ => {

        Page.WaitForConformation("Delete Board" , async () => {
            var dataloader = await new TrelloBoardApi().Delete(User.trello.board.id)
            console.log(dataloader.RawText);
        })

    })

const container = document.querySelector("trello-cards") as HTMLElement;
var dataL = await new TrelloCardApi().OfBoard(User.trello.board.id);

var items = dataL.ToList() as ITrelloCard[];
var cats = new Set(items.map(u => u.idList))
cats.forEach(k => {
    var h = document.createElement("trello-list-summary") as csTrelloListSummary;
    h.setAttribute("data-id", k)
    container.appendChild(h);

    items.filter(u => u.idList == k).forEach(crd => {
        var c = document.createElement("trello-card") as csTrelloCard;
        c.setAttribute("data-src", JSON.stringify(crd));
        h.appendChild(c);
    })

})

if(cats.size == 0) {
    new ContainerElement(container)
    .Image("/assets/trello/list.svg")
    .MessageBox("No *Content* Found")
}

Page.State = "load-complete";