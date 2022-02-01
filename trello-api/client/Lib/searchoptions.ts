


export class PageParameters {

    AssignParameters(keys: string[], link: string): string {
      
        
        var connector: { key: string; value: string; }[] = []
        keys.forEach(key => {
            if (this.searchoptions[key]) connector.push({ key: key, value: this.searchoptions[key] })
        })
        if (connector.length > 0) {
            return `${link}?${connector.map(R => `${R.key}=${R.value}`).join("&")}}`;
        } else {
            return link;
        }
    }

    FirstOrDefault(key: string, defaultvalue: string) {

        if (this.searchoptions[key]) {
            return this.searchoptions[key];
        } else {
            return defaultvalue;
        }
    }

    searchoptions: { [x: string]: string } = {};
    constructor() {
        if (window.location.search.length > 1)
            window.location.search.substring(1).split("&").forEach(p => {
                this.searchoptions[p.split("=")[0]] = p.split("=")[1]
            })


    }

}



