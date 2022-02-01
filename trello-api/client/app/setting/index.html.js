import { Page } from "../../app/page/page.js";
import { User } from "../../app/user/User.js";
Page.State = "loading";
await User.Loaded();
const useroffline = document.querySelector("#setting-use-offline-data");
useroffline.checked = User.setting.data.offline;
useroffline.addEventListener("change", _ => {
    User.setting.data.offline = useroffline.checked;
    User.setting.Save();
});
const rememberlastpage = document.querySelector("#setting-remember-last-page");
rememberlastpage.checked = User.setting.data.lastsession.keep == "always";
rememberlastpage.addEventListener("change", _ => {
    User.setting.data.lastsession.keep = rememberlastpage.checked ? "always" : "none";
    User.setting.Save();
});
Page.State = "load-complete";
//# sourceMappingURL=index.html.js.map