declare module "html-extend" {
    interface IElement {
        text ?: string;
        type: string;

    }

  

    interface IElementAnchor extends IElement {
        classname: string;
        type: string;
        link: string;
        text: string;
        target: string;
    }
}