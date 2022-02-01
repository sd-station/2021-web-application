import { Linker } from "../../app/modules/emitter.js";
import { User } from "../../app/user/User.js";
import { Database } from "../offline/init.js";
export class TrelloConnect {
    FORCETOUPDATE = false;
    constructor(option) {
        if (option && option.method)
            this.method = option.method;
        if (option)
            this.makelink(option);
    }
    makelink(option) {
        this.link = option.link;
        const addchr = this.link.indexOf("?") > 0 ? "&" : "?";
        this.link += `${addchr}token=${User.trello.auth.id}`;
        const linker = new Linker(this.link);
        this.link = linker.Join("/api/connect").link;
        if (option.param)
            this.link = linker.Apply(option.param).link;
        if (option.query)
            this.link += linker.AddQuery(option.query);
    }
    link;
    method = "get";
    ResponseText = "Request Not Started";
    get ResponseType() {
        if (this.ResponseText.startsWith("["))
            return "list";
        if (this.ResponseText.startsWith("{"))
            return "item";
        return "text";
    }
    get HasText() {
        return !(this.ResponseText.startsWith("{") || this.ResponseText.startsWith("["));
    }
    get HasItem() {
        return this.ResponseText.startsWith("{");
    }
    get HasList() {
        return this.ResponseText.startsWith("[");
    }
    get data() { return JSON.parse(this.ResponseText); }
    ItemOf() {
        return JSON.parse(this.ResponseText);
    }
    ToList() {
        if (this.ResponseType == "list")
            return JSON.parse(this.ResponseText);
        return [];
    }
    ToListOf() {
        if (this.ResponseType == "list")
            return JSON.parse(this.ResponseText);
        return [];
    }
    get RawText() {
        return this.ResponseText;
    }
    async LoadData() {
        switch (this.method) {
            case "get":
                await Database.Initialization();
                if (User.setting.data.offline) {
                    var data = await Database.FindRecordsFromDB(this.link);
                    if (data.length > 0) {
                        this.ResponseText = data[0].data;
                        return this;
                    }
                }
                if (window.navigator.onLine) {
                    await this.GetMethod();
                    setTimeout(async () => {
                        var up = await Database.UpdateRecord({ key: this.link, data: this.ResponseText });
                        if (!up)
                            Database.Insert({ key: this.link, data: this.ResponseText });
                    }, 1000);
                    return this;
                }
                var data = await Database.FindRecordsFromDB(this.link);
                this.ResponseText = data[0].data;
                return this;
            //! DELETE MODE
            case "delete":
                await this.DeleteMethod();
                return this;
            case "post":
                await this.PostMethod();
                return this;
            case "put":
                await this.PutMethod();
                return this;
            default:
                break;
        }
        return this;
    }
    async PutMethod() {
        const aR = await fetch(this.link, { method: "PUT" });
        this.ResponseText = await aR.text();
    }
    async PostMethod() {
        const aR = await fetch(this.link, { method: "POST" });
        this.ResponseText = await aR.text();
    }
    async DeleteMethod() {
        const aR = await fetch(this.link, { method: "DELETE" });
        this.ResponseText = await aR.text();
    }
    async GetMethod() {
        const aR = await fetch(this.link + "&cache=" + new Date().getTime(), { method: "GET" });
        this.ResponseText = await aR.text();
    }
}
//# sourceMappingURL=trello-connect.js.map