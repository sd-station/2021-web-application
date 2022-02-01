import { User } from "../../app/user/User.js";
import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js";

export class CardUpdateApi {

    async UpdateInfo(cardid: string, name: string, desc: string) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                name: name,
                desc: desc
            }
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async UpdateClose(cardid: string, closed: boolean) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                closed: closed
            }
        } as TConnect
        return await new TrelloConnect(cc).LoadData();
    }
    async UpdateStart(cardid: string, start: string | null) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                start: start
            }
        } as TConnect
        if (start == null) {
            cc.link = `/1/cards/${cardid}?start=null`;
            console.log("cancel start");
        }
        return await new TrelloConnect(cc).LoadData();
    }

    async UpdateDue(cardid: string, due: string | null) {
        var cc = {
            link: `/1/cards/${cardid}`,
            method: "put",
            query: {
                due: due
            }
        } as TConnect

        if (due == null) {
            cc.link = `/1/cards/${cardid}?due=null`;
            console.log("cancel due");
        }

        return await new TrelloConnect(cc).LoadData();
    }

    async UpdateDueComplete(cardid: string, dueComplete: boolean) {
        var cc = {
            link: `https://api.trello.com/1/cards/${cardid}?dueComplete=${dueComplete}&key=${User.trello.app.id}&token=${User.trello.auth.id}`,
            method: "put",

        } as TConnect
        const aR = await fetch(cc.link, {
            method: "PUT",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(at)
        });
        var ResponseText = await aR.text()

        if (ResponseText.startsWith("{"))
            ResponseText = JSON.stringify(JSON.parse(ResponseText).cover);

        console.log(ResponseText);
    }

    async UpdateCover(cardid: string,
        cover: "pink" | "yellow" | "lime" | "blue" | "black" | "orange" | "red" | "purple" | "sky" | "green",
        brightness: "dark" | "light") {

        var at = {
            cover: {
                "color": cover
            }
        }

        var cc = {
            link: `https://api.trello.com/1/cards/${cardid}?key=${User.trello.app.id}&token=${User.trello.auth.id}`,
            method: "put",
        } as TConnect

        const aR = await fetch(cc.link, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(at)
        });
        var ResponseText = await aR.text()

        if (ResponseText.startsWith("{"))
            ResponseText = JSON.stringify(JSON.parse(ResponseText).cover);

        console.log(ResponseText);

    }
}
