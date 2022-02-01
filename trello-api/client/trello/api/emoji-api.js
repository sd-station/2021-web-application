import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class EmojiApi {
    async All() {
        var cc = {
            link: `/1/emoji`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//** USELESS */
//# sourceMappingURL=emoji-api.js.map