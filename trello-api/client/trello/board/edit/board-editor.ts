import { InputClass } from "../../../app/input-form/lib/inputclass.js"

 
export class BoardEditor {
    txtWorkspaceName: InputClass
    txtBoardName: InputClass
    txtBoardDesc: InputClass
    
    btnSubmit: HTMLButtonElement;
    constructor() {
        this.txtWorkspaceName = new InputClass("#txt-workspace-name")!
        this.txtBoardName = new InputClass("#txt-board-name")!
        this.txtBoardDesc = new InputClass("#txt-board-desc")!
        
        this.btnSubmit = document.querySelector("#btn-submit-form")!
    }
}
