import { InputClass } from "../../../app/input-form/lib/inputclass.js"

export class CardEditorEditor {
    txtDueDate: InputClass
    txtTitle: InputClass
    txtAbout: InputClass
    txtListName: InputClass
    txtBoardName: InputClass
    txtWorkspaceName: InputClass
    
    btnSubmit: HTMLButtonElement;
    constructor() {
        this.txtDueDate = new InputClass("#txt-due-date")!
        this.txtTitle = new InputClass("#txt-title")!
        this.txtAbout = new InputClass("#txt-about")!
        this.txtListName = new InputClass("#txt-list-name")!
        this.txtBoardName = new InputClass("#txt-board-name")!
        this.txtWorkspaceName = new InputClass("#txt-workspace-name")!
        
        this.btnSubmit = document.querySelector("#btn-submit-form")!
    }
}
