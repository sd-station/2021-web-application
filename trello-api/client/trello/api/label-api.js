import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class LabelApi {
    async ofBoard(boardid) {
        var cc = {
            link: `/1/boards/${boardid}/labels`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=label-api.js.map