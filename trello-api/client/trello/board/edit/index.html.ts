import { ITrelloBoard } from "trello-api";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { TrelloBoardApi } from "../../api/board-api.js";
import { BoardEditor } from "./board-editor.js";

const form = new BoardEditor();

//>> Assign Data
form.txtWorkspaceName.Text = User.trello.workspace.name;

if (Page.Param("mode") == "edit") {

    var data = await new TrelloBoardApi().GetItem(Page.Param("project-id"));

    if (data.ResponseType == "item") {
        var prj = data.ItemOf<ITrelloBoard>()
        form.txtBoardName.Text = prj.name;
        form.txtBoardDesc.Text = prj.desc;





        //>> Handle Submit
        form.btnSubmit.addEventListener("click", async _ => {
            //> Loading
            document.body.classList.add("loading")

            //> Submit Data
            var dta = await new TrelloBoardApi()
                .Update(prj.id,
                    {
                        name: form.txtBoardName.Text,
                        desc: form.txtBoardDesc.Text
                    });
            if (dta.ResponseType == "item") {

                var itm = dta.data as ITrelloBoard;
                User.trello.board.id = itm.id
                User.trello.board.name = itm.name
                //> Reload
                Page.Navigation.Navigate("board/view")
            }

        })

    }
} else {


    //>> Handle Submit
    form.btnSubmit.addEventListener("click", async _ => {
        //> Loading
        document.body.classList.add("loading")

        //> Submit Data
        var dta = await new TrelloBoardApi()
            .Add(User.trello.workspace.id,
                {
                    name: form.txtBoardName.Text,
                    desc: form.txtBoardDesc.Text
                });
        if (dta.ResponseType == "item") {

            var itm = dta.data as ITrelloBoard;
            User.trello.board.id = itm.id
            User.trello.board.name = itm.name
            //> Reload
            Page.Navigation.Navigate("board/view")
        }

    })


}

