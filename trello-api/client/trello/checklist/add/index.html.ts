import { ITrelloCheckList } from "trello-check-list-api";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { CheckItemApi } from "../../api/checkitem-api.js";
import { CheckListApi } from "../../api/checklist-api.js";
import { CheckListEditor } from "./check-list-editor.js";

await User.Loaded();

const form = new CheckListEditor();
form.txtCardTitle.Text = Page.Param("card-name")

form.btnSubmit.addEventListener("click", async _ => {
    document.body.classList.add("loading");

    const CardId = Page.Param("card-id");

    var connextor = await new CheckListApi().Add(CardId, { title: form.txtListTitle.Text });

    var p = connextor.data as ITrelloCheckList;

    var id = p.id

    var tasks = form.txtListTasks.Text.replaceAll("\r\n", "\n").split("\n")
        .filter(h => h.trim().length > 0).map(h => h.trim());

    for (let index = 0; index < tasks.length; index++) {
        var res = await new CheckItemApi()
            .AddCheckItem(id, { name: tasks[index] });

    }

    Page.Navigation.goback();

})