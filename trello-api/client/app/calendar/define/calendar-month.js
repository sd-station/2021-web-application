export class CalendarDateClass {
    year = -1;
    month = -1;
    get FirstDay() {
        return new Date(Date.UTC(this.year, this.month - 1, 1));
    }
    get FirstDayInWeek() {
        return this.FirstDay.getDay();
    }
    get MonthLength() {
        return new Date(this.year, this.month, 0).getDate();
    }
}
export class csCalendarMonth extends HTMLElement {
    container;
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
    data = new CalendarDateClass();
    /**
     * Display Item
     */
    async Display_Data() {
        this.data.year = parseInt(this.getAttribute("data-year"));
        this.data.month = parseInt(this.getAttribute("data-month"));
        var tmp = await fetch("/app/calendar/define/calendar-month.html");
        var txt = await tmp.text();
        this.container.innerHTML = txt.replace("{{title}}", `${this.data.year}-${this.data.month}`);
        var dr = document.createElement("calendar-container");
        this.container.appendChild(dr);
        for (let di = 0; di < this.data.FirstDayInWeek; di++) {
            var ch = document.createElement("calendar-hidden");
            dr.appendChild(ch);
        }
        for (let di = 0; di < this.data.MonthLength; di++) {
            var dy = document.createElement("calendar-day");
            var dta = new Date(this.data.year, this.data.month - 1, di + 1, 10, 18);
            dy.setAttribute("data-date", `${dta.getTime()}`);
            dr.appendChild(dy);
        }
    }
    constructor() {
        super();
        this.container = this.attachShadow({ mode: 'open' });
    }
}
window.customElements.define("calendar-month", csCalendarMonth);
//# sourceMappingURL=calendar-month.js.map