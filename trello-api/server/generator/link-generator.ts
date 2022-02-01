/**
 * Generate Collection of Content For Project
 */

import {
    existsSync,
} from "https://deno.land/std@0.103.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.103.0/path/win32.ts";

interface IResponse {
    link: string;
    name: string,
    path: string,
    state: number[]
}
export class LinkGenerator {

    response = [] as IResponse[];
    dir!: string;
    root = "E:\\trello-api\\client";
    SearchDirectories(currentdir: string) {

        var name = currentdir.substring(this.dir.length).replaceAll("\\", "/");

        const item = {
            name: name,
            path: currentdir.replaceAll("\\", "/"),
            link: "",
            state: [0, 0, 0, 0, 0]
        } as IResponse;
        if (item.name.length == 0) item.name = "index";

        item.link = (item.path.substring(this.root.length) + "/index.html").replaceAll("\\", "/")



        const content = [...Deno.readDirSync(currentdir)]


        if (content.length == 0) {
            item.state[0] = 1;
       
        }

        if (!content.find(k => k.name == "exclude.md")) this.response.push(item);
        
    

        if (content.find(k => k.name == "index.html")) item.state[1] = 1;
        if (content.find(k => k.name == "index.html.ts")) item.state[2] = 1;
        if (content.find(k => k.name == "readme.md")) item.state[3] = 1;
        if (content.find(k => k.name == "next.md")) item.state[4] = 1;

        content.filter(f => f.isDirectory).forEach(subdir => {
            var fullpath = join(currentdir, subdir.name);
            this.SearchDirectories(fullpath);
        })


    }



    GetData(subdir: string) {
        this.dir = join(this.root, subdir);
        console.log(this.dir);

        if (existsSync(this.dir)) this.SearchDirectories(this.dir);
        return JSON.stringify(this.response);
    }



}