import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class AuthApi {

    async Info(token: string) {
        var cc = {
            link: `/1/tokens/${token}`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }


    //todo: Update  
}
