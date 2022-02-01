import { HandleIframe } from "./main-frame/handle-iframe.js"
 import { MainWindow } from "./main-window/init.js";
import { HandleSidebar } from "./side-menu/init.js";
 
new MainWindow();

window.data.selection.LoadAndUpdate();

new HandleSidebar().Initialize();

await new HandleIframe().Initialize();

console.log("Debug");

 
