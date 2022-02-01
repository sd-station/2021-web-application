import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class CheckListApi {
    async OfCard(CardId) {
        var cc = {
            link: `/1/cards/${CardId}/checklists`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Add(cardid, param) {
        var cc = {
            link: `/1/cards/${cardid}/checklists?name=${param.title}`,
            method: "post"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=checklist-api.js.map