import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class TrelloCardApi {
    async getItem(cardid) {
        var cc = {
            link: `/1/cards/${cardid}`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async OfMember(memberid) {
        var cc = {
            link: `/1/members/${memberid}/cards`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async OfBoard(boardid) {
        var cc = {
            link: `/1/boards/${boardid}/cards`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async OfList(listid) {
        var cc = {
            link: `/1/lists/${listid}/cards`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async AddCard(ListID, options) {
        var cc = {
            link: `/1/cards?idList=${ListID}&name=${options.name}&desc=${options.desc}`,
            method: "post"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Delete(cardid) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=card-api.js.map