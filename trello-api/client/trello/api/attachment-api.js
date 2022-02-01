import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class AttachmentApi {
    async OfCard(cardid) {
        var cc = {
            link: `/1/cards/${cardid}/attachments`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Delete(cardid, attachmentid) {
        var cc = {
            link: `/1/cards/{id}/attachments/{idAttachment}`,
            param: { id: cardid, idAttachment: attachmentid },
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=attachment-api.js.map