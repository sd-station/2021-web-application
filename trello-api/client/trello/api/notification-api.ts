import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class NotificationApi {

    async OfMember(id:string) {
        var cc = {
            link: "/1/members/{id}/notifications",
            param: { id: id },
        } as TConnect

        var dataloader = new TrelloConnect(cc);
        await dataloader.LoadData();

        return dataloader;
    }


    ///todo: Add Mark As Read
}
