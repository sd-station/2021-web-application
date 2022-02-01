
import { User } from "../../app/user/User.js";
import { ListPageIndex } from "./listpage.index.js"


document.querySelector("#work-space-title")!.textContent =
    User.trello.workspace.name;
document.querySelector("#board-title")!.textContent =
    User.trello.board.name;

document.body.classList.add("loading");

var pagehandler = new ListPageIndex();
pagehandler.displaydata();


var btnshowall = document.querySelector("#btn-show-all")!;
btnshowall.addEventListener("click", _ => {
    pagehandler.displaydata(true)
})






