import { InputClass } from "../../../app/input-form/lib/inputclass.js";

export class WorkspaceEditor {
    txtDisplayName: InputClass
    txtWorkspaceId: InputClass
    txtWorkspaceWebsite: InputClass
    txtWorkspaceDesc: InputClass
    
    btnSubmit: HTMLButtonElement;
    constructor() {
        this.txtDisplayName = new InputClass("#txt-workspace-name")!
        this.txtWorkspaceId = new InputClass("#txt-workspace-shortname")!
        this.txtWorkspaceWebsite = new InputClass("#txt-workspace-website")!
        this.txtWorkspaceDesc = new InputClass("#txt-workspace-desc")!
        
        this.btnSubmit = document.querySelector("#btn-submit-form")!
    }
}
