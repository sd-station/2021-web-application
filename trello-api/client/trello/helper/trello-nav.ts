export class PagesNav {
   

    constructor(public root: string) {
      
    }
     
    public get index() : string {
        return `${this.root}/index.html`
    }
     
    public get view() : string {
        return `${this.root}/view/index.html`
    }
     

}
 
 