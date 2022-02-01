declare module "indexed-db-api" {
    export interface IDBEvent extends Event {
        target: IDBEventTarget;

    }
    export interface IDBEventTarget extends EventTarget {
        result: any;
        error: IDBError;
    }
    export interface IDBError extends EventTarget {
        name: string;
    }

    export interface IDBContainer {
        DB: IDBDatabase;
        index: number ;
    }
    
}