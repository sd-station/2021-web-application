import { existsSync } from "https://deno.land/std@0.103.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.103.0/path/mod.ts";
import { Application, send, Router } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import { DocumentGenerator } from "./generator/document-creator.ts";
import { GeneratorCommand } from "./generator/genetator-command.ts";
import { LinkGenerator } from "./generator/link-generator.ts";

const app = new Application();

const router = new Router();
router
    .get("/test/", (context) => {
        context.response.body = "test";
    })
    .post("/generator-command", async (context) => {
        var data = await context.request.body().value;

        context.response.body = new GeneratorCommand().Generate(data);

    })

app.use(router.routes());
app.use(router.allowedMethods());


app.use(async (ctx, next) => {
    if (ctx.request.url.pathname.startsWith("/cc.api/")) {
        const ft = await fetch(
            ctx.request.url.pathname.replace("/cc.api/", "https://api.trello.com/")
            + ctx.request.url.search
        );
        ctx.response.body = await ft.text();
    }
    if (ctx.request.url.pathname.startsWith("/api/connect/")) {

        let link = ctx.request.url.pathname.replace("/api/connect/", "https://api.trello.com/")
            + ctx.request.url.search;

        if (ctx.request.url.search.length > 0) {
            const apiKey = "4525dacfc9f7344c608461dfe0637059";
            link += `&key=${apiKey}`;
        }
        console.log(link);

        const ft = await fetch(
            link, { method: ctx.request.method }
        );
        ctx.response.headers.set("Content-Type" ,"application/json")
        ctx.response.body = await ft.text();
    }

    if (!ctx.response.body) await next();
});



app.use(async (ctx, next) => {
    if (ctx.request.url.pathname.startsWith("/link-generator/")) {
        const gen = await new LinkGenerator()
            .GetData(ctx.request.url.pathname.substring("/link-generator/directory/".length));
        ctx.response.body = gen;

    }
    if (ctx.request.url.pathname.startsWith("/generator-command")) {
        ctx.response.body = "OK";


    }

    if (ctx.request.url.pathname.startsWith(DocumentGenerator.URL)) {
        const gen = await new DocumentGenerator().HandleRequest(ctx.request.url.pathname);
        ctx.response.body = gen
    }



    if (!ctx.response.body) await next();
});

app.use(async (ctx, next) => {
    let url = "../client" + ctx.request.url.pathname;

    if (url.endsWith("/")) url += "index.html";


    if (url.endsWith("index.html") && !existsSync(url)) {
        console.log(url);

        const filepath = join(new URL('.', import.meta.url).pathname.substring(1), url)
        const urlpath = filepath.substring(0, filepath.lastIndexOf("\\")).replaceAll("\\", "/")
        const temp = Deno.readTextFileSync("temp/temp.temp.html")
            .replaceAll("{file-path}", filepath)
            .replaceAll("{url-path}", urlpath)
            .replaceAll("{doc-gen-link}", DocumentGenerator.CreateURL("container", filepath.replaceAll("\\", "/")))
            .replaceAll("{doc-view-link}", DocumentGenerator.CreateURL("view", filepath.replaceAll("\\", "/")))
            .replaceAll("{doc-exclude-link}", DocumentGenerator.CreateURL("exclude", urlpath))
            .replaceAll("{doc-remove-link}", DocumentGenerator.CreateURL("delete", urlpath))
            .replaceAll("{doc-plan-link}", DocumentGenerator.CreateURL("next", urlpath))
            .replaceAll("{doc-operation-link}", DocumentGenerator.CreateURL("operational", urlpath))


        ctx.response.body = temp;

    }

    var precompiler = url.endsWith(".html");
    if (!existsSync(url)) precompiler = false;


    if (precompiler) {
        const fp = join(new URL('.', import.meta.url).pathname.substring(1), url);
        const urlpath = fp.replaceAll("\\", "/")
        let res = Deno.readTextFileSync(url);

        //> DEV BUTTON
        if (!ctx.request.url.pathname.endsWith("main-window.html")) {
            const dev = Deno.readTextFileSync("temp/developer-section.html")
                .replaceAll("{file-path}", urlpath);
            res = res.replace("</body>", dev + "</body>");
        }

        let j = "dark";
        //> DEV BUTTON
        const t = new Date();
        if (t.getHours() < 21 && t.getHours() > 6) j = "light"
        const attachments = [
            `<link rel="stylesheet" href="/css/${j}.css">`,
            `<link rel="stylesheet" href="/css/basic.css">`
        ]



        if (existsSync(url + ".js")) {
            const filename = url.substring(url.lastIndexOf("/"));
            attachments.push(`<script async defer type="module" src=".${filename}.js"></script>`)
        }

        let rps = `<!-- head-content -->`;
        if (res.indexOf(rps) < 0) {
            rps = "</head>";
            attachments.push(rps)
        }

        res = res.replace(rps, attachments.join(""));
        ctx.response.body = res;

    }

    if (!ctx.response.body) await next();

});





app.use(async (context) => {
    var cr = Deno.cwd();
    cr = cr.substring(0, cr.lastIndexOf("\\"))
    await send(context, context.request.url.pathname, {
        root: `${cr}/client`,
        index: "index.html",
    });
});

await app.listen({ port: 8080 });