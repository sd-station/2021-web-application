//@ts-nocheck 

document.body.classList.add("loading");
const container = document.querySelector("item-container") as HTMLElement;
var dataloader = new TrelloConnect().NameSpace;
var data = await dataloader.GetMethod()  ;

data.forEach(itm1 => {
    var c = document.createElement("div")  ;
    c.dir = "auto";
    c.setAttribute("data-src" ,  JSON.stringify(itm1))
    container.appendChild(c);
 
})

// show Data
// new ShowDataDetails()
//     .DisplayDetails("code", data)
//     .DisplayLisk(dataloader.link)

document.body.classList.remove("loading");