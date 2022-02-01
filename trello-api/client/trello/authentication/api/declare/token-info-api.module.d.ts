declare module "token-info-api" {
 
export interface ITrelloTokenInfo {
    id:          string;
    identifier:  string;
    idMember:    string;
    dateCreated: string;
    dateExpires: null | number;
    permissions: Permission[];
}

export interface Permission {
    idModel:   string;
    modelType: string;
    read:      boolean;
    write:     boolean;
}

    
}