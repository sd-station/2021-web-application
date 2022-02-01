export class TrelloAuthorizer {
    NewAuthorizeRequest() {
        var hl = window.location.hostname;
        if (window.location.port.length > 3)
            hl += ":" + window.location.port;
        var link = `{link}&return_url={return-url}`
            .replace("{link}", "https://trello.com/1/authorize?" +
                [
                    "expiration=never",
                    "name=TESTPASS",
                    "scope=read,write",
                    "response_type=fragment",
                    "key={api-key}"
                ].join("&"))
            .replace("{api-key}", "4525dacfc9f7344c608461dfe0637059")
            .replace("{return-url}", encodeURIComponent(`http://${hl}/verification/trello/generate`));

        if (parent == self) window.location.assign(link);
        else {
            var log = document.querySelector("#report-text")!
            var a = document.createElement("a")
            a.innerHTML = "Generated Link for trello login";
            a.href = link;
            a.target = "_top"
            log.appendChild(a);
        }
    }
}