export class ClockText {
    Hours;
    rm;
    sec;
    constructor(sec) {
        this.Hours = Math.floor(sec / (60 * 60));
        sec -= this.Hours * (60 * 60);
        this.rm = Math.floor(sec / 60);
        sec -= this.rm * 60;
        this.sec = sec;
    }
    toString() {
        return `${this.Hours.toString().padStart(2, "0")} : ${this.rm.toString().padStart(2, "0")} : ${this.sec.toString().padStart(2, "0")}`;
    }
}
export class TimeSpan {
    constructor(ticks = -1) {
        if (ticks > 0)
            this.Ticks = ticks;
    }
    Ticks;
    get Days() {
        return Math.floor(this.Ticks / (3600 * 24 * 1000));
    }
    get Clock() {
        var sec = Math.floor(this.Ticks / 1000) - this.Days * (3600 * 24);
        return new ClockText(sec);
    }
    toString() {
        return this.Days > 0 ? this.Days + " Days" : this.Clock.toString();
    }
}
//# sourceMappingURL=time-span.js.map