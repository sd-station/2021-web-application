import { Page } from "../../app/page/page.js";
import { HeaderButton } from "../../app/define/header-button.js";
Page.Include("/app/define/header-button");
var datastream = await fetch("/trello/emoji/api/emoji.json");
const data = (await datastream.json()).trello;
console.log(window);
var headers = document.querySelector("flex-container");
var grid = document.querySelector("#item-container");
var cat = [];
var opt = { Title: "Recent" };
opt.name = "recent";
opt.Icon = `/assets/icons/emoji/${opt.name}.svg`;
var k = new HeaderButton(opt);
headers.appendChild(k);
data.forEach(itm => {
    if (cat.indexOf(itm.category) >= 0)
        return;
    cat.push(itm.category);
    var opt = { Title: itm.category };
    opt.name = itm.category.split(" ")[0].toLowerCase();
    opt.Icon = `/assets/icons/emoji/${opt.name}.svg`;
    var k = new HeaderButton(opt);
    headers.appendChild(k);
    k.onclick = () => {
        ShowContent(itm.category);
    };
});
ShowContent(cat[cat.length - 2]);
function ShowContent(txt) {
    grid.innerHTML = "";
    headers.querySelectorAll(".selected").forEach(t => {
        t.classList.remove("selected");
    });
    k.classList.add("selected");
    data.filter(g => g.category == txt).forEach(icon => {
        var cr = document.createElement("emoji-icon");
        cr.title = icon.name ?? icon.shortName;
        cr.innerHTML = `<span style="opacity:0">${icon.native}</span>`; //  ;
        grid.appendChild(cr);
        cr.setAttribute("data-id", `${icon.unified}`);
        cr.setAttribute("data-img", `${icon.sheetX} ${icon.sheetY}`);
        cr.style.backgroundPositionX = (-1 * (icon.sheetX) * 34) + "px";
        cr.style.backgroundPositionY = (-1 * (icon.sheetY) * 34) + "px";
    });
}
// {
// "unified": "1F600",
// "name": "GRINNING FACE",
// "native": "😀",
// "shortName": "grinning",
// "shortNames": [
// "grinning"
// ],
// "text": ":D",
// "texts": null,
// "category": "Smileys & People",
// "sheetX": 30,
// "sheetY": 24,
// "tts": "grinning face",
// "keywords": [
// "face",
// "grin",
// "grinning face"
// ]
// }
//# sourceMappingURL=index.html.js.map