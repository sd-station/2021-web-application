export class InputClass {
    Element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    public get Text(): string {
        return this.Element.value;
    }

    public set Text(v: string) {
        this.Element.value = v;
    }

    constructor(q: string) {
        this.Element = document.querySelector(q)!;
    }
}