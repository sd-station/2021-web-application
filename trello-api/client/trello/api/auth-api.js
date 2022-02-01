import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class AuthApi {
    async Info(token) {
        var cc = {
            link: `/1/tokens/${token}`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=auth-api.js.map