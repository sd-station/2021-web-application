import { TSAU } from "../main-window/lib/data-selection-trello.js"

 
class UserSelection {
    
    
    public get Supported() : boolean {
        var w = window as Window;
        while (w != w.parent) w = w.parent
        return w.data != undefined ; 
    }
    
    SetAndUpdate(arg0: TSAU, id: string, name: string) {
        this.trello[arg0].id = id;
        this.trello[arg0].name = name;
        this.SaveAndUpdate(arg0);
    }
    Loaded() {
        return new Promise(async resolve => {
            var w = window as Window;
            while (w != w.parent) w = w.parent;

            if (w.data) resolve(true);

            await new Promise(r => setTimeout(r, 1000));

            if (w.data) resolve(true);

        })
    }
    SaveAndUpdate(arg0: TSAU) {
        var w = window as Window;
        while (w != w.parent) w = w.parent
        return w.data.selection.SaveAndUpdate(arg0);
    }
 
    public get trello() {
        var w = window as Window;
        while (w != w.parent) w = w.parent
        return w.data.selection.trello
    }

    public get account() {
        var w = window as Window;
        while (w != w.parent) w = w.parent
        return w.data.selection.account
    }

    public get setting() {
        var w = window as Window;
        while (w != w.parent) w = w.parent
        return w.setting
    }

}

export const User = new UserSelection();
