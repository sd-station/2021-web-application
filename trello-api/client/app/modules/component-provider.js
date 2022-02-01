import { ComponentEmitter } from "./emitter.js";
export class ComponentProvider {
    namespace = "";
    Manual = {};
    Item = {};
    constructor(namespace) {
        this.namespace = namespace;
    }
    async GenerateContent() {
        var EF = new ComponentEmitter("." + this.namespace);
        if (!EF.IsSupported)
            return "";
        EF.Apply(this.Manual);
        EF.Apply(this.Item);
        return EF.RawString;
    }
}
//# sourceMappingURL=component-provider.js.map