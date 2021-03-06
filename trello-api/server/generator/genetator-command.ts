
// Generated by https://quicktype.io

import { join } from "https://deno.land/std@0.103.0/path/mod.ts";

export interface IGC {
    directory: string;
    command: "editor";
    lines: string[];
}

export class GeneratorCommand {

    data!: IGC;
    title!: string;
    name!: string;
    Generate(data: IGC) {
        this.data = data;

        if (this.data.command == "editor") {

            console.log("editor:", this.name);
            


            const htmldata = Deno.readTextFileSync("temp/editor.temp.html");

            this.data.lines.forEach(pattern => {
                this.ExtractPattern(pattern);


            })


            const htmlcontent = htmldata
                .replace("{{form-content}}", this.HtmlFromPattern())
                .replace("{{title}}", this.title);

            Deno.writeTextFileSync(join(this.data.directory, "index.html"), htmlcontent)

            let EditorText = Deno.readTextFileSync("temp/editor.temp.html.editor.txt");

            EditorText = this.EditorFromPattern(EditorText);


            Deno.writeTextFileSync(join(this.data.directory, this.name.toLowerCase() + "-editor.ts"), EditorText)

            let IndexText = Deno.readTextFileSync("temp/editor.temp.html.index.ts.txt");

            IndexText = IndexText
                .replaceAll("{{name}}", this.name)
                .replaceAll("{{name-lower}}", this.name.toLowerCase())
                .replace("{{assign}}", this.PatternAssignment())
                ;

            Deno.writeTextFileSync(join(this.data.directory, "index.html.ts"), IndexText)

        }


        return JSON.stringify(this.patterns)
    }
    PatternAssignment(): string {
        var assign = "";
        this.patterns.forEach(f => {
            if (f.command == "input") {
                const name = f.id.split("-").map((g, i) => {

                    if (i == 0) return g.toLowerCase();
                    return g[0].toUpperCase() + g.substring(1).toLowerCase();
                }).join("")
                
                assign += `// form.${name}.Text =  ;\n`
            }

        })

        return assign;
    }
    EditorFromPattern(filecontent: string): string {
        var txtdeclare = "";
        var assign = "";
        this.patterns.forEach(f => {
            if (f.command == "input") {
                const name = f.id.split("-").map((g, i) => {

                    if (i == 0) return g.toLowerCase();
                    return g[0].toUpperCase() + g.substring(1).toLowerCase();
                }).join("")
                txtdeclare += `${name}: InputClass\n    `
                assign += `this.${name} = new InputClass("#${f.id}")!\n        `
            }

        })

        return filecontent
            .replace("{{declare}}", txtdeclare)
            .replace("{{assign}}", assign)
            .replaceAll("{{name}}", this.name)
            ;
    }
    HtmlFromPattern(): string {
        var res = "";

        this.patterns.forEach(f => {
            if (f.command == "input") {
                res += `<label><span>${f.content}: </span>
                <input id="${f.id}" placeholder="${f.content}"></label>\n`
            }

        })


        return res;
    }

    patterns = [] as IPattern[];

    ExtractPattern(pattern: string) {

        var commandR = pattern.split(" ")[0];

        if (commandR == "name") {
            this.name = pattern.substring(pattern.indexOf(" ")).trim();
            return;
        }

        if (commandR == "title") {
            this.title = pattern.substring(pattern.indexOf(" ")).trim();
            return;
        }


        var cmd: IPattern = { command: "input", content: "", id: "" };
        this.patterns.push(cmd);

        if (commandR == "input")
            pattern = pattern.substring(pattern.indexOf(" ")).trim();






        if (commandR == "button") {
            cmd.command = "button";
            pattern = pattern.substring(pattern.indexOf(" ")).trim();
        }

        if (pattern.startsWith("#")) {

            let id = pattern;

            if (id.indexOf(" ") > 0) {
                id = pattern.substring(0, pattern.indexOf(" ")).trim();
                pattern = pattern.substring(pattern.indexOf(" ")).trim();
            } else pattern = "";

            cmd.id = id.substring(1);
        }

        if (pattern.length > 0) {
            cmd.content = pattern;
        }

    }

}
interface IPattern {
    content: string;
    id: string;
    command: string;

}