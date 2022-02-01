import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class ListApi {
    async ClosedOfBoard(id: string)  {
        var cc = {
            link: "/1/boards/{id}/lists/{filter}",
            param: { id: id, filter: "all" },
        } as TConnect
        return await new TrelloConnect(cc).LoadData();
    }
    async OfBoard(id: string) {
        var cc = {
            link: "/1/boards/{id}/lists",
            param: { id: id },
        } as TConnect
        return await new TrelloConnect(cc).LoadData();
    }

    async Archive(listid: string) {
        var cc = {
            link: `/1/lists/${listid}/closed`,
            query: {
                value: "true"
            },
            method: "put"
        } as TConnect
        return await new TrelloConnect(cc).LoadData();
    }
    async GetItem(id: string) {
        var cc = {
            link: "/1/lists/{id}",
            param: { id: id },
        } as TConnect
        return await new TrelloConnect(cc).LoadData();
    }


    async Add(boardid: string, name: string) {
        var cc = {
            link: `/1/boards/${boardid}/lists?name=${name}`,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    //todo: Delete  
    //todo: Update  
}
