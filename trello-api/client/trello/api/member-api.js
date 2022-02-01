import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class TrelloMemberApi {
    async UpdateMemberInfo(memberid, Options) {
        var cc = {
            link: `/1/members/${memberid}`, method: "put",
            query: Options
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async GetItem(id) {
        var cc = {
            link: `/1/members/${id}`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async membershipsOfWorkspace(workspaceid) {
        var cc = {
            link: `/1/organizations/${workspaceid}/memberships`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async OfBoard(boardid) {
        var cc = {
            link: `/1/boards/${boardid}/members`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async ofCard(cardid) {
        var cc = {
            link: `/1/cards/${cardid}/members`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async AddMemberToBoard(boardid, memberid, type) {
        var cc = {
            link: `/1/boards/${boardid}/members/${memberid}?type=${type}`,
            method: "put"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async AddMemberToCard(cardid, memberid) {
        var cc = {
            link: `/1/cards/${cardid}/idMembers?value=${memberid}`,
            method: "post"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async RemoveFromBoard(boardid, memberid) {
        var cc = {
            link: `/1/boards/${boardid}/members/${memberid}`,
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    //#region Workspace
    async OfWorkspace(workspaceid) {
        var cc = {
            link: `/1/organizations/${workspaceid}/members`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async AddMemberToWorkspace(workspaceid, memberid, type) {
        var cc = {
            link: `/1/organizations/${workspaceid}/members/${memberid}?type=${type}`,
            method: "put"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async RemoveFromWorkspace(boardid, memberid) {
        var cc = {
            link: `/1/boards/${boardid}/members/${memberid}`,
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=member-api.js.map