import { InputClass } from "../app/input-form/lib/inputclass.js"


export class PageEditor {

    txtFileName: InputClass;
    btnSubmit: HTMLButtonElement;
    txtDocument: InputClass;
    constructor() {
        this.txtFileName = new InputClass("#txt-filename")
        this.txtDocument = new InputClass("#txt-document")

        this.btnSubmit = document.querySelector("#btn-submit")!
    }
}
