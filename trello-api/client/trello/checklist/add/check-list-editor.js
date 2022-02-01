import { InputClass } from "../../../app/input-form/lib/inputclass.js";
export class CheckListEditor {
    txtCardTitle;
    txtListTitle;
    txtListTasks;
    btnSubmit;
    constructor() {
        this.txtCardTitle = new InputClass("#txt-card-title");
        this.txtListTitle = new InputClass("#txt-list-title");
        this.txtListTasks = new InputClass("#txt-list-text");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=check-list-editor.js.map