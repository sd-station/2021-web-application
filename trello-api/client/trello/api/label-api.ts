import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class LabelApi{
    async ofBoard(boardid:string) {
        var cc = {
            link: `/1/boards/${boardid}/labels`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
   
    }

    ///todo: Add New Label 
    ///todo: Update Label 
}
