import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { TrelloMemberApi } from "../../api/member-api.js";
import { UserEditorEditor } from "./usereditor-editor.js";
const form = new UserEditorEditor();
var data = await new TrelloMemberApi().GetItem(User.trello.member.id);
if (data.HasItem) {
    var m = data.ItemOf();
    //>> Assign Data
    form.txtFullName.Text = m.fullName;
    form.txtVerify.Text = m.confirmed ? "Verified" : "Not Verified";
    form.txtUsername.Text = m.username;
    form.txtInital.Text = m.initials;
    form.txtbio.Text = m.bio;
    Page.log("data", data);
    //>> Handle Submit
    form.btnSubmit.addEventListener("click", async (_) => {
        //> Loading
        var options = {};
        if (form.txtFullName.Text != m.fullName)
            options["fullName"] = form.txtFullName.Text;
        if (form.txtUsername.Text != m.username)
            options["username"] = form.txtUsername.Text;
        if (form.txtInital.Text != m.initials)
            options["initials"] = form.txtInital.Text;
        if (form.txtbio.Text != m.bio)
            options["bio"] = form.txtbio.Text;
        if (Object.keys(options).length == 0)
            return;
        //> Submit Data
        var update = await new TrelloMemberApi().UpdateMemberInfo(User.trello.member.id, options);
        if (update.HasText) {
            console.warn(update.RawText);
            Page.State = "load-complete";
            return;
        }
        //> Reload
        //window.location.replace("/")
    });
}
//# sourceMappingURL=index.html.js.map