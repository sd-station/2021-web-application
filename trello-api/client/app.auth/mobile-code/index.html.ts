import { Page } from "../../app/page/page.js"
import { PageParameters } from "../../Lib/searchoptions.js"
import { SendAuthApi } from "../lib/send-auth-api.js"

 

Page.IsLoaded = true;

var phonecode = document.querySelector("#txt-phone-number") as HTMLInputElement;
var codenumber = document.querySelector("#txt-code-number") as HTMLInputElement;
var codebody = document.querySelector("#code-body") as HTMLElement;
var inpset = codebody.querySelectorAll("input");
inpset.forEach((inp, i) => {
    inp.addEventListener("input", event => {
        event.preventDefault();
        if (inp.value.length > 0) {
            if (i < inpset.length - 1) {
                inpset[i + 1].focus(); return;
            }
            var valid = true;
            var codes = "";
            inpset.forEach(element => {
                if (!valid) return;
                
                if (element.value.trim().length == 0) {
                    valid = false;
                    element.focus();
                    return;
                }

                var chr = element.value.trim()[0];
                if (!(chr <='9' && chr >'0')) {
                    valid = false;
                    element.focus();
                    return;
                }
                codes += chr;
            });
            if (!valid) return;
         
            codenumber.value = codes ;
          
            
            confirmcode(codes)

        }
    })

    inp.addEventListener("focus", event => {
        event.preventDefault();
        inp.select()
    })


})

inpset[0].focus();


var tel = new PageParameters().searchoptions["tel"];
phonecode.value = tel ;



async function confirmcode(codes: string) {
    var credential = new PageParameters().searchoptions["credential"];
  var opr =   await new SendAuthApi().VerifyTry(credential , codes );

}

