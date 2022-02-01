import { InputClass } from "../../../app/input-form/lib/inputclass.js";
export class AttachmentEditor {
    btnSelectImage;
    InputFile;
    btnCancelUpload;
    btnSubmit;
    constructor() {
        this.btnSelectImage = document.querySelector("#btn-select-image");
        this.btnCancelUpload = document.querySelector("#btn-cancel-request");
        this.InputFile = new InputClass("#input-file-browser");
        this.btnSubmit = document.querySelector("#btn-submit-form");
    }
}
//# sourceMappingURL=attachment-editor.js.map