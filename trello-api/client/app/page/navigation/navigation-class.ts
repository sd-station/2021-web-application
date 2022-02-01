export class NavigationClass {
    Link!: string;
    NavigateTo(link: string) {
       this.SetLink(link);
       window.location.assign(this.Link);
    }
    SetLink(url : string) {
        url = url.replaceAll("-", "/")
        if (!url.startsWith("/")) url = "/" + url;
        if (!url.startsWith("/trello")) url = "/trello" + url;
        if (!url.endsWith("/index.html")) url += "/index.html";
        this.Link = url;
    }
    goback() {
        window.history.back();
    }
    Navigate(url: string, keephistory = false) {
        url = url.replaceAll("-", "/")
        if (!url.startsWith("/")) url = "/" + url;
        if (!url.startsWith("/trello")) url = "/trello" + url;
        if (!url.endsWith("/index.html")) url += "/index.html";
  
      
       if (keephistory) window.location.assign(url);
       else window.location.replace(url)
    }

}