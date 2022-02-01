import { INSpaceTask } from "n-space";
import { ITrelloCheckItem, ITrelloCheckList } from "trello-check-list-api";
import { excoder } from "../../../data/encoder/encoder.js";
import { DataSourceAttr } from "../../../ui/lib/DataSourceAttr.js";
 
import { Page } from "../../../app/page/page.js";
import { DateDistance } from "../../../Lib/DateDistance.js";
import { CheckItemApi } from "../../api/checkitem-api.js";

export class csTrelloCheckItem extends HTMLElement {
    container!: ShadowRoot;
    item!: ITrelloCheckItem;
    InitalizeComponent(): any {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {

        var ds = new DataSourceAttr(this);
        if(ds.hasitem){
            this.item = ds.ItemOf<ITrelloCheckItem>();
            this.Display_Data();
        }

       

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

        var opt = {
            "title": this.item.name,
            "info" :""
        }


        if (opt.title.startsWith("eyJjcm")) {
            console.log("Encoding", new excoder().decode(opt.title));

            var InTask = JSON.parse(new excoder().decode(opt.title)) as INSpaceTask;
            opt.title = InTask.text;
            opt.info = new DateDistance().InPast(new Date(InTask.create)).SpendTime;
        }
        this.innerHTML = await Page.GetComponent("/trello/checkitem/define/trello-checkitem.html", opt)



        this.classList.add(this.item.state)

        var checkbox = this.querySelector(".check-box")!;

        checkbox.addEventListener("click", async _ => {
            if (this.classList.contains("state-changed")) return;

            var ischecked = this.classList.contains("complete");


            ischecked = !ischecked;

            if (ischecked) {
                this.classList.add("complete")
                this.classList.remove("incomplete")
            } else {
                this.classList.add("incomplete")
                this.classList.remove("complete")
            }

            this.classList.add("state-changed")


            var cardid = this.getAttribute("data-card-id")!
            await new CheckItemApi().CheckUpdate(cardid, this.item.id, ischecked);

            setTimeout(() => {
                this.classList.remove("state-changed")
            }, 500);
        })


        //>> Duplicate
        this.querySelector(".btn-dublicate")!.addEventListener("click", async _ => {
            this.dispatchEvent(new CustomEvent("on-request", { detail: `duplicate/${this.item.id}` }))
        })

        //! Delete
        this.querySelector(".btn-delete")!.addEventListener("click", async _ => {
            this.dispatchEvent(new CustomEvent("on-request", { detail: `delete/${this.item.id}` }))
        })

         //> Edit
         this.querySelector(".btn-edit")!.addEventListener("click", async _ => {
            this.dispatchEvent(new CustomEvent("on-request", { detail: `edit/${this.item.id}` }))
        })

    }

    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}

window.customElements.define("trello-checkitem", csTrelloCheckItem)
