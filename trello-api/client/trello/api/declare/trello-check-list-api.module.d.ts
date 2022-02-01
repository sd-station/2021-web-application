declare module "trello-check-list-api" {
    export interface ITrelloCheckList {
        id: string;
        name: string;
        idCard: string;
        pos: number;
        idBoard: string;
        checkItems: ITrelloCheckItem[];
    }

    export interface ITrelloCheckItem {
        idChecklist: string;
        state: string;
        id: string;
        name: string;
        nameData: null;
        pos: number;
        due: null;
        idMember: null;
    }
}