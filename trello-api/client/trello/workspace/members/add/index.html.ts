import { Page } from "../../../../app/page/page.js";
import { User } from "../../../../app/user/User.js";
import { TrelloMemberApi } from "../../../api/member-api.js";

const input = document.getElementById("txt-new-member") as HTMLInputElement;
const selector = document.getElementById("select-access-mode") as HTMLSelectElement;
const button = document.getElementById("btn-add-new-member") as HTMLButtonElement;

["txt-workspace-id", "txt-workspace-name"].forEach((name, i) => {
    document.querySelector(`#${name}`)!.textContent =
        [User.trello.workspace.id, User.trello.workspace.name][i]
})


button.addEventListener("click", async _ => {
    document.body.classList.add("loading");
    var connector = new TrelloMemberApi();
    var workspaceid = User.trello.workspace.id;
    var memberid = input.value;
    var mode = selector.value as "admin" | "normal" ;
    console.log(mode);
    
    var ki = await connector.AddMemberToWorkspace(workspaceid, memberid, mode);
 
    Page.log("add member" , ki )

    if(ki.HasList){
        console.log(" [" , ki.RawText);
    }

    if(ki.HasItem){
        console.log(" {" , ki.RawText);
    }

    console.log(" Error" , ki.RawText);
})
