import { Page } from "../page/page.js";
export class AppModal {
    config = {
        close: { auto: true }
    };
    InitializeFrame(link) {
        var ifr = document.createElement("iframe");
        ifr.src = link;
        this.CreateModal({ mode: "solid-float" });
        this.Show(ifr);
    }
    dialog;
    CreateModal(opt) {
        Page.State = "lock-scroll";
        var modal = document.createElement("app-modal");
        document.body.appendChild(modal);
        this.dialog = document.createElement("modal-dialog");
        modal.appendChild(this.dialog);
        if (opt && opt.mode && opt.mode.startsWith("solid")) {
            modal.classList.add("solid-dialog");
            if (opt.mode.startsWith("solid-float"))
                this.dialog.classList.add("float");
        }
        if (this.config.close.auto)
            modal.addEventListener("click", event => {
                if (event.target.tagName == "APP-MODAL")
                    Page.CloseModal();
            });
    }
    Show(content) {
        if (!this.dialog)
            this.CreateModal({ mode: "solid" });
        this.dialog.appendChild(content);
    }
}
//# sourceMappingURL=app-modal.js.map