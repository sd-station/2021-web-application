class DictionaryDatabase {
    tablename = "my-table";
    support = false;
    DataSet = {
        DB: {},
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
            Adaptor.onupgradeneeded = (event) => {
                var thisDb = event.target.result;
                //# Generate Database
                if (!thisDb.objectStoreNames.contains(this.tablename)) {
                    var objectStore = thisDb.createObjectStore(this.tablename, { keyPath: "index", autoIncrement: true });
                    objectStore.createIndex("key", "key", { unique: false });
                    objectStore.createIndex("data", "data", { unique: false });
                }
            };
            //! On Error
            Adaptor.onerror = function () {
                console.error("Failed to start Application");
            };
            //! On Success
            Adaptor.onsuccess = (event) => {
                this.support = true;
                this.DataSet.DB = event.target.result;
                resolve(true);
            };
        }); //end promise
    } //end constructor
    async Insert(NR) {
        //> Array of store object tp work with
        var transaction = this.DataSet.DB.transaction([this.tablename], "readwrite");
        var store = transaction.objectStore(this.tablename);
        var request = store.add(NR);
        request.onerror = function (event) {
        };
        //@ts-ignore
        request.onsuccess = (event) => {
            //todo Add Current Opened Chart
            this.DataSet.index = event.target.result;
        };
    }
    FindRecordsFromDB(search, count = -1) {
        var transaction = this.DataSet.DB.transaction([this.tablename], "readwrite");
        var store = transaction.objectStore(this.tablename);
        var data = [];
        return new Promise(resolve => {
            store.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    var updateData = cursor.value;
                    if (updateData.key.startsWith(search))
                        data.push(updateData);
                    if (count < 0 || data.length < count)
                        cursor.continue();
                    else {
                        resolve(data);
                    }
                }
                else {
                    resolve(data);
                }
            };
        });
    }
    UpdateRecord(UP) {
        var transaction = this.DataSet.DB.transaction([this.tablename], "readwrite");
        var store = transaction.objectStore(this.tablename);
        return new Promise(resolve => {
            store.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.key == UP.key) {
                        const updateData = cursor.value;
                        updateData.data = UP.data;
                        const request = cursor.update(updateData);
                        request.onsuccess = function () {
                            resolve(true);
                        };
                    }
                    else {
                        cursor.continue();
                    }
                }
                else {
                    resolve(false);
                }
            };
        });
    }
}
export const Database = new DictionaryDatabase();
//# sourceMappingURL=init.js.map