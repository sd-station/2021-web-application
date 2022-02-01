import { ITrelloBoard } from "trello-api";
import { Page } from "../../../app/page/page.js"
import { ShowDataDetails } from "../../../app/ui/show-data-details.js"
import { TrelloBoardApi } from "../../api/board-api.js"
import { csTrelloBoard } from "../../board/define/trello-board.js"
import { csTrelloWorkspaceSummary } from "../../workspace/define/trello-workspace-summary.element.js"

 

Page.Include("/trello/workspace/define/trello-workspace-summary.element")
Page.Include("/trello/board/define/trello-board")
var link = "";


document.body.classList.add("loading");
const container = document.querySelector("item-container") as HTMLElement;

var dataloader = await new TrelloBoardApi().ofMember("me")

var data = dataloader.ToList() as ITrelloBoard[];

new Set(data.map(b => b.idOrganization))
    .forEach(cat => {
        var h = document.createElement("trello-workspace-summary") as csTrelloWorkspaceSummary;

        var disp = "personal";
        if(cat != null){
            disp = cat
        } 


        h.setAttribute("data-id", disp)

        container.appendChild(h);

        data.filter(k => k.idOrganization == cat).forEach(brd => {
            var c = document.createElement("trello-board") as csTrelloBoard;
            c.setAttribute("data-src", JSON.stringify(brd))
            container.appendChild(c);
        })
    })


    Page.log("Data" ,dataloader )

 

document.body.classList.remove("loading");
