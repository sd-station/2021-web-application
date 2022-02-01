export class NavigationClass {
    Link;
    NavigateTo(link) {
        this.SetLink(link);
        window.location.assign(this.Link);
    }
    SetLink(url) {
        url = url.replaceAll("-", "/");
        if (!url.startsWith("/"))
            url = "/" + url;
        if (!url.startsWith("/trello"))
            url = "/trello" + url;
        if (!url.endsWith("/index.html"))
            url += "/index.html";
        this.Link = url;
    }
    goback() {
        window.history.back();
    }
    Navigate(url, keephistory = false) {
        url = url.replaceAll("-", "/");
        if (!url.startsWith("/"))
            url = "/" + url;
        if (!url.startsWith("/trello"))
            url = "/trello" + url;
        if (!url.endsWith("/index.html"))
            url += "/index.html";
        if (keephistory)
            window.location.assign(url);
        else
            window.location.replace(url);
    }
}
//# sourceMappingURL=navigation-class.js.map