import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class EmojiApi{
    async All( ) {
        var cc = {
            link: `/1/emoji`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
   
    }
}

//** USELESS */
