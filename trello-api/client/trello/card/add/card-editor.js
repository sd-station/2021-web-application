import { InputClass } from "../../../app/input-form/lib/inputclass.js";
export class CardEditor {
    txtListName;
    txtCardName;
    txtCardDesc;
    btnSubmit;
    constructor() {
        this.txtListName = new InputClass("#txt-list-name");
        this.txtCardName = new InputClass("#txt-card-name");
        this.txtCardDesc = new InputClass("#txt-card-desc");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=card-editor.js.map