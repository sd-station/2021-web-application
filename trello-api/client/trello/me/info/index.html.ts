import { Page } from "../../../app/page/page.js"
import { User } from "../../../app/user/User.js"
import { TrelloMemberApi } from "../../api/member-api.js"

 

var loader = await new TrelloMemberApi().GetItem(User.trello.member.id);

Page.log("member", loader)
