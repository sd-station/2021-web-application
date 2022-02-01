import { ITrelloBoard } from "trello-api";
export type TSAU = "auth" | "workspace" | "board" | "list" | "card";
export interface IDataSelection {
    id: string;
    name: string;
}
export interface IDataSelectionArray {
    [x: string]: IDataSelection
}
export class DataSelectionItemClass implements IDataSelection {
    public id = ""
    public name = ""
    public get selected(): boolean {
        return this.id.length > 0;
    }

    Clear() {
        this.id = "";
        this.name = "";
    }

}
class BaseSelection implements IDataSelectionArray {
    [x: string]: IDataSelection;

}
export class TrelloDataSelection extends BaseSelection {

    app: DataSelectionItemClass = new DataSelectionItemClass();
    auth: DataSelectionItemClass = new DataSelectionItemClass();
    member: DataSelectionItemClass = new DataSelectionItemClass();
    workspace: DataSelectionItemClass = new DataSelectionItemClass();
    board: DataSelectionItemClass = new DataSelectionItemClass();
    list: DataSelectionItemClass = new DataSelectionItemClass();
    card: DataSelectionItemClass = new DataSelectionItemClass();
}
