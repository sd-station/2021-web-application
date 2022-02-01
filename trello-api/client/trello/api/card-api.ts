import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class TrelloCardApi {
  
    async getItem(cardid: string) {
        var cc = {
            link: `/1/cards/${cardid}`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }






    async OfMember(memberid: string) {
        var cc = {
            link: `/1/members/${memberid}/cards`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async OfBoard(boardid: string) {
        var cc = {
            link: `/1/boards/${boardid}/cards`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async OfList(listid: string) {
        var cc = {
            link: `/1/lists/${listid}/cards`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async AddCard(ListID: string, options: { name: string, desc: string }) {
        var cc = {
            link: `/1/cards?idList=${ListID}&name=${options.name}&desc=${options.desc}`,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

     
 


    async Delete(cardid: string) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

}
