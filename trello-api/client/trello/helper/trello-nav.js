export class PagesNav {
    root;
    constructor(root) {
        this.root = root;
    }
    get index() {
        return `${this.root}/index.html`;
    }
    get view() {
        return `${this.root}/view/index.html`;
    }
}
//# sourceMappingURL=trello-nav.js.map