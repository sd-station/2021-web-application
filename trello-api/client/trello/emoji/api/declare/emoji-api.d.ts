
declare module "emoji-api" {
    export interface ITrelloEmoji {
        unified: string;
        name: string;
        native: string;
        shortName: string;
        shortNames: string[];
        text: string;
        texts: null;
        category: string;
        sheetX: number;
        sheetY: number;
        skinVariations?: { [key: string]: SkinVariation };
        tts: string;
        keywords: string[];
    }

    export interface SkinVariation {
        unified: string;
        native: string;
        sheetX: number;
        sheetY: number;
    }


}