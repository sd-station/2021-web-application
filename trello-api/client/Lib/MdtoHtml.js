export function MakeMD(lines) {
    var post = [];
    var opened = false;
    if (lines.length == 0)
        return "";
    if (lines.length == 1 && lines[0].length == 0)
        return "";
    lines.forEach((mdline, i) => {
        var exline = mdline.trim();
        if (exline.length == 0) {
            return;
        }
        if (exline.startsWith("#")) {
            var deg = 0;
            for (let i = 0; i < exline.length; i++) {
                if (exline[i] == "#")
                    deg = i + 1;
                else
                    break;
            }
            if (opened)
                post.push("</div>");
            post.push(`<h${deg} id="line-${i}">${mdline.substring(deg).trim()}</h${deg}>`);
            if (deg > 1) {
                post.push("<div>");
                opened = true;
            }
            return;
        }
        if (exline.startsWith("!")) {
            post.push(`<img src="${exline.split("(")[1].replace(")", "")}" alt="${exline.split("]")[0].replace("![", "")}">`);
            return;
        }
        if (exline.startsWith("[")) {
            post.push(`<a class="doc-link" href="${exline.split("(")[1].replace(")", "")}" rel="nofollow" target="_blank">${exline.split("]")[0].replace("[", "")}</a>`);
            return;
        }
        if (exline.startsWith("<")) {
            post.push(mdline);
            return;
        }
        if (exline.startsWith("- ")) {
            var content = mdline.substring(mdline.indexOf("-") + 2);
            var innercircle = 0;
            do {
                content = `<ul><li>${content}</li></ul>`;
                innercircle += 4;
            } while (innercircle <= mdline.indexOf("-"));
            post.push(content);
            return;
        }
        post.push(`<p dir="auto">${mdline.trim()}</p>`);
    });
    // console.log(post.join(""));
    //#Merging
    // for (let i = 1; i < post.length; i++) {
    //     let before = post[i - 1];
    //     let current = post[i];
    //     if (before.endsWith("</ul>") && current.startsWith("<ul>")) {
    //         before = before.substring(0, before.length - "</ul>".length);
    //         current = current.substring("<ul>".length);
    //         post[i - 1] = before;
    //         post[i] = current;
    //     }
    //     while (before.endsWith("</li></ul></li>") && current.startsWith("<li><ul><li>")) {
    //         before = before.substring(0, before.length - "</ul></li>".length);
    //         current = current.substring("<li><ul>".length);
    //         post[i - 1] = before;
    //         post[i] = current;
    //     }
    // }
    return post.join("");
}
//# sourceMappingURL=MdtoHtml.js.map