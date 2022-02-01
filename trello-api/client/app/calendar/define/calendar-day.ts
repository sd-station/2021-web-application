import { NavigationLink } from "../../../html/NavigationLink.js";
import { Page } from "../../page/page.js"
import { DateHelper } from "../lib/date-helper.js"



export class csCalendarDay extends HTMLElement {
    container!: ShadowRoot;
    date: DateHelper = new DateHelper();

    InitalizeComponent(): any {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.Display_Data();
    }
    //disconnectedCallback() {
    //...
    //}
    //ributeChangedCallback(name, oldValue, newValue) {
    //...
    //
    //doptedCallback() {
    //...
    //

    /**
     * Display Item
     */
    async Display_Data() {

        this.innerHTML = await Page.GetComponent("/app/calendar/define/calendar-day.html")

        var datestring = this.getAttribute("data-date") as string;
        this.date.FromTicks(parseInt(datestring));
        var tm = this.querySelector("time")!;
        tm.dateTime = this.date.Iso;
        tm.textContent = this.date.DayOfMonth;


        if (this.date.IsToday) this.classList.add("date-today");


    }

    UpdateDisplay() {
        if (this.date.IsToday) this.classList.add("date-today"); else this.classList.remove("date-today");

        var collection = window.calendar.items[this.date.IsoDateString];
        var tgc = this.querySelector(".tag-container")!
        tgc.innerHTML = "";

        if (collection && collection.length > 0) {
            console.log(collection, collection.length > 0);
            collection.forEach(itm => {

                var txt = itm.icon ? `<span>${itm.icon}</span>` : "";
                txt += `<span class="text">${itm.Display}</span>`;
              
                var a = new NavigationLink()
                    .SetClass("time-tag-item") 
                    .SetHtml(txt)
                    .SetLink("/trello/card/view/index.html")
                    .AddParam("card-id" , itm.id )
                    ;

             
                if (itm.theme) a.SetClass("theme-" + itm.theme);

                if (itm.state == "normal") {
                } else {
                    a.SetClass(itm.state);
                }

                a.element.title = itm.title;
                tgc.appendChild(a.element);
            });
        }
    }

    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();

        this.addEventListener("click" , event =>{

            var akr = new CustomEvent("on-request" , {
                detail:`select-date/${this.date.IsoDateString}`
            });

            document.querySelector(
                "calendar-box" 
            )!.dispatchEvent(akr);
        })
    }


}

window.customElements.define("calendar-day", csCalendarDay)




