import { InputClass } from "../../../../app/input-form/lib/inputclass.js";
export class WorkspaceEditor {
    txtWorkspaceName;
    txtWorkspaceId;
    txtWorkspaceWebsite;
    txtWorkspaceDesc;
    btnSubmit;
    constructor() {
        this.txtWorkspaceName = new InputClass("#txt-workspace-name");
        this.txtWorkspaceId = new InputClass("#txt-workspace-shortname");
        this.txtWorkspaceWebsite = new InputClass("#txt-workspace-website");
        this.txtWorkspaceDesc = new InputClass("#txt-workspace-desc");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=workspace-editor.js.map