class UserSelection {
    get Supported() {
        var w = window;
        while (w != w.parent)
            w = w.parent;
        return w.data != undefined;
    }
    SetAndUpdate(arg0, id, name) {
        this.trello[arg0].id = id;
        this.trello[arg0].name = name;
        this.SaveAndUpdate(arg0);
    }
    Loaded() {
        return new Promise(async (resolve) => {
            var w = window;
            while (w != w.parent)
                w = w.parent;
            if (w.data)
                resolve(true);
            await new Promise(r => setTimeout(r, 1000));
            if (w.data)
                resolve(true);
        });
    }
    SaveAndUpdate(arg0) {
        var w = window;
        while (w != w.parent)
            w = w.parent;
        return w.data.selection.SaveAndUpdate(arg0);
    }
    get trello() {
        var w = window;
        while (w != w.parent)
            w = w.parent;
        return w.data.selection.trello;
    }
    get account() {
        var w = window;
        while (w != w.parent)
            w = w.parent;
        return w.data.selection.account;
    }
    get setting() {
        var w = window;
        while (w != w.parent)
            w = w.parent;
        return w.setting;
    }
}
export const User = new UserSelection();
//# sourceMappingURL=User.js.map