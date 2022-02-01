import { PageEditor } from "./page-editor.js";
var form;
function setup() {
    form = new PageEditor();
    if (form.btnSubmit) {
        Init();
    }
    else {
        setTimeout(() => {
            setup();
        }, 1000);
    }
}
setup();
function Init() {
    form.btnSubmit.addEventListener("click", _ => {
        document.body.classList.add("loading");
        var data = {
            "directory": form.txtFileName.Text,
            "command": "editor",
            "lines": []
        };
        localStorage.setItem("editor-form-data", form.txtDocument.Text);
        data.lines = form.txtDocument.Text.replaceAll("\r\n", "\n")
            .split("\n").map(a => a.trim()).filter(p => p.length > 0);
        //> SENDING
        console.log("START", JSON.stringify(data));
        fetch("/generator-command", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        }).then(response => response.text())
            .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            document.body.classList.remove("loading");
        });
    });
    if (localStorage.getItem("editor-form-data"))
        form.txtDocument.Text = localStorage.getItem("editor-form-data");
}
//# sourceMappingURL=index.html.js.map