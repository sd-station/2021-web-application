import { Page } from "../page/page.js"



export class AppModal {
    config = {
        close: { auto: true }
    };


    InitializeFrame(link: string) {

        var ifr = document.createElement("iframe");
        ifr.src = link
        this.CreateModal({ mode: "solid-float" });

        this.Show(ifr);
    }
    dialog!: HTMLElement;
    CreateModal(opt?: { mode: "glass" | "solid" | "solid-float"; }) {
        Page.State = "lock-scroll";
        var modal = document.createElement("app-modal") as HTMLElement;
        document.body.appendChild(modal);
        this.dialog = document.createElement("modal-dialog") as HTMLElement;
        modal.appendChild(this.dialog);

        if (opt && opt.mode && opt.mode.startsWith("solid")) {
            modal.classList.add("solid-dialog");
            if (opt.mode.startsWith("solid-float")) this.dialog.classList.add("float");
        }

        if (this.config.close.auto)
            modal.addEventListener("click", event => {
                if ((event.target as HTMLElement).tagName == "APP-MODAL") Page.CloseModal()
            })


    }

    Show(content: HTMLElement) {
        if (!this.dialog) this.CreateModal({ mode: "solid" });
        this.dialog.appendChild(content);
    }


}

