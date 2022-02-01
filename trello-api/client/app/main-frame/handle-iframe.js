import { User } from "../user/User.js";
/**  Main Frame Caption */
export class HandleIframe {
    async Initialize() {
        var contentframe = document.querySelector("iframe#main-frame");
        if (!contentframe) {
            setTimeout(() => {
                this.Initialize();
            }, 1000);
            return;
        }
        var navtext = document.querySelector("#txt-command");
        await User.Loaded();
        if (User.setting.UselastSession()) {
            contentframe.contentWindow.location.href = User.setting.data.lastsession.link;
        }
        else
            contentframe.src = "/app/start/index.html";
        contentframe.addEventListener("load", async (_) => {
            //> Add Basic Style
            document.querySelectorAll('.active-side-menu,.active-menu-open').forEach(h => h.classList.remove("active-side-menu", "active-menu-open"));
            //> Display in Index
            var link = contentframe.contentWindow.location.href;
            if (link.indexOf(".html") > 0)
                navtext.placeholder = contentframe.contentWindow.location.pathname;
            User.setting.data.lastsession.link = link;
            User.setting.Save();
        });
    }
}
//# sourceMappingURL=handle-iframe.js.map