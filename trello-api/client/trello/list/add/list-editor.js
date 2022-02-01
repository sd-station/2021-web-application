import { InputClass } from "../../../app/input-form/lib/inputclass.js";
export class ListEditor {
    txtBoardName;
    txtListName;
    btnSubmit;
    constructor() {
        this.txtBoardName = new InputClass("#txt-board-name");
        this.txtListName = new InputClass("#txt-list-name");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=list-editor.js.map