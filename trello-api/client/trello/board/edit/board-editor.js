import { InputClass } from "../../../app/input-form/lib/inputclass.js";
export class BoardEditor {
    txtWorkspaceName;
    txtBoardName;
    txtBoardDesc;
    btnSubmit;
    constructor() {
        this.txtWorkspaceName = new InputClass("#txt-workspace-name");
        this.txtBoardName = new InputClass("#txt-board-name");
        this.txtBoardDesc = new InputClass("#txt-board-desc");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=board-editor.js.map