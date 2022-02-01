import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class ListApi {
    async ClosedOfBoard(id) {
        var cc = {
            link: "/1/boards/{id}/lists/{filter}",
            param: { id: id, filter: "all" },
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async OfBoard(id) {
        var cc = {
            link: "/1/boards/{id}/lists",
            param: { id: id },
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Archive(listid) {
        var cc = {
            link: `/1/lists/${listid}/closed`,
            query: {
                value: "true"
            },
            method: "put"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async GetItem(id) {
        var cc = {
            link: "/1/lists/{id}",
            param: { id: id },
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Add(boardid, name) {
        var cc = {
            link: `/1/boards/${boardid}/lists?name=${name}`,
            method: "post"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=list-api.js.map