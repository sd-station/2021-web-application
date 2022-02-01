import { TrelloConnect } from "../../data/connect/trello-connect.js";
export class TrelloBoardApi {
    async GetItem(boardid) {
        var cc = {
            link: `/1/boards/${boardid}`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async ofMember(memberid) {
        var cc = {
            link: `/1/members/${memberid}/boards`,
            query: {
                fields: "closed,dateLastActivity,dateLastView,desc,descData,idMemberCreator,idOrganization,invitations,invited,memberships,name,pinned,powerUps,starred,subscribed,url"
            }
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async OfWorkspace(workspaceid) {
        var cc = {
            link: `/1/organizations/${workspaceid}/boards`,
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Add(workspace, param) {
        var cc = {
            link: `/1/boards/?name=${param.name}&desc=${param.desc}&idOrganization=${workspace}&defaultLists=false`,
            method: "post"
        };
        if (workspace.length == 0 || workspace == "personal")
            cc.link = `/1/boards/?name=${param.name}&desc=${param.desc}&defaultLists=false`;
        return await new TrelloConnect(cc).LoadData();
    }
    async Update(id, opt) {
        var cc = {
            link: `/1/boards/${id}?name=${opt.name}&desc=${opt.desc}`,
            method: "put",
        };
        return await new TrelloConnect(cc).LoadData();
    }
    async Delete(boardid) {
        var cc = {
            link: `/1/boards/{id}`,
            param: { id: boardid },
            method: "delete"
        };
        return await new TrelloConnect(cc).LoadData();
    }
}
//# sourceMappingURL=board-api.js.map