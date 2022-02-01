import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { MessageApi } from "../../api/message-api.js";
import { MessageEditor } from "./message-editor.js";

await User.Loaded();

const form = new MessageEditor();
form.txtCardTitle.Text = Page.Param("card-name");

form.btnSubmit.addEventListener("click", async _ => {
    document.body.classList.add("loading")
    var txt = form.txtMessageText.Text  ;
 

    var k = await new MessageApi().Add(Page.Param("card-id"), txt);

    console.log("RS", k.link, k.RawText);

    document.body.classList.remove("loading")

    Page.Navigate("/trello/message")

})
