import { InputClass } from "../../../app/input-form/lib/inputclass.js"

export class AttachmentEditor {
    btnSelectImage: HTMLButtonElement;
    InputFile: InputClass;
    btnCancelUpload: HTMLButtonElement ;
    btnSubmit: HTMLButtonElement;
    constructor() {
        this.btnSelectImage = document.querySelector("#btn-select-image")!;
        this.btnCancelUpload = document.querySelector("#btn-cancel-request")!;
        this.InputFile = new InputClass("#input-file-browser")
        this.btnSubmit = document.querySelector("#btn-submit-form")!
    }
}
