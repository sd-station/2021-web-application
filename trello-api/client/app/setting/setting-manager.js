export class AppsettingManager {
    data = {
        offline: false,
        lastsession: {
            keep: "none",
            link: ""
        }
    };
    UselastSession() {
        if (!this.data.lastsession.keep)
            return false;
        if (this.data.lastsession.link.length == 0)
            return false;
        if (this.data.lastsession.keep == "none")
            return false;
        if (this.data.lastsession.keep == "session")
            return false;
        return true;
    }
    Save() {
        localStorage.setItem("app-setting-data", JSON.stringify(this.data));
    }
    Load() {
        if (localStorage.getItem("app-setting-data")) {
            var data = JSON.parse(localStorage.getItem("app-setting-data"));
            this.data = data;
        }
    }
}
//# sourceMappingURL=setting-manager.js.map