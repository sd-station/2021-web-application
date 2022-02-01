import { Page } from "../../../../app/page/page.js"
import { User } from "../../../../app/user/User.js"
import { CardUpdateApi } from "../../../api/card-update.api.js"
import { csCardTimePicker } from "../../define/card-timepicker.js"

export class DueDate{
   async ToggleComplete(dueComplete: boolean) {
    Page.IsLoading();
    var Rdata = await new CardUpdateApi().UpdateDueComplete(Page.Param("card-id"),dueComplete );
    Page.LoadComplete();
   }
   ShowModal() {
    var timepicker = document.createElement("card-timepicker") as csCardTimePicker;
    timepicker.addEventListener("on-pick-date", async event => {
       var dta = event as CustomEvent;
       var count = dta.detail;
       var date1 = new Date(count).toISOString();
       console.log("date1" ,date1 );
       
       Page.CloseModal();
       Page.IsLoading();
       var Rdata = await new CardUpdateApi().UpdateDue(Page.Param("card-id"),date1 );

       console.log(Rdata.RawText);

       Page.LoadComplete();
    })
    Page.CreateModal(timepicker);
   }

   ShowModalForStart() {
    var timepicker = document.createElement("card-timepicker") as csCardTimePicker;
    timepicker.addEventListener("on-pick-date", async event => {
       var dta = event as CustomEvent;
       var count = dta.detail;
       var date1 = new Date(count).toISOString();
       console.log("date1" ,date1 );
       
       Page.CloseModal();
       Page.IsLoading();
       var Rdata = await new CardUpdateApi().UpdateStart(Page.Param("card-id"),date1 );

       console.log(Rdata.RawText);

       Page.LoadComplete();
    })
    Page.CreateModal(timepicker);
   }

}
