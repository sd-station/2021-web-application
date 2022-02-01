import { Page } from "../../../../app/page/page.js";
import { User } from "../../../../app/user/User.js";
import { WorkspaceApi } from "../../../api/workspace-api.js";
import { WorkspaceEditor } from "./workspace-editor.js";
const form = new WorkspaceEditor();
//>> Assign Data
// form.txtWorkspaceName.Text =  ;
//>> Handle Submit
form.btnSubmit.addEventListener("click", async (_) => {
    if (form.txtWorkspaceName.Text.trim().length == 0) {
        form.txtWorkspaceName.Element.focus();
        return;
    }
    form.btnSubmit.classList.add("onclic");
    //> Loading
    document.body.classList.add("loading");
    if (!User.Supported)
        return;
    var data = {};
    if (form.txtWorkspaceName.Text.length > 0)
        data.displayName = form.txtWorkspaceName.Text.trim();
    if (form.txtWorkspaceId.Text.length > 0)
        data.name = form.txtWorkspaceId.Text.trim();
    if (form.txtWorkspaceDesc.Text.length > 0)
        data.desc = form.txtWorkspaceDesc.Text.trim();
    if (form.txtWorkspaceWebsite.Text.length > 0)
        data.website = form.txtWorkspaceWebsite.Text.trim();
    //> Submit Data
    var loader = await new WorkspaceApi().Create(data);
    //> Reload
    form.btnSubmit.classList.remove("onclic");
    Page.State = "load-complete";
    Page.log("result", loader);
    if (loader.ResponseType == "item") {
        form.btnSubmit.classList.add("validate");
        var k = loader.data;
        User.SetAndUpdate("workspace", k.id, k.name);
        if (Page.Level == 3) {
            Page.Navigate("workspace/wizard/step-2");
        }
        else {
            Page.Navigate("workspace/view");
        }
    }
});
//# sourceMappingURL=index.html.js.map