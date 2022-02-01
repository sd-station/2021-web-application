import { AppConfig } from "../../../app/lib/guid.js";
export class AuthClass {
}
export class AccountDataHandler {
    List = [];
    constructor() {
        this.Load();
    }
    Add(info) {
        this.List.push(info);
        this.Save();
    }
    Load() {
        var dta = localStorage.getItem(new AppConfig().Cookie.Auth);
        if (dta) {
            var data = JSON.parse(dta);
            data.forEach(itm => {
                //todo : decode
                this.List.push(itm);
            });
        }
    }
    Save() {
        localStorage.setItem(new AppConfig().Cookie.Auth, JSON.stringify(this.List));
    }
}
//# sourceMappingURL=AuthHandler.js.map