import { ListApi } from "../../../api/list-api.js";
export class ListComboBox {
    async Display(cboard) {
        while (this.element.children.length > 0)
            this.element.remove(0);
        var lists = await new ListApi().OfBoard(cboard);
        if (lists.HasList) {
            var LC = lists.ToListOf();
            LC.forEach(itm => {
                var g = document.createElement("option");
                g.value = itm.id;
                g.text = itm.name;
                if (this.DefaultName)
                    g.selected = itm.name == this.DefaultName;
                this.element.add(g);
            });
            //.filter(h => h.name == "Calendar Events");
            // console.log("Total List on  Board", LC.length);
            // if (LC.length > 0) clist = LC[0].id
        }
    }
    DefaultName;
    Default(arg0) {
        this.DefaultName = arg0;
        return this;
    }
    element;
    constructor(el) {
        this.element = el;
    }
}
//# sourceMappingURL=ListComboBox.js.map