import { Page } from "../../../app/page/page.js";
import { TrelloBoardApi } from "../../api/board-api.js";
import { TrelloCardApi } from "../../api/card-api.js";
import { CardUpdateApi } from "../../api/card-update.api.js";
import { CardEditorEditor } from "./cardeditor-editor.js";
import { ListComboBox } from "./lib/ListComboBox.js";
const form = new CardEditorEditor();
var cmbBoard = form.txtBoardName.Element;
var cmbList = form.txtListName.Element;
//>> Assign Data
window.addEventListener('message', async (event) => {
    var pass = event.data;
    //>> Set Page State
    if (pass.command == "set-state" && pass.value == "loading") {
        Page.State = "loading";
    }
    //>> Set Date time
    if (pass.command == "set-date") {
        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        form.txtDueDate.Text = `${pass.value}T${now.toISOString().slice(0, 16).split("T")[1]}`;
        document.querySelector("#field-due-date")?.classList.remove("in-active");
        form.txtTitle.Element.focus();
    }
    //>> Loading Data
    if (pass.command == "set-data" && pass.value == "manual") {
        //>>> Set Boards
        var boardAdp = await new TrelloBoardApi().ofMember(Page.Param("member-id"));
        if (boardAdp.HasList) {
            var boards = boardAdp.ToListOf();
            boards.forEach(itm => {
                var g = document.createElement("option");
                g.value = itm.id;
                g.text = itm.name;
                g.selected = itm.name == "Personal Calendar";
                cmbBoard.add(g);
            });
            var df = boards.filter(u => u.name == "Personal Calendar");
            if (df.length > 0) {
                new ListComboBox(cmbList).Default("Calendar Events").Display(df[0].id);
            }
            Page.State = "load-complete";
        }
        //    
        //     var cboard = "", clist = "";
        //     if (boards.length > 0) {
        //         console.log("Found Board");
        //         var lists = await new ListApi().OfBoard(cboard);
        //         if (lists.HasList) {
        //             var LC = lists.ToListOf<ITrelloList>().filter(h => h.name == "Calendar Events");
        //             console.log("Total List on  Board", LC.length);
        //             if (LC.length > 0) clist = LC[0].id
        //         }
        //     }
        //     if (boards.length == 0) {
        //         var k = await new TrelloBoardApi().Add("personal", { name: "Personal Calendar", desc: "Personal Calendar Events" })
        //         if (k.HasItem) cboard = k.ItemOf<ITrelloBoard>().id;
        //     }
        //     if (clist.length == 0) {
        //         var chi = await new ListApi().Add(cboard, "Calendar Events")
        //         if (chi.HasItem) clist = chi.ItemOf<ITrelloList>().id;
        //     }
    }
});
//form.txtDueDate.Text =  ;
// form.txtTitle.Text =  ;
// form.txtAbout.Text =  ;
// form.txtListName.Text =  ;
// form.txtBoardName.Text =  ;
// form.txtWorkspaceName.Text =  ;
//>> Handle Submit
form.btnSubmit.addEventListener("click", async (_) => {
    //> Loading
    document.body.classList.add("loading");
    var x1 = await new TrelloCardApi().AddCard(cmbList.value, {
        name: form.txtTitle.Text,
        desc: form.txtAbout.Text
    });
    if (x1.HasItem) {
        var itm = x1.ItemOf();
        var dtav = form.txtDueDate.Element.valueAsNumber + new Date().getTimezoneOffset() * 60 * 1000;
        var date1 = new Date(dtav).toISOString();
        await new CardUpdateApi().UpdateDue(itm.id, date1);
        window.location.reload();
    }
    //> Submit Data
    console.log(form.txtBoardName.Text);
    //> Reload
    //window.location.replace("/")
});
cmbBoard.addEventListener("change", _ => {
    new ListComboBox(cmbList).Default("Calendar Events").Display(cmbBoard.value);
});
//# sourceMappingURL=index.html.js.map