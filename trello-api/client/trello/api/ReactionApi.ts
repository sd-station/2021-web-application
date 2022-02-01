import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js";

export class ReactionApi {
   
  

    async OfComment(commentid: string) {
        var cc = {
            link: `/1/actions/${commentid}/reactions`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    /**
     * List a summary of all reactions for an action
     * @param commentid 
     * @returns 
     */
    async Summary(commentid: string) {

        var cc = {
            link: `/1/actions/${commentid}/reactionsSummary`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    /**
     * Get information for a reaction
     * @param commentid 
     * @param id 
     * @returns   
     */
    async Info(commentid: string, id: string) {
        var cc = {
            link: `/1/actions/${commentid}/reactions/${id}`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async AddReaction(ActionID: string, icon: string) {
        var cc = {
            link: `/1/actions/${ActionID}/reactions?unified=${icon}`,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async RemoveReaction(idAction: string, id: string) {
        var cc = {
            link: `/1/actions/${idAction}/reactions/${id}`,
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
}

var sum = [
    {
        "count": 2,
        "id": "610db9b8a210c76449c8a9cd:1F629",
        "firstReacted": "2021-08-08T08:24:44.000Z",
        "idEmoji": "1F629",
        "idModel": "610db9b8a210c76449c8a9cd",
        "idReaction": "610fbc379b3ae47874faa5fa",
        "emoji": {
            "unified": "1F629",
            "native": "😩",
            "name": "WEARY FACE",
            "skinVariation": null,
            "shortName": "weary"
        }
    },
    {
        "count": 2,
        "id": "610db9b8a210c76449c8a9cd:1F346",
        "firstReacted": "2021-08-07T11:34:45.000Z",
        "idEmoji": "1F346",
        "idModel": "610db9b8a210c76449c8a9cd",
        "idReaction": "610fbc3c9b3ae47874fac33f",
        "emoji": {
            "unified": "1F346",
            "native": "🍆",
            "name": "AUBERGINE",
            "skinVariation": null,
            "shortName": "eggplant"
        }
    },
    {
        "count": 2,
        "id": "610db9b8a210c76449c8a9cd:1F352",
        "firstReacted": "2021-08-07T11:34:35.000Z",
        "idEmoji": "1F352",
        "idModel": "610db9b8a210c76449c8a9cd",
        "idReaction": "610fbc439b3ae47874faf3c7",
        "emoji": {
            "unified": "1F352",
            "native": "🍒",
            "name": "CHERRIES",
            "skinVariation": null,
            "shortName": "cherries"
        }
    }
]