export function Make(elname, content = "", classname = "") {
    let m = document.createElement(elname);
    if (content.length > 0)
        m.innerHTML = content;
    if (classname.length > 0)
        m.className = classname;
    return m;
}
//# sourceMappingURL=makehtmlelemet.js.map