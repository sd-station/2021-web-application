import { ITrelloEmoji } from "emoji-api";
import { IButtonOption, HeaderButton } from "../../../app/define/header-button.js"
import { Page } from "../../../app/page/page.js"
 

export class EmojiInitializer {
    RootElement!: ShadowRoot | Document;


    async initialize() {



        Page.Include("/app/define/header-button")


        var datastream = await fetch("/trello/emoji/api/emoji.json");
        const data = (await datastream.json()).trello as ITrelloEmoji[];

    

        var headers = this.RootElement.querySelector("flex-container")!;
        var grid = this.RootElement.querySelector("#item-container")!;

        var cat = [] as string[];


        var opt = { Title: "Recent" } as IButtonOption
        opt.name = "recent";
        opt.Icon = `/assets/icons/emoji/${opt.name}.svg`;


        var k = new HeaderButton(opt);
        headers.appendChild(k);


        data.forEach(itm => {
            if (cat.indexOf(itm.category) >= 0) return;
            cat.push(itm.category);

            var opt = { Title: itm.category } as IButtonOption
            opt.name = itm.category.split(" ")[0].toLowerCase();
            opt.Icon = `/assets/icons/emoji/${opt.name}.svg`;


            var k = new HeaderButton(opt);
            headers.appendChild(k);

            k.onclick = () => {

                ShowContent(itm.category);


            }


        });


        ShowContent(cat[cat.length - 2]);



        function ShowContent(txt: string) {
            grid.innerHTML = "";
            headers.querySelectorAll(".selected").forEach(t => {
                t.classList.remove("selected");
            })
            k.classList.add("selected");

            data.filter(g => g.category == txt).forEach(icon => {
                var cr = document.createElement("emoji-icon");
                cr.title = icon.name ?? icon.shortName
                cr.textContent = " "; //  icon.native;
                grid.appendChild(cr);

                cr.setAttribute("data-id", `${icon.unified}`)
                cr.setAttribute("data-img", `${icon.sheetX} ${icon.sheetY}`)
                cr.style.backgroundPositionX = (-1 * (icon.sheetX) * 34) + "px"
                cr.style.backgroundPositionY = (-1 * (icon.sheetY) * 34) + "px"
            })
        }

    }

}
