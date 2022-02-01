import { Page } from "../../../../app/page/page.js";
import { User } from "../../../../app/user/User.js";
import { TrelloMemberApi } from "../../../api/member-api.js";

const input = document.getElementById("txt-new-member") as HTMLInputElement;
const selector = document.getElementById("select-access-mode") as HTMLSelectElement;
const button = document.getElementById("btn-add-new-member") as HTMLButtonElement;

["txt-board-id", "txt-board-name"].forEach((name, i) => {
    document.querySelector(`#${name}`)!.textContent =
        [User.trello.board.id, User.trello.board.name][i]
})


button.addEventListener("click", async _ => {
    document.body.classList.add("loading");
    var connector = new TrelloMemberApi();
    var boardid = User.trello.board.id;
    var memberid = input.value;
    var mode = selector.value as "admin" | "normal" | "observer";
    console.log(mode);
    
    var ki = await connector.AddMemberToBoard(boardid, memberid, mode);
 
    Page.log("add member" , ki )

    if(ki.HasList){
        console.log(" [" , ki.RawText);
    }

    if(ki.HasItem){
        console.log(" {" , ki.RawText);
    }

    console.log(" Error" , ki.RawText);
})
