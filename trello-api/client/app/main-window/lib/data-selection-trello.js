export class DataSelectionItemClass {
    id = "";
    name = "";
    get selected() {
        return this.id.length > 0;
    }
    Clear() {
        this.id = "";
        this.name = "";
    }
}
class BaseSelection {
}
export class TrelloDataSelection extends BaseSelection {
    app = new DataSelectionItemClass();
    auth = new DataSelectionItemClass();
    member = new DataSelectionItemClass();
    workspace = new DataSelectionItemClass();
    board = new DataSelectionItemClass();
    list = new DataSelectionItemClass();
    card = new DataSelectionItemClass();
}
//# sourceMappingURL=data-selection-trello.js.map