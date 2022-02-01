import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js";

export class TrelloBoardApi {

    async GetItem(boardid: string) {
        var cc = {
            link: `/1/boards/${boardid}`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async ofMember(memberid: string) {
        var cc = {
            link: `/1/members/${memberid}/boards`,
            query: {
                fields: "closed,dateLastActivity,dateLastView,desc,descData,idMemberCreator,idOrganization,invitations,invited,memberships,name,pinned,powerUps,starred,subscribed,url"
            }
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async OfWorkspace(workspaceid: string) {
        var cc = {
            link: `/1/organizations/${workspaceid}/boards`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();

    }

    async Add(workspace: string, param: { name: string, desc: string }) {
        var cc = {
            link: `/1/boards/?name=${param.name}&desc=${param.desc}&idOrganization=${workspace}&defaultLists=false`,
            method: "post"
        } as TConnect

        if (workspace.length == 0 || workspace == "personal") cc.link = `/1/boards/?name=${param.name}&desc=${param.desc}&defaultLists=false`;

        return await new TrelloConnect(cc).LoadData();
    }

    async Update(id: string, opt: { name: string; desc: string; }) {
        var cc = {
            link: `/1/boards/${id}?name=${opt.name}&desc=${opt.desc}`,
            method: "put",
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async Delete(boardid: string) {
        var cc = {
            link: `/1/boards/{id}`,
            param: { id: boardid },
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    //todo: Update  

}
