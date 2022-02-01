import { ITrelloWorkspace } from "trello-org-api";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { WorkspaceApi } from "../../api/workspace-api.js";
import { WorkspaceEditor } from "./workspace-editor.js";

const form = new WorkspaceEditor();

//>> Assign Data
  form.txtDisplayName.Text =  User.trello.workspace.name ;

//>> Handle Submit
form.btnSubmit.addEventListener("click", async _ => {
    form.btnSubmit.classList.add("onclic")

    //> Loading
    document.body.classList.add("loading")

    //> Submit Data
    var loader = await new WorkspaceApi().Update(
        User.trello.workspace.id ,
        {
            title: form.txtDisplayName.Text,
            name: form.txtWorkspaceId.Text.toLowerCase(),
            desc: form.txtWorkspaceDesc.Text,
            website: form.txtWorkspaceWebsite.Text
        }
        );

    //> Reload
    form.btnSubmit.classList.remove("onclic")
    form.btnSubmit.classList.add("validate")
    Page.State = "load-complete";

    Page.log("result", loader)

    // if(loader.Type == "item") {
    //     var k = loader.data as ITrelloWorkspace;
 
    //     User.Select("workspace" , k.id , k.name )
    //     Page.Navigate("workspace/view")
    // }
})
