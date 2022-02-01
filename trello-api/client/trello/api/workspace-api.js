import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class WorkspaceApi {
    async GetItem(workspaceid) {
        var cc = {
            link: `/1/organizations/${workspaceid}`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Delete(id) {
        var cc = {
            link: `/1/organizations/${id}`,
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async OfMember(memberid) {
        var cc = {
            link: `/1/members/${memberid}/organizations`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Create(param) {
        var cc = {
            link: `/1/organizations`,
            query: param,
            method: "post"
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Update(workspaceid, param) {
        var cc = {
            link: `/1/organizations/${workspaceid}`,
            query: {
                name: param.name,
                displayName: param.title,
                desc: param.desc,
                website: param.website
            },
            method: "put"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=workspace-api.js.map