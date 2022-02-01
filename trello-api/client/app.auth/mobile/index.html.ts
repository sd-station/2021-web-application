import { Page } from "../../app/page/page.js"
import { SendAuthApi } from "../lib/send-auth-api.js"

 

Page.IsLoaded = true;

var phoneEl = document.querySelector("#my-phone-number") as HTMLInputElement;
var btnSend = document.querySelector("#send-form") as HTMLButtonElement;
btnSend.addEventListener("click", async _ => {
    Page.IsLoaded = false;

    var ph = phoneEl.value.trim().replaceAll("-" , "").replaceAll(" " , "");
    while(ph.startsWith("0")) ph = ph.substring(1).trim()
    
    if (ph.length == 0) {
        phoneEl.focus();
        return;
    }



    phoneEl.readOnly = true;
    btnSend.classList.add("onclic")


    await new SendAuthApi().Send(ph);
})
