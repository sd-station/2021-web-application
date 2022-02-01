
export class ShowDataDetails {
    DisplayLisk(link: string) {
        if (window.location.hostname.indexOf("localhost") < 0) return this;
        var a = document.createElement("a");
        a.href = link;
        a.text = "open link";
        a.target = "_blank"
        document.body.appendChild(a);
        return this;
    }
    DisplayDetails(title: string, data: any) {

        if (window.location.hostname.indexOf("localhost") < 0) return this;

        var details = document.createElement("details")
       // details.open = true;
        var sum = document.createElement("summary");
        sum.textContent = title;
        details.appendChild(sum)

        var x = document.createElement("pre");
        var datalines = JSON.stringify(data, null, " ").split("\n");

        var display = [] as string[];

        const ignorecase = ["{", "}" , "[" , "]"   ]
        datalines.forEach(u => {

            if (ignorecase.indexOf(u.trim()) >= 0) return;
            if (u.trim() == "},"){
                display.push(``);
                return; 
            } 

     
            

            if (u.endsWith(",")) u = u.substring(0, u.length - 1)
            if (u.startsWith(" ")) u = u.substring(1)

            if (u.indexOf(":") > 0) {

                var value = u.substring(u.indexOf(":") + 1);
                var kind = "string";
                if (value.trim() == "null") kind = "null";
                if (value.trim() == "false" || value.trim() == "true") kind = "bool";

                if (kind == "string" && !value.trim().startsWith("\"")) kind = "number";


                var p = `<span class="u-title">${u.substring(0, u.indexOf(":")).replaceAll("\"", "")}</span><span>:</span><span class="u-value ${kind}">${value}</span>`

                display.push(p);

                return;
            }


            display.push(u);
        })


        x.innerHTML = display.join("\n");
        details.appendChild(x)

        document.body.appendChild(details);

        return this;
    }

}
