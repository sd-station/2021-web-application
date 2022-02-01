declare module "trello-module" {


    export interface ITrelloModule {
        List: ITelloListInfo[];
        Board: ITrelloBoardInfo; 

    }
    export interface ITrelloBoardInfo {
        id: string

    }

    export interface ITelloListInfo {
        id: string
    }


    export interface ITelloItemInfo {
        card: ITelloCardInfo
    }
    export interface ITelloCardInfo {
        id: string
    }
}