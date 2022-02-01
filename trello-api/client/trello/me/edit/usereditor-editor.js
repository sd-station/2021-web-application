import { InputClass } from "../../../app/input-form/lib/inputclass.js";
export class UserEditorEditor {
    txtFullName;
    txtVerify;
    txtUsername;
    txtInital;
    txtbio;
    btnSubmit;
    constructor() {
        this.txtFullName = new InputClass("#txt-full-name");
        this.txtVerify = new InputClass("#txt-verify");
        this.txtUsername = new InputClass("#txt-username");
        this.txtInital = new InputClass("#txt-inital");
        this.txtbio = new InputClass("#txt-bio");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=usereditor-editor.js.map