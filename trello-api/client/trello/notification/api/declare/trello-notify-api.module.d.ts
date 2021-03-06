declare module "trello-notofication-api" {
    // Generated by https://quicktype.io

    export interface ITrelloNotification {
        id: string;
        unread: boolean;
        type: "addAttachmentToCard"
         | "removedFromBoard" | "addedToBoard" 
         | "removedFromCard" | "addedToCard" 
         | "commentCard" | "reactionAdded" | "mentionedOnCard" | "changeCard" | "cardDueSoon";
        date: string;
        data: IData;
        appCreator: null;
        idMemberCreator: string;
        idAction: string;
        isReactable: boolean;

        dateRead: null;
        reactions: IReaction[];
        memberCreator?: MemberCreator;
    }

    // Generated by https://quicktype.io

    export interface IReaction {
        id: string;
        idMember: string;
        idModel: string;
        idEmoji: string;
        member: Member;
        emoji: Emoji;
    }

    export interface Emoji {
        unified: string;
        native: string;
        name: string;
        skinVariation: null;
        shortName: string;
    }

    export interface Member {
        id: string;
        activityBlocked: boolean;
        avatarHash: null;
        avatarUrl: null;
        fullName: string;
        idMemberReferrer: null;
        initials: string;
        nonPublic: NonPublic;
        nonPublicAvailable: boolean;
        username: string;
    }

    export interface NonPublic {
    }




    export interface IData {
        actionType: null | "commentCard";
        board: Board;
        card: Card;
        text: string;

        attachment?: INotiAttachment
        previews?: IAttachmentPreview[]

        name: string;

        old?: IOldData;

        listBefore? : IMentionList;
        listAfter? : IMentionList;

    }

 

    export interface IMentionList {
        id: string;
        name: string;
    }




    // Generated by https://quicktype.io

    export interface IOldData {
        due: null | string;
    }



    export interface IAttachmentPreview {
        scaled: boolean;
        _id: string;
        url: string;
        bytes: number;
        height: number;
        width: number;
    }


    export interface INotiAttachment {
        id: string;
        name: string;
        url: string;
        previewUrl: string;
        previewUrl2x: string;
    }

    export interface Board {

        id: string;
        name: string;
        shortLink: string;

    }

    export interface Card {
        closed ?:boolean
        due?: string;
        id: string;
        name: string;
        shortLink: string;
        idShort?: number;
    }

    export interface MemberCreator {
        id: string;
        activityBlocked: boolean;
        avatarHash: null;
        avatarUrl: null;
        fullName: string;
        idMemberReferrer: null;
        initials: string;
        nonPublic: NonPublic;
        nonPublicAvailable: boolean;
        username: string;
    }

    export interface NonPublic {
    }

}