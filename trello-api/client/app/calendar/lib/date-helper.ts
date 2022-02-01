export class DateHelper {
    SameDate(arg0: Date) {
        return this.date.toISOString().startsWith(arg0.toISOString().substring(0, 10))
    }

    date: Date;

    FromTicks(tick: number) {
        this.date = new Date(tick);
    }
    FromString(datestr: string) {
        this.date = new Date(datestr);
    }
    constructor() {
        this.date = new Date();
    }


    public get Iso(): string {
        return this.date.toISOString();
    }

    public get IsoDateString(): string {
        return this.date.toISOString().substring(0, 10);
    }

    public get IsToday(): boolean {
        return this.date.toISOString().startsWith(new Date().toISOString().substring(0, 10))
    }

    public get DayOfMonth(): string {
        return this.date.getDate().toString();
    }
}