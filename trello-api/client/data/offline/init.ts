import { IDataType } from "data-type-api";
import { IDBContainer, IDBEvent } from "indexed-db-api";

class DictionaryDatabase {
    tablename = "my-table";
    support = false;
    DataSet: IDBContainer = {
        DB: {} as IDBDatabase,
        index: -1
    };
    Initialization() {

        return new Promise(resolve => {

            //>> Database Acailibility must check before launch
            if (!window.indexedDB) {
                console.error("Failed to start Application");
                return;
            }

            //# Opening 
            var Adaptor = window.indexedDB.open("word-dictionary", 2);

            Adaptor.onupgradeneeded = (event: Event) => {
                var thisDb: IDBDatabase = (event as IDBEvent).target.result;
                //# Generate Database
                if (!thisDb.objectStoreNames.contains(this.tablename)) {
                    var objectStore = thisDb.createObjectStore(this.tablename, { keyPath: "index", autoIncrement: true })
                    objectStore.createIndex("key", "key", { unique: false });
                    objectStore.createIndex("data", "data", { unique: false });

                }
            }

            //! On Error
            Adaptor.onerror = function () {
                console.error("Failed to start Application");
            }

            //! On Success
            Adaptor.onsuccess = (event) => {
                this.support = true;
                this.DataSet.DB = (event as IDBEvent).target.result;
                resolve(true);
            }

        }) //end promise

    } //end constructor

    async Insert(NR: IDataType) {

        //> Array of store object tp work with
        var transaction = this.DataSet.DB.transaction([this.tablename], "readwrite")
        var store = transaction.objectStore(this.tablename)

        var request = store.add(NR);

        request.onerror = function (event) {

        }
        //@ts-ignore
        request.onsuccess = (event: IDBEvent) => {
            //todo Add Current Opened Chart
            this.DataSet.index = event.target.result;
        }

    }

    FindRecordsFromDB(search: string, count: number = -1): Promise<any> {

        var transaction = this.DataSet.DB.transaction([this.tablename], "readwrite")
        var store = transaction.objectStore(this.tablename)

        var data = [] as any[];
        return new Promise(resolve => {
            store.openCursor().onsuccess = function (event: Event) {

                var cursor = (event as IDBEvent).target.result;
                if (cursor) {
                    var updateData = cursor.value as IDataType;

                    if (updateData.key.startsWith(search))
                        data.push(updateData)

                    if (count < 0 || data.length < count)
                        cursor.continue();
                    else {
                        resolve(data)
                    }
                }
                else {
                    resolve(data)
                }
            };
        });

    }

    UpdateRecord(UP: IDataType): Promise<any> {

        var transaction = this.DataSet.DB.transaction([this.tablename], "readwrite")
        var store = transaction.objectStore(this.tablename)

        return new Promise(resolve => {
            store.openCursor().onsuccess = function (event: Event) {

                var cursor = (event as IDBEvent).target.result;
                if (cursor) {
                    if (cursor.value.key == UP.key) {
                        const updateData = cursor.value;

                        updateData.data = UP.data;
                        const request = cursor.update(updateData);
                        request.onsuccess = function () {
                            resolve(true)
                        };
                    }
                    else { cursor.continue(); }
                }
                else {
                    resolve(false)
                }
            };
        });

    }

}

export const Database = new DictionaryDatabase();
