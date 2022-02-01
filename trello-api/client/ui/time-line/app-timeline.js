import { Page } from "../../app/page/page.js";
import { DateDistance } from "../../Lib/DateDistance.js";
import { UiComponent } from "../lib/UiComponent.js";
export var IState;
(function (IState) {
    IState["default"] = "default";
    IState["StartAfter"] = "time-front";
    IState["StartBefore"] = "start-before";
    IState["unknown"] = "unknown";
    IState["dueBefore"] = "time-before";
    IState["dueAfter"] = "due-after";
    IState["TimeFront"] = "time-front";
    IState["TimeIn"] = "time-in";
    IState["TimeFinished"] = "time-before";
    IState["complete"] = "complete";
})(IState || (IState = {}));
export class csAppTimeline extends HTMLElement {
    container;
    states = [];
    times = {
        start: new Date(),
        due: new Date()
    };
    get State() {
        if (this.states.length == 0)
            return IState.default;
        var conditions = new Map();
        conditions.set(IState.complete, ["complete"]);
        conditions.set(IState.TimeFront, ["start-after", "due-after"]);
        conditions.set(IState.TimeIn, ["start-before", "due-after"]);
        conditions.set(IState.TimeFinished, ["start-before", "due-before"]);
        conditions.set(IState.StartBefore, ["start-before"]);
        conditions.set(IState.StartAfter, ["start-after"]);
        conditions.set(IState.dueBefore, ["due-before"]);
        conditions.set(IState.dueAfter, ["due-after"]);
        for (const [key, value] of conditions.entries()) {
            if (value.every(h => this.states.includes(h))) {
                return key;
            }
        }
        return IState.unknown;
    }
    InitalizeComponent() {
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
        this.states = [];
        this.AnalyzeTimes();
        this.DisplayTheme();
    }
    async DisplayTheme() {
        var txt = await Page.GetComponent("/ui/time-line/app-timeline.default.html");
        var Initlizer = new UiComponent(txt);
        this.classList.add(...this.states);
        Initlizer.Add("shared");
        switch (this.State) {
            case IState.complete:
                Initlizer.Add(this.State);
                break;
            case IState.default:
                Initlizer.Add(this.State);
                break;
            case IState.StartAfter:
                Initlizer.Apply(this.State, {
                    "time-text": new DateDistance().InFuture(this.times.start).Remains
                });
                break;
            case IState.StartBefore:
                Initlizer.Apply(this.State, {
                    "time-text": new DateDistance().InPast(this.times.start).SpendTime
                });
                break;
            case IState.dueBefore:
                Initlizer.Apply(this.State, {
                    "time-text": "00 : 00 : 00"
                });
                break;
            case IState.dueAfter:
                Initlizer.Apply(this.State, {
                    "time-text": new DateDistance().InFuture(this.times.due).SpendTime
                });
                break;
            case IState.TimeIn:
                Initlizer.Apply(this.State, {
                    "time-text": new DateDistance().InFuture(this.times.due).SpendTime
                });
                break;
            default:
                Initlizer.Apply("unknown", {
                    "state": this.State
                });
                break;
        }
        Initlizer.init(this);
    }
    AnalyzeTimes() {
        if (this.hasAttribute("data-start")) {
            this.states.push("start");
            this.times.start = new Date(this.getAttribute("data-start"));
            if (new Date().getTime() > this.times.start.getTime()) {
                this.states.push("start-before");
            }
            else {
                this.states.push("start-after");
            }
        }
        if (this.hasAttribute("data-due")) {
            this.states.push("due");
            this.times.due = new Date(this.getAttribute("data-due"));
            if (new Date().getTime() < this.times.due.getTime()) {
                this.states.push("due-after");
            }
            else {
                this.states.push("due-before");
            }
        }
        if (this.hasAttribute("data-due-state")) {
            var stt = this.getAttribute("data-due-state");
            if (stt == "done")
                this.states.push("complete");
        }
    }
    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}
window.customElements.define("app-timeline", csAppTimeline);
//# sourceMappingURL=app-timeline.js.map