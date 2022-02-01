import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class NotificationApi {
    async OfMember(id) {
        var cc = {
            link: "/1/members/{id}/notifications",
            param: { id: id },
        };
        var dataloader = new TrelloConnect(cc);
        await dataloader.LoadData();
        return dataloader;
    }
}
//# sourceMappingURL=notification-api.js.map