import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class TrelloMemberApi {
    async UpdateMemberInfo(memberid: string, Options: {[x:string]:string}) {
        var cc = {
            link: `/1/members/${memberid}`, method:"put",
            query : Options
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async GetItem(id: string) {
        var cc = {
            link: `/1/members/${id}`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async membershipsOfWorkspace(workspaceid: string) {
        var cc = {
            link: `/1/organizations/${workspaceid}/memberships`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async OfBoard(boardid: string) {
        var cc = {
            link: `/1/boards/${boardid}/members`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async ofCard(cardid: string) {
        var cc = {
            link: `/1/cards/${cardid}/members`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }


    async AddMemberToBoard(boardid: string, memberid: string, type: "admin" | "normal" | "observer") {
        var cc = {
            link: `/1/boards/${boardid}/members/${memberid}?type=${type}`,
            method: "put"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async AddMemberToCard(cardid: string, memberid: string) {
        var cc = {
            link: `/1/cards/${cardid}/idMembers?value=${memberid}`,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async RemoveFromBoard(boardid: string, memberid: string) {
        var cc = {
            link: `/1/boards/${boardid}/members/${memberid}`,
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    //#region Workspace
    async OfWorkspace(workspaceid: string) {
        var cc = {
            link: `/1/organizations/${workspaceid}/members`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async AddMemberToWorkspace(workspaceid: string, memberid: string, type: "admin" | "normal") {
        var cc = {
            link: `/1/organizations/${workspaceid}/members/${memberid}?type=${type}`,
            method: "put"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async RemoveFromWorkspace(boardid: string, memberid: string) {
        var cc = {
            link: `/1/boards/${boardid}/members/${memberid}`,
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

}
