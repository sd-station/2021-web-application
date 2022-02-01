import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class MessageApi {
    async ofCard(CardId) {
        var cc = {
            link: `/1/cards/${CardId}/actions`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Add(cardid, text) {
        var cc = {
            link: `/1/cards/${cardid}/actions/comments?text=${encodeURIComponent(text)}`,
            method: "post"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Update(cardid, actionid, opt) {
        var cc = {
            link: `/1/cards/${cardid}/actions/${actionid}/comments?text=${encodeURIComponent(opt.text)}`,
            method: "put"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Delete(messageid) {
        var cc = {
            link: `/1/actions/${messageid}`,
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=message-api.js.map