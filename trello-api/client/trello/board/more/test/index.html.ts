import { ITrelloBoard } from "trello-api";

const link = "https://api.trello.com/1/members/hosseinsedighian1/boards";
function GetBoards() {

    return fetch(link).then(k => k.json()).then(p => {
        return p as ITrelloBoard[];
    })


}

var data = await  GetBoards();
document.body.innerHTML += `<pre>
${JSON.stringify(data, null, " ")}</pre>`;

