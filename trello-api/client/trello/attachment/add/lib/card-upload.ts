import { Page } from "../../../../app/page/page.js";
import { User } from "../../../../app/user/User.js"


export class TrelloConnect_Card_Upload {

    AfterSuccess?: (state: number, data: any) => void;
    OnProgress?: (A: number) => void;
    XHReq?: XMLHttpRequest;
    createAndSendForm(file: string | Blob) {

        var formData = new FormData();
        formData.append("key", User.trello.app.id);
        formData.append("token", User.trello.auth.id);
        formData.append("file", file);
        // formData.append("mimeType", "image/png");
        // formData.append("name", "My Awesome File");
        // formData.append("mimeType", "image/png"); // Optionally, set mimeType if needed.
        var request = this.createRequest();
        request.send(formData);
    };

    createRequest( ) {
        var nk = this;
        let XHReq = new XMLHttpRequest();
        this.XHReq = XHReq;
        XHReq.responseType = "json";

        if (this.OnProgress) {
            XHReq.upload.addEventListener("progress", (e) => {
                let loaded = e.loaded;
                let total = e.total;
                var pc = (loaded / total * 100);
                if (this.OnProgress) this.OnProgress(pc);
            }, false);
        }

        XHReq.onreadystatechange = function () {
            // When we have a response back from the server we want to share it!
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
            if (XHReq.readyState === 4) {
               if(nk.AfterSuccess) nk.AfterSuccess(XHReq.status, XHReq.response);
                // TrelloCardPreview.AddSendMessage_Image(request.response);
            }
        }
        XHReq.open("POST", `https://api.trello.com/1/cards/${Page.Param("card-id")}/attachments/`);
        return XHReq;
    }

    Aboart() {
        console.log("Cancel Request Passed");

       if(this.XHReq) this.XHReq.abort();
    }
}
