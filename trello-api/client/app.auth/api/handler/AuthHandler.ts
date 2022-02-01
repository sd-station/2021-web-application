import { AppConfig } from "../../../app/lib/guid.js";

 

export interface IAuthCookie { key: string; token: string; }
export class AuthClass {

}
export class AccountDataHandler {

    List: AuthClass[] = [];

    constructor() {
        this.Load();
    }

    Add(info: IAuthCookie) {
        this.List.push(info);
        this.Save();
    }


    Load() {
        var dta = localStorage.getItem(new AppConfig().Cookie.Auth);
        if (dta) {
            var data = JSON.parse(dta) as IAuthCookie[];
            data.forEach(itm => {
                //todo : decode
                this.List.push(itm as IAuthCookie)
            });
        }
    }

    Save() {
        localStorage.setItem(new AppConfig().Cookie.Auth, JSON.stringify(this.List));

    }
}
