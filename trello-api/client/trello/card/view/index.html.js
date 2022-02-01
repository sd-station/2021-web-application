import { FormBuilder } from "../../../app/form-builder/FormBuilder.js";
import { AppModal } from "../../../app/modal/app-modal.js";
import { Page } from "../../../app/page/page.js";
import { User } from "../../../app/user/User.js";
import { TimeSpan } from "../../../Lib/time-span.js";
import { TrelloCardApi } from "../../api/card-api.js";
import { CardUpdateApi } from "../../api/card-update.api.js";
import { DueDate } from "./lib/due-date.js";
Page.Include("/trello/card/define/card-colorpicker");
Page.Include("/trello/card/define/card-timepicker");
Page.Include("/ui/time-line/app-timeline");
await Page.GetReady("#btn-delete-card");
var Timeline = document.querySelector("app-timeline");
var CurrentCardID = Page.Param("card-id");
var gx = document.querySelector("#btn-delete-card");
gx.addEventListener("click", _ => {
    Page.WaitForConformation("Delete Card", async () => {
        var g = await new TrelloCardApi().Delete(CurrentCardID);
    }, { value: "trello/card" });
});
Page.State = "loading";
var data = await new TrelloCardApi().getItem(CurrentCardID);
if (data.HasItem) {
    var itm = data.ItemOf();
    Page.SetTitle(itm.name);
    document.querySelector("[data-set='card-about-text']").textContent = itm.desc;
    if (!User.trello.card.selected || User.trello.card.id != CurrentCardID)
        User.SetAndUpdate("card", itm.id, itm.name);
    if (itm.start) {
        Timeline.setAttribute("data-start", new Date(itm.start).toString());
    }
    if (itm.due) {
        Timeline.setAttribute("data-due", new Date(itm.due).toString());
    }
    if (itm.dueComplete) {
        Timeline.setAttribute("data-due-state", "done");
    }
    var info = {};
    var timespan = new TimeSpan();
    info["id"] = itm.id;
    timespan.Ticks = new Date().getTime() - new Date(itm.dateLastActivity).getTime();
    info["last edit"] = timespan.toString();
    if (itm.start)
        info["start"] = new Date(itm.start).toLocaleString();
    if (itm.due) {
        info["due"] = new Date(itm.due).toLocaleString();
        info["State"] = itm.dueComplete ? "Complete" : "Not Complete";
    }
    if (itm.start && itm.due) {
        timespan.Ticks = new Date(itm.due).getTime() - new Date(itm.start).getTime();
        info["duration"] = timespan.toString();
    }
    if (itm.badges.checkItems > 0) {
        info["tasks"] = `${itm.badges.checkItemsChecked}/${itm.badges.checkItems}`;
    }
    if (itm.cover.color) {
        var a = document.querySelector("center-box .cover");
        a.classList.remove("default");
        a.classList.add(itm.cover.color);
    }
    if (!User.trello.list.selected)
        User.trello.list.id = itm.idList;
    Page.log("card information", data);
    var dl = document.querySelector("#item-information");
    Object.keys(info).forEach(h => {
        var dt = document.createElement("dt");
        dt.textContent = h;
        var dd = document.createElement("dd");
        dd.textContent = info[h];
        dl.appendChild(dt);
        dl.appendChild(dd);
    });
}
Page.State = "load-complete";
document.querySelectorAll("[data-action]").forEach(da => {
    da.addEventListener("click", async (_) => {
        var command = da.getAttribute("data-action");
        console.log(command);
        switch (command) {
            case "edit-cover":
                var colorpicker = document.createElement("card-colorpicker");
                colorpicker.addEventListener("on-pick-color", async (event) => {
                    var dta = event;
                    var color = dta.detail;
                    console.log(color);
                    Page.CloseModal();
                    Page.IsLoading();
                    await new CardUpdateApi().UpdateCover(CurrentCardID, color, "light");
                    Page.LoadComplete();
                });
                Page.CreateModal(colorpicker);
                break;
            case "edit-due-date":
                new DueDate().ShowModal();
                break;
            case "edit-start-date":
                new DueDate().ShowModalForStart();
                break;
            case "edit-due-complete":
                new DueDate().ToggleComplete(!itm.dueComplete);
                break;
            case "edit-due-remove":
                Page.State = "loading";
                var CA = await new CardUpdateApi().UpdateDue(CurrentCardID, null);
                console.log(CA.data.due);
                Page.State = "load-complete";
                break;
            case "edit-start-remove":
                Page.State = "loading";
                var CA = await new CardUpdateApi().UpdateStart(CurrentCardID, null);
                console.log(CA.data.due);
                Page.State = "load-complete";
                break;
            case "edit-info":
                var M = new AppModal();
                var fb = new FormBuilder();
                fb.input("title", itm.name);
                fb.textarea("about", itm.desc);
                fb.OnSubmit = async () => {
                    var dta = await new CardUpdateApi()
                        .UpdateInfo(itm.id, fb.Inputs.get("title").value, fb.Inputs.get("about").value);
                    Page.SetTitle(fb.Inputs.get("title").value);
                    document.querySelector("[data-set='card-about-text']").textContent =
                        fb.Inputs.get("about").value;
                    Page.CloseModal();
                    //     this.El.querySelector("msg-content")!.textContent = this.item.data.text;
                };
                fb.finilize();
                M.Show(fb.element);
                break;
            default:
                break;
        }
    });
});
Timeline.Display_Data();
//# sourceMappingURL=index.html.js.map