import { Page } from "../../app/page/page.js";
import { ContainerElement } from "../../app/ui/default/default-element.js";
import { ShowDataDetails } from "../../app/ui/show-data-details.js";
import { User } from "../../app/user/User.js";
import { ListApi } from "../api/list-api.js";
import { Trello } from "../helper/trello-helper.js";
export class ListPageIndex {
    container = document.querySelector("item-container");
    content = document.querySelector("template").innerHTML;
    async displaydata(showall = false) {
        this.container.innerHTML = "";
        var data = [];
        var board;
        if (showall) {
            board = await new ListApi().ClosedOfBoard(User.trello.board.id);
            data = board.ToList();
        }
        else {
            board = await new ListApi().OfBoard(User.trello.board.id);
            data = board.ToList();
        }
        //await  new TrelloConnectBoards().GetList();
        data.forEach(element => {
            this.showElement(element);
        });
        if (data.length == 0) {
            new ContainerElement(this.container)
                .Image("/assets/trello/list.svg")
                .MessageBox("No *List* Found");
        }
        new ShowDataDetails()
            .DisplayDetails("code", data)
            .DisplayLisk(board.link);
        document.body.classList.remove("loading");
    }
    showElement(data) {
        var itm = document.createElement("trello-list");
        itm.innerHTML = this.content.replace("{{title}}", data.name);
        this.container.appendChild(itm);
        if (data.closed)
            itm.classList.add("state-archived");
        itm.addEventListener("click", _ => {
            User.trello.list.id = data.id;
            User.trello.list.name = data.name;
            User.SaveAndUpdate("list");
            Page.Navigation.NavigateTo(Trello.list.page.view);
        });
    }
}
//# sourceMappingURL=listpage.index.js.map