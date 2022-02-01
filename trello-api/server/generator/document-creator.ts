export class DocumentGenerator {
    static CreateURL(mode: "container" |"view" | "exclude" |"delete" | "next" | "operational", filepath: string): string {
        return `${this.URL}${mode}/${filepath}`;
    }
    static URL = "/document-generator/";
    HandleRequest(url: string) {
        let report = url;

        let request = url.substring(DocumentGenerator.URL.length)
        const filepath = request.substring(request.indexOf("/") + 1).replaceAll("/", "\\");
        request = request.substring(0, request.indexOf("/"));

        report += "\n" + "request: " + request;
        report += "\n" + "filepath : " + filepath;


        if (request == "container") {

            const data = Deno.readTextFileSync("temp/container.temp.html");

            Deno.writeTextFileSync(filepath, data.replace("{file-path}", filepath.replaceAll("\\", "/")));

            report += "\n" + "result: File Copy Success.";

            const tsdata = Deno.readTextFileSync("temp/container.temp.html.ts");

            Deno.writeTextFileSync(filepath + ".ts", tsdata.replace("//@ts-nocheck", "").trim());


            report += "\n" + "result: File Copy Success.";

        }

        if (request == "exclude") {

            Deno.writeTextFileSync(filepath   + "\\exclude.md"   , "");

            report += "\n" + "result: File Exclude Success.";

        }
        if (request == "next") {

            Deno.writeTextFileSync(filepath   + "\\next.md"   , "");

            report += "\n" + "result: File Planned Success.";

        }  
         if (request == "operational") {

            Deno.writeTextFileSync(filepath   + "\\readme.md"   , "");

            report += "\n" + "result: File Planned Success.";

        }

        if (request == "delete") {

            Deno.removeSync(filepath  );

            report += "\n" + "result: File Delete Success.";

        }



        Deno.writeTextFileSync("generator/document-generator.report.txt", report)
        return "<script>window.location=document.referrer</script>";
    }

}