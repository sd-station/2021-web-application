import { PageParameters } from "../../Lib/searchoptions.js";
import { ShowDataDetails } from "../ui/show-data-details.js";
import { User } from "../user/User.js";
import { NavigationClass } from "./navigation/navigation-class.js";
class PageSupport {
    get Level() {
        var i = 1;
        var w = window;
        while (w.parent != w) {
            w = w.parent;
        }
        return i;
    }
    SendCommand(cmd) {
        console.log(cmd);
    }
    async GetReady(arg0) {
        return new Promise(async (resolve) => {
            var el = document.querySelector(arg0);
            if (el)
                resolve(true);
            await new Promise(r => setTimeout(r, 1000));
            el = document.querySelector(arg0);
            if (el)
                resolve(true);
            setTimeout(() => {
                el = document.querySelector(arg0);
                if (el)
                    resolve(true);
                else
                    return this.GetReady(arg0);
            }, 1000);
        });
    }
    ScrollToEnd() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    CloseModal() {
        var modals = document.querySelectorAll("app-modal");
        if (modals.length <= 1)
            this.State = "unlock-scroll";
        var lst = modals[modals.length - 1];
        lst.parentElement.removeChild(lst);
    }
    CreateModal(colorpicker, opt) {
        this.State = "lock-scroll";
        var modal = document.createElement("app-modal");
        document.body.appendChild(modal);
        var dialog = document.createElement("modal-dialog");
        modal.appendChild(dialog);
        if (opt && opt.mode && opt.mode.startsWith("solid")) {
            modal.classList.add("solid-dialog");
            if (opt.mode.startsWith("solid-float"))
                dialog.classList.add("float");
        }
        modal.addEventListener("click", event => {
            if (event.target.tagName == "APP-MODAL")
                this.CloseModal();
        });
        dialog.appendChild(colorpicker);
    }
    LoadComplete() {
        this.State = "load-complete";
    }
    IsLoading() {
        this.State = "loading";
    }
    SetTitle(name) {
        document.querySelectorAll(".txt-page-title").forEach(o => {
            o.textContent = name;
        });
    }
    Navigate(arg0) {
        this.Navigation.Navigate(arg0);
    }
    log(title, loader) {
        var cr = new ShowDataDetails();
        if (loader.ResponseType == "list")
            cr.DisplayDetails(title, loader.ToList());
        if (loader.ResponseType == "item")
            cr.DisplayDetails(title, loader.data);
        if (loader.ResponseType == "text")
            cr.DisplayDetails(title, loader.RawText);
        cr.DisplayLisk(loader.link);
    }
    async WaitForConformation(title, command, after) {
        if (this.AcceptDialog(title + "?")) {
            Page.State = "loading";
            await command();
            Page.State = "load-complete";
            if (after) {
                if (after.action) {
                    if (after.action == "none")
                        return;
                    if (after.action == "backward")
                        window.history.back();
                    if (after.action == "forward")
                        this.Navigation.Navigate(after.value, true);
                    if (after.action == "move")
                        this.Navigation.Navigate(after.value, false);
                }
                else if (after.value)
                    this.Navigation.Navigate(after.value, false);
            }
            else
                window.history.back();
        }
    }
    set IsLoaded(v) {
        if (v)
            document.body.classList.remove("loading");
        else
            document.body.classList.add("loading");
    }
    set State(state) {
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
    AcceptDialog(arg0) {
        return confirm(arg0);
    }
    Param(arg0) {
        var kh = new PageParameters().searchoptions[arg0];
        if (kh)
            return kh;
        if (arg0 == "member-id")
            return User.trello.member.id;
        if (arg0 == "project-id")
            return User.trello.board.id;
        if (arg0 == "card-id")
            return User.trello.card.id;
        if (arg0 == "card-name")
            return User.trello.card.name;
        return "";
    }
    MakeElement(arg0, cls, content) {
        var i = document.createElement(arg0);
        if (cls.length > 0)
            i.classList.add(cls);
        if (content && content.length > 0)
            i.appendChild(document.createTextNode(content));
        return i;
    }
    LoadingComplete() {
    }
    SetContent(q, name) {
        var el = document.querySelector(q);
        if (el)
            el.textContent = name;
    }
    async GetComponent(link, option) {
        if (!link.startsWith("/"))
            link = "/" + link;
        var ctemp = await fetch(`${link}`);
        const temp = await ctemp.text();
        if (!option)
            return temp;
        return this.KeyReplacement(temp, option);
    }
    KeyReplacement(txt, item) {
        if (!item)
            return txt;
        Object.keys(item).forEach(key => {
            txt = txt.replaceAll(`{{${key}}}`, item[key]);
        });
        return txt;
    }
    Module(url) {
        var k = document.createElement("script");
        k.type = "module";
        if (!url.endsWith(".js"))
            url += ".js";
        k.src = url;
        return k;
    }
    Include(url) {
        var k = document.createElement("script");
        k.type = "module";
        if (!url.endsWith(".js"))
            url += ".js";
        k.src = url;
        document.head.appendChild(k);
    }
    Navigation = new NavigationClass();
}
export const Page = new PageSupport();
//# sourceMappingURL=page.js.map