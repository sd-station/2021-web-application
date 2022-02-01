export class WindowSideClass {
    nv!: HTMLIFrameElement
    params!: string;
    command!: string;
    nav(path: string, attr: string) {
        if (!this.nv) {
 
            setTimeout(() => {
                this.nav(path , attr); 
            }, 1000);

            return;
        }

        this.command = path.replace("/", "\\");
        this.params = attr;
        this.nv.src = "/" + path + "/index.html";

        //> Show panel
        (document.querySelector("side-panel") as HTMLElement).style.display = "";
    }

    constructor() {
        this.Setup();

    }
    Setup() {


        var xc = document.querySelector("#properties-frame");

        if (!xc) {
 
            setTimeout(() => {
                this.Setup(); 
            }, 1000);

            return;
        }

        this.nv = xc as HTMLIFrameElement;
        this.nv.onload = () => {
            console.log("Loaded");

            if (this.command == "editor-request") {
                var inp = this.nv.contentWindow!.document.querySelector("#txt-filename") as HTMLInputElement;
                inp.value = this.params;

            }


        }
    }
}