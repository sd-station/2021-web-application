import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class CheckListApi {


    async OfCard(CardId: string) {
        var cc = {
            link: `/1/cards/${CardId}/checklists`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async Add(cardid: string, param: { title: string; }) {
        var cc = {
            link: `/1/cards/${cardid}/checklists?name=${param.title}`,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }


    //todo: Delete  
    //todo: Update  


}
