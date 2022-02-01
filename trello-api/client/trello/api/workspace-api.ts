import { TConnect, TrelloConnect } from "../../data/connect/trello-connect.js"

export class WorkspaceApi {

    async GetItem(workspaceid: string) {
        var cc = {
            link: `/1/organizations/${workspaceid}`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }
    async Delete(id: string) {
        var cc = {
            link: `/1/organizations/${id}`,
            method: "delete"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }


    async OfMember(memberid: string) {
        var cc = {
            link: `/1/members/${memberid}/organizations`,
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }


    async Create(param: {[x:string] : string}) {
        var cc = {
            link: `/1/organizations`,
            query:  param,
            method: "post"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    async Update(workspaceid: string,param:{ title: string, name: string, desc: string, website: string }) {
        var cc = {
            link: `/1/organizations/${workspaceid}`,
            query: {
                name: param.name,
                displayName: param.title,
                desc: param.desc,
                website: param.website
            },
            method:"put"
        } as TConnect

        return await new TrelloConnect(cc).LoadData();
    }

    //todo: Delete  
    //todo: Update  

}
