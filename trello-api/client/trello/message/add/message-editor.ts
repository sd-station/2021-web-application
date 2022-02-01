import { InputClass } from "../../../app/input-form/lib/inputclass.js"

export class MessageEditor {
    txtCardTitle: InputClass;
    txtMessageText: InputClass;
 
    btnSubmit: HTMLButtonElement;
    constructor() {
        this.txtCardTitle = new InputClass("#txt-card-title");
        this.txtMessageText = new InputClass("#txt-message-text")!
         this.btnSubmit = document.querySelector("#btn-submit-form")!
    }
}
