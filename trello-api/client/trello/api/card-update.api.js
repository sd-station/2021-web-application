import { User } from "../../app/user/User.js";
import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class CardUpdateApi {
    async UpdateInfo(cardid, name, desc) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                name: name,
                desc: desc
            }
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async UpdateClose(cardid, closed) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                closed: closed
            }
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async UpdateStart(cardid, start) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                start: start
            }
        };
        if (start == null) {
            cc.link = `/1/cards/${cardid}?start=null`;
            console.log("cancel start");
        }
        return await new TrelloConnect(cc).LoadData();
    }
    async UpdateDue(cardid, due) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                due: due
            }
        };
        if (due == null) {
            cc.link = `/1/cards/${cardid}?due=null`;
            console.log("cancel due");
        }
        return await new TrelloConnect(cc).LoadData();
    }
    async UpdateDueComplete(cardid, dueComplete) {
        var cc = {
            link: `https://api.trello.com/1/cards/${cardid}?dueComplete=${dueComplete}&key=${User.trello.app.id}&token=${User.trello.auth.id}`,
            method: "put",
        };
        const aR = await fetch(cc.link, {
            method: "PUT",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(at)
        });
        var ResponseText = await aR.text();
        if (ResponseText.startsWith("{"))
            ResponseText = JSON.stringify(JSON.parse(ResponseText).cover);
        console.log(ResponseText);
    }
    async UpdateCover(cardid, cover, brightness) {
        var at = {
            cover: {
                "color": cover
            }
        };
        var cc = {
            link: `https://api.trello.com/1/cards/${cardid}?key=${User.trello.app.id}&token=${User.trello.auth.id}`,
            method: "put",
        };
        const aR = await fetch(cc.link, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(at)
        });
        var ResponseText = await aR.text();
        if (ResponseText.startsWith("{"))
            ResponseText = JSON.stringify(JSON.parse(ResponseText).cover);
        console.log(ResponseText);
    }
}
//# sourceMappingURL=card-update.api.js.map