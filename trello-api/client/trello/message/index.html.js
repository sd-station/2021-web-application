import { Page } from "../../app/page/page.js";
import { ContainerElement } from "../../app/ui/default/default-element.js";
import { ShowDataDetails } from "../../app/ui/show-data-details.js";
import { MessageApi } from "../api/message-api.js";
await Page.GetReady("item-container");
const container = document.querySelector("item-container");
var dataloader = await new MessageApi().ofCard(Page.Param("card-id"));
var data = dataloader.ToList();
data.forEach(brd => {
    var c = document.createElement("trello-comment");
    c.dir = "auto";
    c.setAttribute("data-type", "text");
    c.setAttribute("data-src", JSON.stringify(brd));
    container.appendChild(c);
    // c.addEventListener("click", _ => {
    //     User.trello.board.id = brd.id;
    //     User.trello.board.name = brd.name;
    //     User.SaveAndUpdate();
    // })
});
new ShowDataDetails()
    .DisplayDetails("code", data)
    .DisplayLisk(dataloader.link);
if (data.length == 0)
    new ContainerElement(container)
        .Image("/assets/trello/note.svg")
        .MessageBox("No *Note* Here");
document.body.classList.remove("loading");
Page.ScrollToEnd();
document.querySelector("#btn-quick-note").addEventListener("click", async (_) => {
    var txtEl = document.querySelector("#txt-quick-note");
    if (txtEl.value.trim().length == 0) {
        txtEl.focus();
        return;
    }
    var txt = txtEl.value.trim();
    var k = await new MessageApi().Add(Page.Param("card-id"), txt);
    if (k.HasItem) {
        var c = document.createElement("trello-comment");
        c.dir = "auto";
        c.setAttribute("data-type", "text");
        c.setAttribute("data-src", JSON.stringify(k.data));
        container.insertBefore(c, container.children[0]);
    }
    else
        alert(k.RawText);
    document.body.classList.remove("loading");
});
//# sourceMappingURL=index.html.js.map