import { TimeSpan } from "./time-span.js";
export class DateDistance {
    InFuture(x) {
        this.Before = new Date();
        this.After = x;
        return this;
    }
    InPast(start_date) {
        this.Before = start_date;
        this.After = new Date();
        return this;
    }
    get SpendTime() {
        var x = new TimeSpan();
        x.Ticks = Math.abs(this.After.getTime() - this.Before.getTime());
        if (x.Days > 0)
            return `${x.Days} Days`;
        var c = x.Clock;
        if (c.Hours == 0)
            return "A few moment ago";
        return `${c.Hours} Hours Ago`;
        return `${c.toString()}`;
    }
    BetweenDates(arg0, date) {
        this.Before = arg0;
        this.After = date;
        return this;
    }
    ToNow(TargetDate) {
        this.Before = TargetDate;
        this.After = new Date();
        return this;
    }
    Before;
    After;
    get Remaining() {
        if (this.Before.getTime() > this.After.getTime())
            return "Past";
        return "time remain";
    }
    get Distance() {
        // To calculate the time difference of two dates
        var Difference_In_Time = this.After.getTime() - this.Before.getTime();
        var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
        if (Difference_In_Days == 0) {
            return `Today ${this.Before.getHours()}:${this.Before.getMinutes()}`;
        }
        return Difference_In_Days + " Days Before";
    }
    get Remains() {
        // To calculate the time difference of two dates
        console.log(this.After);
        var Difference_In_Time = this.After.getTime() - this.Before.getTime();
        var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
        var sec = Math.floor(Difference_In_Time / 1000);
        var rh = Math.floor(sec / (60 * 60));
        sec -= rh * (60 * 60);
        var rm = Math.floor(sec / 60);
        sec -= rm * 60;
        if (Difference_In_Days == 0) {
            return `${rh}:${rm}:${sec}`;
        }
        return Difference_In_Days + " Days Remaining";
    }
    get Duration() {
        // To calculate the time difference of two dates
        var Difference_In_Time = Math.abs(this.After.getTime() - this.Before.getTime());
        var sec = Math.floor(Difference_In_Time / 1000);
        var days = Math.floor(sec / (3600 * 24));
        sec -= days * (3600 * 24);
        var rh = Math.floor(sec / (60 * 60));
        sec -= rh * (60 * 60);
        var rm = Math.floor(sec / 60);
        sec -= rm * 60;
        let pv = "";
        if (days > 0) {
            pv = days + " Day, ";
        }
        return `${pv}${rh}:${rm} Min`;
    }
}
//# sourceMappingURL=DateDistance.js.map