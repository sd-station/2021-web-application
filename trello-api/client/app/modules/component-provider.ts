import { ComponentEmitter } from "./emitter.js"
 


export class ComponentProvider {
      
    namespace = "";
    Manual: { [x: string]: string } = {};
    Item: { [x: string]: any } = {};
    constructor(namespace:string) {
         this.namespace = namespace;
    }
    async GenerateContent(): Promise<string> {

        var EF = new ComponentEmitter("." + this.namespace);

        if (!EF.IsSupported) return "";

        EF.Apply(this.Manual);
        EF.Apply(this.Item);

        return EF.RawString;


    }

}
