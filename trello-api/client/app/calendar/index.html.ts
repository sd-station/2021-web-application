import { ITrelloBoard } from "trello-api";
import { ITrelloCard } from "trello-card-api";
import { TrelloBoardApi } from "../../trello/api/board-api.js";
import { TrelloCardApi } from "../../trello/api/card-api.js";
import { Page } from "../page/page.js";
import { User } from "../user/User.js";
import { csCalendarDay } from "./define/calendar-day.js";
import { csDayInfo } from "./define/day-info.js";
import { DateHelper } from "./lib/date-helper.js";

Page.Include("/app/calendar/define/calendar-month")
Page.Include("/app/calendar/define/calendar-day")
Page.IsLoading();
declare global {
    interface Window {
        calendar: CalendarData;
    }
}
export interface ICalendarItem {
    icon: string;
    theme: string;
    title: string;
    state: "normal" | "warning" | "success" | "danger";

    type: string;
    id: string;
    Display: string;

}
class CalendarData {
    items: { [x: string]: ICalendarItem[] } = {};

}

window.calendar = new CalendarData();

var calendarbox = document.querySelector("calendar-box")!;
var cdate = new Date();
var cyear = cdate.getFullYear();
var cmonth = cdate.getMonth();
for (let ix = 0; ix < 3; ix++) {
    //<calendar-month data-year="2021" data-month="09"></calendar-month>;



    var cm = document.createElement("calendar-month");
    cm.setAttribute("data-year", cyear.toString());
    cm.setAttribute("data-month", (cmonth + 1).toString());
    calendarbox.appendChild(cm);

    cmonth += 1;

    if (cmonth > 11) { cmonth = 0; cyear++ }

}


async function AddData() {

    var boards = await new TrelloBoardApi().ofMember(User.trello.member.id);

    boards.ToListOf<ITrelloBoard>().forEach(async brd => {

        var data = await new TrelloCardApi().OfBoard(brd.id);

        var DH = new DateHelper();
        if (!data.HasList) return;

        var collection = data.ToListOf<ITrelloCard>();

        collection
            .forEach(u => {

                if (u.due) {
                    DH.FromString(u.due);
                    if (!window.calendar.items[DH.IsoDateString])
                        window.calendar.items[DH.IsoDateString] = []
                    var nt = {} as ICalendarItem;
                    nt.type = "card";
                    nt.id = u.id;
                    nt.Display = u.name;
                    nt.state = "warning";
                    nt.title = `End Date ${u.name} ( ${brd.name} )`
                    nt.icon = `  <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 1 18 20"><path d="M6 1L6 3L3 3L3 21L9 21L9 19L5 19L5 8L19 8L19 19L15 19L15 21L21 21L21 3L18 3L18 1L16 1L16 3L8 3L8 1L6 1 z M11 11L11 17L13 17L13 11L11 11 z M11 19L11 21L13 21L13 19L11 19 z"></path></svg>`;
                    if (u.cover.color) nt.theme = u.cover.color;
                    window.calendar.items[DH.IsoDateString].push(nt);

                    if (u.dueComplete) {
                        nt.state = "success";
                        nt.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1.48500001430511 2 21.0299993753433 20"><path d="M22.515,12L20,9.401l0.507-3.581l-3.562-0.625L15.249,2L12,3.588L8.751,2L7.056,5.195L3.493,5.82L4,9.401L1.485,12L4,14.599L3.493,18.18l3.562,0.625L8.751,22L12,20.412L15.249,22l1.695-3.195l3.562-0.625L20,14.599L22.515,12z M11,16.414 l-3.707-3.707l1.414-1.414L11,13.586l5.293-5.293l1.414,1.414L11,16.414z"></path></svg>`;
                        return;
                    }
                }

                if (u.start) {
                    DH.FromString(u.start);
                    if (!window.calendar.items[DH.IsoDateString])
                        window.calendar.items[DH.IsoDateString] = []
                    var nt = {} as ICalendarItem;
                    nt.type = "card";
                    nt.id = u.id;
                    nt.Display = u.name;
                    nt.icon = `  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 22"><path d="M6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C9.3 12 12 9.3 12 6C12 2.7 9.3 0 6 0 z M6 2C8.2 2 10 3.8 10 6C10 8.2 8.2 10 6 10C3.8 10 2 8.2 2 6C2 3.8 3.8 2 6 2 z M16 2L16 4L13.738281 4C13.903281 4.64 14 5.308 14 6C14 7.062 13.788109 8.073 13.412109 9L19 9L19.001953 20L5 20L5 13.931641C4.301 13.844641 3.631 13.668109 3 13.412109L3 20C3 21.105 3.895 22 5 22L19 22C20.105 22 21 21.105 21 20L21 4L18 4L18 2L16 2 z M6.9003906 3.1992188L5.1992188 6.0996094L7.4003906 8.3007812L8.3007812 7.3007812L6.8007812 5.9003906L8 3.8007812L6.9003906 3.1992188 z"></path></svg>`
                    nt.state = "normal";
                    nt.title = `Begin ${u.name} ( ${brd.name} )`
                    if (u.cover.color) nt.theme = u.cover.color;
                    window.calendar.items[DH.IsoDateString].push(nt)
                }

            }) //end cards

        document.querySelectorAll("calendar-month")
            .forEach(m => {

                m.shadowRoot?.querySelectorAll("calendar-day")
                    .forEach(el => {
                        (el as csCalendarDay).UpdateDisplay()
                    })

            })

    })//end board

    Page.LoadComplete();

}//end func

setTimeout(() => {

    AddData();
}, 1000);

calendarbox.addEventListener("on-request", event => {
    var datacommand = (event as CustomEvent).detail as string;

    console.log(datacommand);

    var k = new csDayInfo();
    k.setAttribute("data-date", datacommand.split("/")[1]);
    
    Page.CreateModal(k);

})

 