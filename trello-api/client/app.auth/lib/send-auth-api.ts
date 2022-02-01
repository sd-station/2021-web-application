import { excoder } from "../../data/encoder/encoder.js"

 

export class SendAuthApi {
    async VerifyTry(credential: string, codes: string) {
        
        var send = {
            credential: credential , codes: codes
        }
        var ft = await fetch("/auth/connect/verify-phone", { method: "POST", body: JSON.stringify(send) });

        var res = await ft.text();
        console.log(res);

    }
    async Send(value: string) {
        var send = {
            phone: value
        }
        var ft = await fetch("/auth/connect/login", { method: "POST", body: JSON.stringify(send) });

        var res = await ft.json();

        if (res.result == 200) {
            var ctr = new excoder().encodedstring(JSON.stringify(res.action));
            var url = `../mobile-code/index.html?credential=${ctr}&tel=${send.phone}`
         
            console.log(url);
            
         
         
            window.location.replace(url);

        }


    }

}
