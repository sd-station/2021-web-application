import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js"
import { WorkspaceApi } from "../../api/workspace-api.js";



Page.SetTitle(User.trello.workspace.name);

var btndel = document.querySelector("#btn-delete-workspace")!;
btndel.addEventListener("click", async _ => {
    
    var k = Page.AcceptDialog("are you sure to delete ?")
    if (k) {
        Page.State = "loading";
        var t = await new WorkspaceApi().Delete(User.trello.workspace.id);
        
        Page.State = "load-complete";
        
        
        Page.Navigate("workspace")
    }
    
    
})
  document.querySelectorAll("[data-action]").forEach(da =>{
      da.addEventListener("click" , _=>{
          var command = da.getAttribute("data-action");

          if(command == "workspace/rename"){
              window.location.assign("/trello/workspace/edit/index.html")
          }
      })
  })