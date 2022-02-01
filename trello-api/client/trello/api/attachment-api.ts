import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"


export class AttachmentApi {

    async OfCard(cardid: string) {
        var cc = {
            link: `/1/cards/${cardid}/attachments`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async Delete(cardid: string, attachmentid: string) {
        var cc = {
            link: `/1/cards/{id}/attachments/{idAttachment}`,
            param: { id: cardid, idAttachment: attachmentid },
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    ///todo: Add Attachment
}
