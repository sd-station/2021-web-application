import { ITrelloAttachmentResponse } from "trello-attachment-response";
import { Page } from "../../../../app/page/page.js";
import { User } from "../../../../app/user/User.js";
import { AttachmentApi } from "../../../api/attachment-api.js";
import { baseRenderer } from "./renderer.js";

export class ImageRenderer extends baseRenderer {
    async RenderImage(): Promise<any> {
        let item = JSON.parse(this.src) as ITrelloAttachmentResponse;
        const Element = document.createElement("message-line");

        if (item.previews.length == 0) return;
        var prev = item.previews.filter(g => g.width <= 400).reverse()[0];
        var icon = item.previews[0].url;
        var extension = item.url.substring(item.url.lastIndexOf("."))
        if (!icon.endsWith(extension)) icon = item.url;

        var css = `style="width:${prev.width}px;height:${prev.height}px;background-image:url(${icon})"`

        var raw = await Page
            .GetComponent("/trello/action/define/template/image-comment.html", {
                css: css,
                time: new Date(item.date).toLocaleTimeString(),
                datasrc: prev.url,

            })

        Element.innerHTML = raw;

        Element.querySelectorAll("[data-action]").forEach(act => {
            act.addEventListener("click", async _ => {
                var command = act.getAttribute("data-action");

                if (command == "delete") {
                    document.body.classList.add("loading")
                    var dta = await new AttachmentApi().Delete(Page.Param("card-id"), item.id);
                    console.log(dta.RawText);
                    window.location.reload();
                }
            })
        })

        // Element.querySelector("button")!.addEventListener("click", async _ => {
        //     var p = await new TrelloConnectCards().GetAttachment(item.id);
        //     console.log(JSON.stringify(p, null, " "));

        // })

        let img = Element.querySelector("img")!;
        img.addEventListener("click", _ => {

            if (img.hasAttribute("data-src")) {
                img.src = img.getAttribute("data-src")!;
                img.removeAttribute("data-src");
            }

        })

        return Element;
    }

    constructor(src: string) {
        super(src);

    }
}
