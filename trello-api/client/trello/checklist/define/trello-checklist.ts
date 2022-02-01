import { ITrelloCheckList } from "trello-check-list-api";
import { excoder } from "../../../data/encoder/encoder.js";
import { FormBuilder } from "../../../app/form-builder/FormBuilder.js";
import { AppModal } from "../../../app/modal/app-modal.js";
import { Page } from "../../../app/page/page.js";
import { CheckItemApi } from "../../api/checkitem-api.js";
import { csTrelloCheckItem } from "../../checkitem/define/trello-checkitem.js";

export class csTrelloChecklist extends HTMLElement {
    container!: ShadowRoot;
    item !: ITrelloCheckList;
    InitalizeComponent(): any {
        // Create a shadow root
        this.container = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {

        if (this.hasAttribute("data-src")) {
            this.item = JSON.parse(this.getAttribute("data-src")!);
            this.removeAttribute("data-src");
        }

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
        this.innerHTML =
            await Page.GetComponent("/trello/checklist/define/trello-checklist.html", {
                "title": this.item.name
            })

        var btnnew = this.querySelector(".new-check-item")!;

        this.Display_CheckItems();

        btnnew.addEventListener("click", _ => {
            var M = new AppModal();

            var fb = new FormBuilder();
            fb.textarea("title")
            fb.OnSubmit = async () => {
                var dta = await new CheckItemApi().AddCheckItem(this.item.id, { name: fb.Inputs.get("title")!.value });
                this.item.checkItems.push(dta.data);
                Page.CloseModal();
                this.Display_CheckItems();
            }
            fb.finilize();
            M.Show(fb.element);

        })

    }
    Display_CheckItems() {
        var cc = this.querySelector(".checkitem-container")!;
        cc.innerHTML = "";
        this.item.checkItems.forEach(chk => {
            var el = document.createElement("trello-checkitem") as csTrelloCheckItem;
            el.dir = "auto";
            el.setAttribute("data-src", JSON.stringify(chk));
            el.setAttribute("data-card-id", this.item.idCard);
            cc.appendChild(el);

            el.addEventListener("on-request", async ev => {
                var ctr = (ev as CustomEvent).detail as string;

                if (ctr.startsWith("duplicate/")) {
                    var id = ctr.substring("duplicate/".length);

                    var itx = this.item.checkItems.filter(n => n.id == id)[0];

                    var name = itx.name;
                    if (name.startsWith("eyJjcm")) {
                        name = JSON.parse(new excoder().decode(name)).text;
                    }
                    //  var cardid = this.getAttribute("data-card-id")!
                    var x = await new CheckItemApi().Duplicate(
                        this.item.idCard,
                        itx.idChecklist,
                        itx.id,
                        name
                    );

                    this.item.checkItems.push(x);
                    this.Display_CheckItems();
                }

                if (ctr.startsWith("delete/")) {
                    var id = ctr.substring("delete/".length);

                    var itx = this.item.checkItems.filter(n => n.id == id)[0];

                    Page.WaitForConformation("Delete item", async () => {
                        var x = await new CheckItemApi().Delete(this.item.id, itx.id);

                        this.item.checkItems = this.item.checkItems.filter(o => o.id != id)
                        this.Display_CheckItems();
                    }, { action: "none" })

                }
                if (ctr.startsWith("edit/")) {
                    var id = ctr.substring("edit/".length);
                    var itx = this.item.checkItems.filter(n => n.id == id)[0];

                    //>>> Decode item
                    var name = itx.name;
                    if (name.startsWith("eyJjcm")) {
                        name = JSON.parse(new excoder().decode(name)).text;
                    }

                    var M = new AppModal();

                    var fb = new FormBuilder();
                    fb.textarea("title" ,name )
                    fb.OnSubmit = async () => {
                        var dta = await new CheckItemApi().UpdateItem(this.item.idCard, id ,  { name: fb.Inputs.get("title")!.value });
                       
                        itx.name = name
                        Page.CloseModal();
                        this.Display_CheckItems();
                    }
                    fb.finilize();
                    M.Show(fb.element);
                }



            })
        })
    }

    constructor() {
        super();
        /// uncomment to use shadow
        //this.InitalizeComponent();
    }
}

window.customElements.define("trello-checklist", csTrelloChecklist)
