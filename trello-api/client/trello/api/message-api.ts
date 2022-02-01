import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class MessageApi {
  
    async ofCard(CardId: string) {
        var cc = {
            link: `/1/cards/${CardId}/actions`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();

    }

    async Add(cardid: string, text: string) {
        var cc = {
            link: `/1/cards/${cardid}/actions/comments?text=${encodeURIComponent(text)}`,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

     
    
    
    async Update(cardid: string, actionid:string , opt:{text: string}) {
        var cc = {
            link: `/1/cards/${cardid}/actions/${actionid}/comments?text=${encodeURIComponent(opt.text)}`,
            method: "put"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async Delete(messageid: string) {
        var cc = {
            link: `/1/actions/${messageid}`,
            method :"delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
}
