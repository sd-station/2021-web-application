import { InputClass } from "../../../app/input-form/lib/inputclass.js"

export class CheckListEditor {
    txtCardTitle: InputClass;
    txtListTitle: InputClass;
    txtListTasks: InputClass;
    btnSubmit: HTMLButtonElement;
    constructor() {
        this.txtCardTitle = new InputClass("#txt-card-title");
        this.txtListTitle = new InputClass("#txt-list-title")!
        this.txtListTasks = new InputClass("#txt-list-text")!
        this.btnSubmit = document.querySelector("#btn-submit-form")!
    }
}
