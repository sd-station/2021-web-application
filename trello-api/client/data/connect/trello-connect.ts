import { Linker } from "../../app/modules/emitter.js";
import { User } from "../../app/user/User.js";
import { Database } from "../offline/init.js";

export type TConnect = {
    link: string;
    method?: "get" | "delete" | "post" | "put"
    param?: { [x: string]: string };
    query?: { [x: string]: string | boolean | null };
}
export class TrelloConnect {


    FORCETOUPDATE: boolean = false;

    constructor(option?: TConnect) {
        if (option && option.method) this.method = option.method;
        if (option) this.makelink(option)

    }

    makelink(option: TConnect) {

        this.link = option.link;

        const addchr = this.link.indexOf("?") > 0 ? "&" : "?";
        this.link += `${addchr}token=${User.trello.auth.id}`;

        const linker = new Linker(this.link);
        this.link = linker.Join("/api/connect").link;

        if (option.param) this.link = linker.Apply(option.param).link;

        if (option.query) this.link += linker.AddQuery(option.query);

    }

    link!: string;

    method = "get"
    ResponseText: string = "Request Not Started";

    public get ResponseType(): "list" | "item" | "text" {
        if (this.ResponseText.startsWith("[")) return "list"
        if (this.ResponseText.startsWith("{")) return "item"
        return "text"
    }

    public get HasText(): boolean {
        return !(this.ResponseText.startsWith("{") || this.ResponseText.startsWith("["))
    }
    public get HasItem(): boolean {
        return this.ResponseText.startsWith("{")
    }
    public get HasList(): boolean {
        return this.ResponseText.startsWith("[")
    }


    public get data() { return JSON.parse(this.ResponseText) as any }

    ItemOf<T>() {
        return JSON.parse(this.ResponseText) as T;
    }
    public ToList() {
        if (this.ResponseType == "list") return JSON.parse(this.ResponseText) as any[];
        return [];
    }
    ToListOf<T>() {
        if (this.ResponseType == "list") return JSON.parse(this.ResponseText) as T[];
        return [] as T[];
    }
    public get RawText() {
        return this.ResponseText;
    }
    async LoadData() {

        switch (this.method) {
            case "get":
                await Database.Initialization();
                if (User.setting.data.offline) {
                    var data = await Database.FindRecordsFromDB(this.link) as any[];
                    if (data.length > 0) {
                        this.ResponseText = data[0].data;
                        return this;
                    }
                }
                if (window.navigator.onLine) {
                    await this.GetMethod();
                    setTimeout(async () => {
                        var up = await Database.UpdateRecord({ key: this.link, data: this.ResponseText });
                        if (!up) Database.Insert({ key: this.link, data: this.ResponseText });

                    }, 1000);
                    return this;
                }

                var data = await Database.FindRecordsFromDB(this.link) as any[];
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
        this.ResponseText = await aR.text()
    }
    async PostMethod() {

        const aR = await fetch(this.link, { method: "POST" });
        this.ResponseText = await aR.text()
    }
    async DeleteMethod() {
        const aR = await fetch(this.link, { method: "DELETE" });
        this.ResponseText = await aR.text()
    }

    async GetMethod() {
        const aR = await fetch(this.link + "&cache=" + new Date().getTime(), { method: "GET" });
        this.ResponseText = await aR.text()
    }

}