import { ITrelloList } from "trello-list-api";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { ListApi } from "../../api/list-api.js";
import { ListEditor } from "./list-editor.js";

const form = new ListEditor();

//>> Assign Data
form.txtBoardName.Text = User.trello.board.name;
// form.txtListName.Text =  ;

//>> Handle Submit
form.btnSubmit.addEventListener("click", async _ => {
    //> Loading
    document.body.classList.add("loading")

    //> Submit Data
    var kr = await new ListApi().Add(User.trello.board.id, form.txtListName.Text);


    if (kr.ResponseType == "item") {
        var itm = kr.data as ITrelloList;
        User.trello.list.id = itm.id;
        User.trello.list.name = itm.name;
        User.SaveAndUpdate("list");
        Page.Navigation.Navigate("trello/list/view")
    }


})
