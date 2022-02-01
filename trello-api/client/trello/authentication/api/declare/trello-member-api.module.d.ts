declare module "trello-member-api" {
 
    export interface ITrelloMemberAPI {
        id: string;
        bio: string;
        bioData: null;
        confirmed: boolean;
        memberType: string;
        username: string;
        aaId: null;
        activityBlocked: boolean;
        avatarHash: string;
        avatarUrl: string;
        fullName: string;
        idEnterprise: null;
        idEnterprisesDeactivated: any[];
        idMemberReferrer: null;
        idPremOrgsAdmin: any[];
        initials: string;
        nonPublic: NonPublic;
        nonPublicAvailable: boolean;
        products: any[];
        url: string;
        status: string;
        aaBlockSyncUntil: null;
        aaEmail: null;
        aaEnrolledDate: null;
        avatarSource: string;
        credentialsRemovedCount: number;
        domainClaimed: null;
        email: null;
        gravatarHash: string;
        idBoards: string[];
        idOrganizations: any[];
        idEnterprisesAdmin: any[];
        loginTypes: null;
        marketingOptIn: MarketingOptIn;
        messagesDismissed: MessagesDismissed[];
        oneTimeMessagesDismissed: string[];
        prefs: Prefs;
        trophies: any[];
        uploadedAvatarHash: string;
        uploadedAvatarUrl: string;
        premiumFeatures: any[];
        isAaMastered: boolean;
        siftDecision: null;
        ixUpdate: string;
        limits: Limits;
    }

    export interface Limits {
        boards: Boards;
        orgs: Boards;
    }

    export interface Boards {
        totalPerMember: TotalPerMember;
    }

    export interface TotalPerMember {
        status: string;
        disableAt: number;
        warnAt: number;
    }

    export interface MarketingOptIn {
        optedIn: boolean;
        date: string;
    }

    export interface MessagesDismissed {
        _id: string;
        name: string;
        count: number;
        lastDismissed: string;
    }

    export interface NonPublic {
    }

    export interface Prefs {
        privacy: Privacy;
        sendSummaries: boolean;
        minutesBetweenSummaries: number;
        minutesBeforeDeadlineToNotify: number;
        colorBlind: boolean;
        locale: string;
    }

    export interface Privacy {
        fullName: string;
        avatar: string;
    }

}