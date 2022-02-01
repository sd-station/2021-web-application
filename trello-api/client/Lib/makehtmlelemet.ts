
export function Make(elname: string, content: string = "", classname: string = "") {

    let m = document.createElement(elname);
    if (content.length > 0) m.innerHTML = content;
    if (classname.length > 0) m.className = classname;
    return m;
}