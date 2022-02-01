import { AppModal } from "../app/modal/app-modal.js";
import { Page } from "../app/page/page.js";
Page.IsLoaded = true;
var Am = new AppModal();
Am.config.close.auto = false;
var url = "./mobile/index.html";
//url = "./mobile-code/index.html?credential=eyJpZCI6IjI5MjAtYjQ1Ny1iNGM0LWU5OWQiLCJudW1iZXIiOjEsInRyeSI6Mn0=&tel=9360013397";
Am.InitializeFrame(url);
window.onmessage = event => {
    event.preventDefault();
    console.log(event.data);
};
//# sourceMappingURL=index.html.js.map