import { WindowDataClass } from "./lib/window-data-class.js";
import { WindowSideClass } from "../side-panel/window-side-class.js";
import { AppsettingManager } from "../setting/setting-manager.js";
export class MainWindow {
    constructor() {
        window.setting = new AppsettingManager();
        window.setting.Load();
        window.data = new WindowDataClass();
        window.side = new WindowSideClass();
    }
}
//# sourceMappingURL=init.js.map