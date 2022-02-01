import { TrelloConnect } from "../../data/connect/trello-connect.js";
import { PageParameters } from "../../Lib/searchoptions.js";
import { ShowDataDetails } from "../ui/show-data-details.js";
import { User } from "../user/User.js";
import { NavigationClass } from "./navigation/navigation-class.js";

export type AfterAction = {
    action?: "none" | "backward" | "move" | "forward";
    value?: string;
}
class PageSupport {


    public get Level(): number {
        var i = 1;
        var w = window as Window;
        while (w.parent != w) {
            w = w.parent
        }
        return i;
    }

    SendCommand(cmd: string) {
        console.log(cmd)
    }
    async GetReady(arg0: string) {
        return new Promise(async resolve => {

            var el = document.querySelector(arg0)

            if (el) resolve(true);

            await new Promise(r => setTimeout(r, 1000));
            el = document.querySelector(arg0)
            if (el) resolve(true);

            setTimeout(() => {
                el = document.querySelector(arg0)
                if (el) resolve(true); else return this.GetReady(arg0);
            }, 1000);

        })
    }
    ScrollToEnd() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    CloseModal() {

        var modals = document.querySelectorAll("app-modal");

        if (modals.length <= 1) this.State = "unlock-scroll";
        var lst = modals[modals.length - 1];
        lst.parentElement!.removeChild(lst);

    }
    CreateModal(colorpicker: HTMLElement, opt?: { mode: "glass" | "solid" | "solid-float"; }) {
        this.State = "lock-scroll";
        var modal = document.createElement("app-modal") as HTMLElement;
        document.body.appendChild(modal);
        var dialog = document.createElement("modal-dialog") as HTMLElement;
        modal.appendChild(dialog);

        if (opt && opt.mode && opt.mode.startsWith("solid")) {
            modal.classList.add("solid-dialog");
            if (opt.mode.startsWith("solid-float")) dialog.classList.add("float");
        }

        modal.addEventListener("click", event => {
            if ((event.target as HTMLElement).tagName == "APP-MODAL") this.CloseModal()
        })

        dialog.appendChild(colorpicker);
    }
    LoadComplete() {
        this.State = "load-complete";

    }
    IsLoading() {
        this.State = "loading";
    }
    SetTitle(name: string) {
        document.querySelectorAll(".txt-page-title").forEach(o => {
            o.textContent = name;
        });
    }
    Navigate(arg0: string) {
        this.Navigation.Navigate(arg0);
    }

    log(title: string, loader: TrelloConnect) {
        var cr = new ShowDataDetails();
        if (loader.ResponseType == "list") cr.DisplayDetails(title, loader.ToList())
        if (loader.ResponseType == "item") cr.DisplayDetails(title, loader.data)
        if (loader.ResponseType == "text") cr.DisplayDetails(title, loader.RawText)
        cr.DisplayLisk(loader.link)
    }
    async WaitForConformation(
        title: string,
        command: () => Promise<void>,
        after?: AfterAction) {
        if (this.AcceptDialog(title + "?")) {
            Page.State = "loading";
            await command();
            Page.State = "load-complete";

            if (after) {
                if (after.action) {
                    if (after.action == "none") return;

                    if (after.action == "backward") window.history.back();
                    if (after.action == "forward") this.Navigation.Navigate(after.value!, true);
                    if (after.action == "move") this.Navigation.Navigate(after.value!, false);
                } else if (after.value) this.Navigation.Navigate(after.value, false);
            } else window.history.back();
        }
    }



    public set IsLoaded(v: boolean) {
        if (v) document.body.classList.remove("loading");
        else document.body.classList.add("loading");
    }


    set State(state: "loading" | "load-complete" | "lock-scroll" | "unlock-scroll") {
        switch (state) {
            case "lock-scroll":
                document.body.classList.add("lock-scroll");
                return;
            case "unlock-scroll":
                document.body.classList.remove("lock-scroll");
                return;
            case "loading":
                document.body.classList.add("loading");
                return;
            case "load-complete":
                document.body.classList.remove("loading");
                return;
            default:
                break;
        }

    }
    AcceptDialog(arg0: string) {
        return confirm(arg0)
    }
    Param(arg0: "member-id" | "project-id" | "card-id" | "card-name" | "mode"): string {
        var kh = new PageParameters().searchoptions[arg0];
        if (kh) return kh;

        if (arg0 == "member-id") return User.trello.member.id;
        if (arg0 == "project-id") return User.trello.board.id;

        if (arg0 == "card-id") return User.trello.card.id;
        if (arg0 == "card-name") return User.trello.card.name;

        return "";
    }
    MakeElement(arg0: string, cls: string, content?: string) {
        var i = document.createElement(arg0);
        if (cls.length > 0) i.classList.add(cls);
        if (content && content.length > 0) i.appendChild(document.createTextNode(content))
        return i
    }
    LoadingComplete() {

    }

    SetContent(q: string, name: string) {
        var el = document.querySelector(q);
        if (el) el.textContent = name;
    }
    async GetComponent(link: string, option?: any) {
        if (!link.startsWith("/")) link = "/" + link;
        var ctemp = await fetch(`${link}`);
        const temp = await ctemp.text();
        if (!option) return temp;
        return this.KeyReplacement(temp, option);
    }

    KeyReplacement(txt: string, item: { [x: string]: any; }) {

        if (!item) return txt;
        Object.keys(item).forEach(key => {
            txt = txt.replaceAll(`{{${key}}}`, item[key]);
        })

        return txt;
    }

    Module(url: string) {
        var k = document.createElement("script");
        k.type = "module";
        if (!url.endsWith(".js")) url += ".js";
        k.src = url;
        return k;
    }
    Include(url: string) {
        var k = document.createElement("script");
        k.type = "module";
        if (!url.endsWith(".js")) url += ".js";
        k.src = url;
        document.head.appendChild(k);
    }

    Navigation = new NavigationClass();

}

export const Page = new PageSupport();
