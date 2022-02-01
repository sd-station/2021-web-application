export class DateHelper {
    SameDate(arg0) {
        return this.date.toISOString().startsWith(arg0.toISOString().substring(0, 10));
    }
    date;
    FromTicks(tick) {
        this.date = new Date(tick);
    }
    FromString(datestr) {
        this.date = new Date(datestr);
    }
    constructor() {
        this.date = new Date();
    }
    get Iso() {
        return this.date.toISOString();
    }
    get IsoDateString() {
        return this.date.toISOString().substring(0, 10);
    }
    get IsToday() {
        return this.date.toISOString().startsWith(new Date().toISOString().substring(0, 10));
    }
    get DayOfMonth() {
        return this.date.getDate().toString();
    }
}
//# sourceMappingURL=date-helper.js.map