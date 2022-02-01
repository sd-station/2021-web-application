declare module "reaction-api"{
    // Generated by https://quicktype.io

export interface ITrelloReaction {
    id:       string;
    idMember: string;
    idModel:  string;
    idEmoji:  string;
    member:   Member;
    emoji:    Emoji;
}

export interface Emoji {
    unified:       string;
    native:        string;
    name:          string;
    skinVariation: null;
    shortName:     string;
}

export interface Member {
    id:                 string;
    activityBlocked:    boolean;
    avatarHash:         string;
    avatarUrl:          string;
    fullName:           string;
    idMemberReferrer:   string;
    initials:           string;
    nonPublic:          NonPublic;
    nonPublicAvailable: boolean;
    username:           string;
}

export interface NonPublic {
}

}