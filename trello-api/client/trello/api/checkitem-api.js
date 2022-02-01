import { excoder } from "../../data/encoder/encoder.js";
import { User } from "../../app/user/User.js";
import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class CheckItemApi {
    async Delete(checklist, checkitem) {
        var cc = {
            link: `/1/checklists/${checklist}/checkItems/${checkitem}`,
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async AddCheckItem(checklistid, param) {
        var cc = {
            link: `/1/checklists/${checklistid}/checkItems?name=${param.name}`,
            method: "post"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async UpdateItem(CardId, CheckItemID, otp) {
        var cc = {
            link: `/1/cards/${CardId}/checkItem/${CheckItemID}?name=${otp.name}`,
            method: "put"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async CheckUpdate(CardId, CheckItemID, ischecked) {
        const paramState = ischecked ? "complete" : "incomplete";
        var cc = {
            link: `/1/cards/${CardId}/checkItem/${CheckItemID}?state=${paramState}`,
            method: "put"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Duplicate(CardId, checklistid, CheckItemID, text) {
        //"60f1336d7e3f292214eb3e85" 
        var k = { create: new Date().getTime(), text: text };
        var data = new excoder().encodedstring(JSON.stringify(k));
        var at = { name: data };
        var cc = {
            link: `https://api.trello.com/1/checklists/${checklistid}/checkItems?&key=${User.trello.app.id}&token=${User.trello.auth.id}`,
            method: "put"
        };
        const aR = await fetch(cc.link, {
            method: "Post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(at)
        });
        var ResponseText = await aR.text();
        console.log("RR", ResponseText);
        return JSON.parse(ResponseText);
        // return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=checkitem-api.js.map