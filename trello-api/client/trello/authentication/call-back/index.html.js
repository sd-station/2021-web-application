import { ComponentProvider } from "../../../app/modules/component-provider.js";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { AuthApi } from "../../api/auth-api.js";
import { TrelloMemberApi } from "../../api/member-api.js";
Page.State = "loading";
let testtoken = "";
let itm;
function get_gravatar(id, avatarHash, size) {
    var size = size || 80;
    return `https://trello-members.s3.amazonaws.com/${id}/${avatarHash}/${size}.png`;
    //return `https://trello-avatars.s3.amazonaws.com/{avatarHash}/50.png`
    return 'http://www.gravatar.com/avatar/' + avatarHash + '.jpg?s=' + size;
}
function handleEvent() {
    document.querySelector("button.action-log-out").addEventListener("click", _ => {
        fetch("https://api.trello.com/1/tokens/{token}/?key={api-key}&token={api-token}"
            .replace("{api-key}", "4525dacfc9f7344c608461dfe0637059")
            .replace("{api-token}", testtoken).replace("{token}", testtoken), {
            method: 'DELETE',
        }).then(r => r.json()).then(p => {
            console.log(JSON.stringify(p));
            Page.Navigation.goback();
        });
    });
}
function SetupForm() {
    let frm = document.querySelector(".frm-create-account");
    let btn1 = document.querySelector(".btn-show-password");
    let btnsubmit = document.querySelector(".btn-create-new-account");
}
async function init() {
    //>> Load Data From Location URL
    testtoken = window.location.hash.split("#").reverse()[0];
    if (testtoken.startsWith("token="))
        testtoken = testtoken.substring("token=".length);
    User.trello.auth.id = testtoken;
    var dataloader = await new TrelloMemberApi().GetItem("me");
    itm = dataloader.data;
    var Nmit = new ComponentProvider("identity-card");
    Nmit.Item = itm;
    if (itm.avatarHash)
        Nmit.Manual["profile-photo"] = get_gravatar(itm.id, itm.avatarHash, 170);
    else
        Nmit.Manual["profile-photo"] = "/assets/icons/social/trello.svg";
    Nmit.Manual["profile-name"] = itm.fullName;
    Nmit.Manual["profile-link"] = itm.url + "/boards";
    Nmit.Manual["qr-code-link"] = `http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=${encodeURI(itm.url + "/boards")}&amp;qzone=1&amp;margin=0&amp;size=64x64&amp;ecc=L`;
    var content = await Nmit.GenerateContent();
    document.querySelector("identify-card").innerHTML = content;
    handleEvent();
    const TokenAdaptor = await new AuthApi().Info(testtoken);
    if (TokenAdaptor.ResponseType == "item") {
        const TokenInfo = TokenAdaptor.data;
        let cdrtext = "Connected";
        if (TokenInfo.dateExpires) {
            var cdr = new Date(TokenInfo.dateExpires).getTime() - new Date().getTime();
            `${Math.floor(cdr / (1000 * 60 * 60 * 24))} Days ${Math.floor(cdr / (1000 * 60 * 60))} Hours`;
        }
        document.querySelector("identify-card time").innerHTML = cdrtext;
    }
    else
        console.error("token", TokenAdaptor.RawText);
    //>> Display Code
    Page.log("Member Info", dataloader);
    Page.log("Token Info", TokenAdaptor);
    //>> User Has Account ? 
    //## NO
    //> Request To Create Account On Server
    //> Ask User to Setup Password 
    //> Ask User to Contiue to Dashboard
    //## YES
    // SetupForm()
    var t2 = document.querySelector(".btn-continue-to-dashboard");
    t2.addEventListener("click", _ => {
        User.trello.auth.id = testtoken;
        User.trello.auth.name = itm.username;
        User.trello.member.id = itm.id;
        User.trello.member.name = itm.fullName;
        User.SaveAndUpdate("auth");
        Page.Navigation.Navigate("/trello/me/index.html");
    });
    Page.State = "load-complete";
    // await new DashBoardInitializer().Init();
    // var content = document.querySelector("dash-content");
    // Array.from(document.body.children)
    //     .forEach((c, i) => {
    //         if (i == 0) return;
    //         document.body.removeChild(c);
    //         content.appendChild(c);
    //     })
    //     var dashprofile = document.querySelector("dash-profile-launcher") as csDashProfileLauncher;
    //     dashprofile.UpdateImage(get_gravatar(itm.id, itm.avatarHash, 30) )
}
init();
//# sourceMappingURL=index.html.js.map