import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { ListApi } from "../../api/list-api.js";
document.querySelector("#page-title").textContent = User.trello.list.name;
var btn = document.querySelector("#btn-archive-list");
btn.addEventListener("click", _ => {
    Page.WaitForConformation("Archive List", async () => {
        var dta = await new ListApi().Archive(User.trello.list.id);
        console.log(dta.RawText);
    }, { action: "none" });
});
//# sourceMappingURL=index.html.js.map