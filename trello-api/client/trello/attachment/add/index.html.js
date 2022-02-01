import { Span } from "../../../Lib/Span.html.js";
import { AttachmentEditor } from "./attachment-editor.js";
import { TrelloConnect_Card_Upload } from "./lib/card-upload.js";
var XS = new TrelloConnect_Card_Upload();
function OnCancelRequest() {
    XS.Aboart();
}
function ShowProgress(value) {
    document.querySelector("#progress-bar").innerHTML = value.toString();
}
var form = new AttachmentEditor();
form.btnSelectImage.addEventListener("click", _ => {
    form.InputFile.Element.click();
});
form.btnCancelUpload.addEventListener("click", _ => {
    OnCancelRequest();
});
form.InputFile.Element.addEventListener("change", _ => {
    const myFiles = form.InputFile.Element.files;
    if (!myFiles || myFiles.length <= 0)
        return;
    console.clear();
    console.log("file-is-selected");
    var img = ["image/png", "image/jpeg"];
    document.body.classList.add("loading");
    XS.OnProgress = A => {
        ShowProgress(A);
    };
    XS.AfterSuccess = (number, resitem) => {
        if (number == 200) {
            document.body.classList.remove("loading");
        }
        else {
            SendFailer(number, resitem);
        }
    };
    XS.createAndSendForm(myFiles[0]);
    //>> Add to Preview
});
function SendFailer(number, resitem) {
    document.body.appendChild(new Span(resitem));
}
// form.btnSubmit.addEventListener("click", async _ => {
//     document.body.classList.add("loading")
//     var p = await new TrelloConnectCards()
//         .AddComment(Page.Param("card-id"), form.txtMessageText.Text) as ITrelloActionComment;;
//     window.location.replace("/trello/card/pages/attachments/index.html")
// })
//# sourceMappingURL=index.html.js.map