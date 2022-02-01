import { INSpaceTask } from "n-space";
import { ITrelloCheckItem } from "trello-check-list-api";
import { excoder } from "../../data/encoder/encoder.js";
import { User } from "../../app/user/User.js";
import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class CheckItemApi {
    async Delete(checklist: string, checkitem: string) {
        var cc = {
            link: `/1/checklists/${checklist}/checkItems/${checkitem}`,
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async AddCheckItem(checklistid: string, param: { name: string; }) {
        var cc = {
            link: `/1/checklists/${checklistid}/checkItems?name=${param.name}`,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }


    async UpdateItem(CardId: string, CheckItemID: string,otp: {name: string}) {
         
        var cc = {
            link: `/1/cards/${CardId}/checkItem/${CheckItemID}?name=${otp.name}`,
            method: "put"
        } as TConnect
        return await new TrelloConnect(cc).LoadData();
    }

    async CheckUpdate(CardId: string, CheckItemID: string, ischecked: boolean) {
        const paramState = ischecked ? "complete" : "incomplete";
        var cc = {
            link: `/1/cards/${CardId}/checkItem/${CheckItemID}?state=${paramState}`,
            method: "put"
        } as TConnect
        return await new TrelloConnect(cc).LoadData();
    }

    
    async Duplicate(CardId: string, checklistid: string, CheckItemID: string, text: string) {

        //"60f1336d7e3f292214eb3e85" 

        var k = { create: new Date().getTime(), text: text } as INSpaceTask

        var data = new excoder().encodedstring(JSON.stringify(k));
 
        var at = { name: data }
        var cc = {
            link: `https://api.trello.com/1/checklists/${checklistid}/checkItems?&key=${User.trello.app.id}&token=${User.trello.auth.id}`,
            method: "put"
        } as TConnect

        const aR = await fetch(cc.link, {
            method: "Post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(at)
        });
        var ResponseText = await aR.text()



        console.log("RR", ResponseText);

        return JSON.parse(ResponseText) as ITrelloCheckItem

        // return await new TrelloConnect(cc).LoadData();
    }


   


}
