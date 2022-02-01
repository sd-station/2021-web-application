
import { TrelloBoardApi } from "../api/board-api.js";
import { NotificationApi } from "../api/notification-api.js"
import { PagesNav } from "./trello-nav.js";

class TrelloHelper {


    Workspace = { page: new PagesNav("/trello/workspace")  };
    Board = { page: new PagesNav("/trello/board") };
    list = { page: new PagesNav("/trello/list")  };
    card = { page: new PagesNav("/trello/card")  };
    message = { page: new PagesNav("/trello/message")  };

    
}

export const Trello = new TrelloHelper();
