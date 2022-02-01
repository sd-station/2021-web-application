import { AccountDataHandler } from "../../app.auth/api/handler/AuthHandler.js";
import { Page } from "../page/page.js";
import { User } from "../user/User.js";
Page.IsLoaded = true;
// if (new AccountDataHandler().List.length == 0) {
//     User.account.save({
//         "key": "164723628889254",
//         "token": "5d-4f3249-8501c1d4"
//     })
// }
var AuthData = new AccountDataHandler();
console.log(AuthData.List);
//001# Check Auth History
if (AuthData.List.length == 0) {
    window.location.replace("/app/auth/begin/index.html");
}
else {
    User.account.me = new AccountDataHandler().List[0];
    window.location.replace("/dashboard/index.html");
}
//# sourceMappingURL=index.html.js.map