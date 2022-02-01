export class HeaderButton extends HTMLElement {
    constructor(opt) {
        super();
        if (opt.Title) {
            this.title = opt.Title;
        }
        this.innerHTML = opt.name;
        if (opt.Icon) {
            fetch(opt.Icon).then(async (t) => {
                if (!t.ok) {
                    this.innerHTML = opt.name;
                }
                else {
                    var icon = await t.text();
                    this.innerHTML = icon;
                }
            });
        }
    }
}
window.customElements.define("header-button", HeaderButton);
//# sourceMappingURL=header-button.js.map