function Include(url: string) {
    var k = document.createElement("script");
    k.type = "module";
    if (!url.endsWith(".js")) url += ".js";
    k.src = url;
    document.head.appendChild(k);
}

Include("/ui/draw-icon/draw-icon.define")