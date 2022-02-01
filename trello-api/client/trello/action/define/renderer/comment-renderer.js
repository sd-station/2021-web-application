import { CheckItemApi } from "../../../api/checkitem-api.js";
export class CommentRenderer {
    src;
    css = `<link rel="stylesheet" href="/css/trello-comment.css">`;
    constructor(src) {
        this.src = src;
    }
    RenderCheckList() {
        let checklist = JSON.parse(this.src);
        const Element = document.createElement("message-line");
        var res = `<div><span>${checklist.name}</span></div>`;
        checklist.checkItems.
            forEach(itm => {
            res += `<div data-id="${itm.id}" data-card="${checklist.idCard}" class="check-item ${itm.state}"><span>${itm.name}</span></div>`;
        });
        Element.innerHTML = `
        ${this.css}
        <message-line>
        <msg-item id="msg-id-1" class="msg-recieved">
        <msg-content>${res}</msg-content>
        </msg-item>
        </message-line>`;
        let checks = Element.querySelectorAll("check-item");
        Element.addEventListener("click", async (event) => {
            var el = event.target;
            if (el.classList.contains("check-item")) {
                event.preventDefault();
                if (el.classList.contains("state-changed"))
                    return;
                var ischecked = el.classList.contains("complete");
                el.classList.remove("incomplete");
                el.classList.remove("complete");
                ischecked = !ischecked;
                if (ischecked) {
                    el.classList.add("complete");
                }
                else {
                    el.classList.add("incomplete");
                }
                el.classList.add("state-changed");
                var id = el.getAttribute("data-id");
                var cardid = el.getAttribute("data-card");
                await new CheckItemApi().CheckUpdate(cardid, id, ischecked);
                el.classList.add("state-over");
                setTimeout(() => {
                    el.classList.remove("state-changed");
                    el.classList.remove("state-over");
                }, 1000);
            }
        });
        return Element;
    }
    RenderAsRawText() {
        const Element = document.createElement("message-line");
        const obj = JSON.parse(this.src);
        const res = JSON.stringify(obj, null, " ");
        Element.innerHTML = `<pre>${res}</pre>`;
        return Element;
    }
}
//# sourceMappingURL=comment-renderer.js.map