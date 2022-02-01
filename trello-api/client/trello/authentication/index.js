import { TrelloAuthorizer } from "./lib/trello-authorizer.js";
var btnTrelloRequest = document.querySelector(".login-via-trello");
btnTrelloRequest.addEventListener("click", event => {
    event.preventDefault();
    new TrelloAuthorizer().NewAuthorizeRequest();
});
//# sourceMappingURL=index.js.map