import { Page } from "../page/page.js";
import { SideBarContainer } from "./SideBarContainer.js";

/** Open List of Links In Side Bar */
export class HandleSidebar {

    PageElement = document.querySelector(".side-bar-container")!;
    Manager!: SideBarContainer;

    Initialize() {

        this.Manager = new SideBarContainer();

        //> Listen for the event.
        window.parent.addEventListener('OnSelectionUpdate', _ => this.Manager.DisplayData(), false);

        // export var Application = new ApplicationClass();
        // Application.MainWindow.Add(t);

        //> First Display
        this.Manager.DisplayData();

        //> Handle Click
        this.HandleEvent();

    }

    HandleEvent() {

        document.querySelectorAll("side-menu nav div[data-action]")
            .forEach(h => {
                h.addEventListener("click", _ => {

                    document.querySelectorAll('.active-side-menu')
                        .forEach(h => h.classList.remove("active-side-menu"));

                    h.classList.toggle("active-menu-open")




                    if (h.classList.contains("active-menu-open")) {

                        var cr = h.getAttribute("data-action")!

                        console.log(cr);
                        
                        if (cr.startsWith("nav")) {

                            if (cr.startsWith("nav/menu")) {
                                var terget = document.querySelector(".menu-frame")!
                                terget.classList.add('active-side-menu');
                            }
                            if (cr.startsWith("nav/setting")) {
                                var terget = document.querySelector(".setting-frame")!
                                terget.classList.add('active-side-menu');
                            }
                            if (cr.startsWith("nav/calendar")) {
                                var mframe = document.querySelector("#main-frame") as HTMLIFrameElement;
                                mframe.src = "/app/calendar/index.html";
                            }
                          
                        }


                        return;
                    }

                })
            })

        this.PageElement.addEventListener("click", event => {
            var h = event.target as HTMLElement;
            if (h.classList.contains("h2")) {
                document.querySelectorAll('.active-side-menu')
                    .forEach(h => h.classList.remove("active-side-menu"));
            }
        })

    }

}
