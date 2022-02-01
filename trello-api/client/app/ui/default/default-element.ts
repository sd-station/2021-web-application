export class ContainerElement {
    Element: HTMLDivElement;
    Image(arg0: string) {
        fetch(arg0).then(k => k.text()).then(x => {
            var imgcover = document.createElement("div");
            imgcover.innerHTML = x;
            this.Element.insertBefore(imgcover, this.Element.children.length > 0 ? this.Element.children[0] : null)
        })

        // this.Element.style.backgroundImage = `url(${arg0})`;
        return this;
    }
    el: HTMLElement;

    constructor(el: HTMLElement) {
        this.el = el;
        var dv = document.createElement("div");
        dv.className = "default-message"
        this.el.appendChild(dv);
        this.Element = dv;
    }
    MessageBox(arg0: string): any {

        var content = ""
        arg0.split("*").forEach((word,i)=>{
            if(i % 2 == 1) content += `<strong>${word}</strong>`;
            else content += `<span>${word}</span>`
        })
        var dv = document.createElement("div");
        dv.innerHTML = content;
        this.Element.appendChild(dv);
  

    }

}