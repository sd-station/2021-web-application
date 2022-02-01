declare module "trello-org-api"{
    // Generated by https://quicktype.io

export interface ITrelloWorkspace {
    id:                        string;
    creationMethod:            null;
    name:                      string;
    displayName:               string;
    descData:                  DescData;
    website:                   null;
    promotions:                any[];
    enterpriseJoinRequest:     EnterpriseJoinRequest;
    standardVariation:         null;
    teamType:                  string;
    desc:                      string;
    idMemberCreator:           string;
    invited:                   boolean;
    invitations:               any[];
    prefs:                     Prefs;
    powerUps:                  any[];
    products:                  any[];
    url:                       string;
    logoHash:                  null;
    logoUrl:                   null;
    premiumFeatures:           any[];
    idEnterprise:              null;
    availableLicenseCount:     null;
    maximumLicenseCount:       null;
    ixUpdate:                  string;
    limits:                    Limits;
    memberships:               Membership[];
    billableMemberCount:       number;
    credits:                   any[];
    activeBillableMemberCount: number;
    billableCollaboratorCount: number;
    idBoards:                  string[];
}

export interface DescData {
    emoji: EnterpriseJoinRequest;
}

export interface EnterpriseJoinRequest {
}

export interface Limits {
    orgs: Orgs;
}

export interface Orgs {
    totalMembersPerOrg: SPerOrg;
    freeBoardsPerOrg:   SPerOrg;
}

export interface SPerOrg {
    status:    string;
    disableAt: number;
    warnAt:    number;
}

export interface Membership {
    id:          string;
    idMember:    string;
    memberType:  string;
    unconfirmed: boolean;
    deactivated: boolean;
}

export interface Prefs {
    permissionLevel:         string;
    orgInviteRestrict:       any[];
    boardInviteRestrict:     string;
    externalMembersDisabled: boolean;
    associatedDomain:        null;
    googleAppsVersion:       number;
    boardVisibilityRestrict: BoardRestrict;
    boardDeleteRestrict:     BoardRestrict;
    attachmentRestrictions:  null;
}

export interface BoardRestrict {
    private:    string;
    org:        string;
    enterprise: string;
    public:     string;
}

}