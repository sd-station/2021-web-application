import { TrelloAuthorizer } from "./lib/trello-authorizer.js";

var btnTrelloRequest = document.querySelector(".login-via-trello") as HTMLElement;


btnTrelloRequest.addEventListener("click", event => {
    event.preventDefault();
    new TrelloAuthorizer().NewAuthorizeRequest();
});
