import { AuthClass, AccountDataHandler } from "../../../app.auth/api/handler/AuthHandler";
import { IDataSelection, TrelloDataSelection, TSAU } from "./data-selection-trello";
 

export class AccountDataSelection   {
    me?:AuthClass;
    Any() :boolean {
      return  new AccountDataHandler().List.length > 0
    }
    save(info: { key: string; token: string; }) {
        new AccountDataHandler().Add(info)
    }

    
    
}

export class DataSelectionClass {
    trello: TrelloDataSelection;
    account: AccountDataSelection;

    constructor() {
        this.trello = new TrelloDataSelection();
        this.account = new AccountDataSelection();
    }

    Update() {
        const event = new Event('OnSelectionUpdate');
        // Dispatch the event.
        window.parent.dispatchEvent(event);

        this.UpdateTitle();

    }

    UpdateTitle(){

        var txt = [];

        if(this.trello.workspace.selected) txt.push(this.trello.workspace.name)
        if(this.trello.board.selected) txt.push(this.trello.board.name)
        //if(this.trello.workspace.selected) txt.push(this.trello.workspace.name)

        document.title = txt.join(" / ")
    }

    SaveAndUpdate(change: TSAU) {

        if (change == "auth") {
            this.trello.workspace.Clear();
            this.trello.board.Clear();
            this.trello.list.Clear();
            this.trello.card.Clear();
        }
        if (change == "workspace") {

            this.trello.board.Clear();
            this.trello.list.Clear();
            this.trello.card.Clear();
        }
        if (change == "board") {
            this.trello.list.Clear();
            this.trello.card.Clear();
        }
        if (change == "list") {
             this.trello.card.Clear();
        }

        localStorage.setItem("user-selection-trello", JSON.stringify(this.trello));
        this.Update();
    }

    LoadAndUpdate() {
        var olddata = localStorage.getItem("user-selection-trello")
        if (olddata) {
            console.log(olddata);

            var dta = JSON.parse(olddata);


            Object.keys(dta).forEach(itm => {
              
                var sitem = dta[itm] as IDataSelection;

                if (sitem.id.length > 0) {
                    this.trello[itm].id = sitem.id;
                    this.trello[itm].name = sitem.name;
                }

            });

            this.trello.app.id = "4525dacfc9f7344c608461dfe0637059"
            this.trello.app.name = "Sky Desk"
        }

        this.UpdateTitle();

    }


}