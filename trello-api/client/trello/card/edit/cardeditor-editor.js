import { InputClass } from "../../../app/input-form/lib/inputclass.js";
export class CardEditorEditor {
    txtDueDate;
    txtTitle;
    txtAbout;
    txtListName;
    txtBoardName;
    txtWorkspaceName;
    btnSubmit;
    constructor() {
        this.txtDueDate = new InputClass("#txt-due-date");
        this.txtTitle = new InputClass("#txt-title");
        this.txtAbout = new InputClass("#txt-about");
        this.txtListName = new InputClass("#txt-list-name");
        this.txtBoardName = new InputClass("#txt-board-name");
        this.txtWorkspaceName = new InputClass("#txt-workspace-name");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=cardeditor-editor.js.map