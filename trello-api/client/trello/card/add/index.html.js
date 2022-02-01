import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { TrelloCardApi } from "../../api/card-api.js";
import { ListApi } from "../../api/list-api.js";
import { CardEditor } from "./card-editor.js";
const form = new CardEditor();
//>> Assign Data
if (User.trello.list.selected) {
    form.txtListName.Text = User.trello.list.name;
}
else
    form.txtListName.Element.removeAttribute("readonly");
// form.txtCardName.Text =  ;
// form.txtCardDesc.Text =  ;
//>> Handle Submit
form.btnSubmit.addEventListener("click", async (_) => {
    //> Loading
    document.body.classList.add("loading");
    var clist = "";
    if (User.trello.list.selected)
        clist = User.trello.list.id;
    if (clist.length == 0) {
        var k = await new ListApi().Add(User.trello.board.id, form.txtListName.Text);
        if (k.ResponseType == "item") {
            var dta = k.data;
            //> Submit Data
            clist = dta.id;
        }
        else
            return;
    }
    //> Submit Data
    var kr = await new TrelloCardApi().AddCard(clist, { name: form.txtCardName.Text, desc: form.txtCardDesc.Text });
    if (kr.ResponseType == "item") {
        var se = kr.data;
        User.SetAndUpdate("card", se.id, se.name);
        //> Reload
        Page.Navigation.Navigate("trello-card-view");
    }
});
//# sourceMappingURL=index.html.js.map