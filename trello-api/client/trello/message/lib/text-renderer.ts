import { ITrelloReaction } from "reaction-api";
import { ITrelloActionComment } from "trello-action-comment";
import { FormBuilder } from "../../../app/form-builder/FormBuilder.js";
import { AppModal } from "../../../app/modal/app-modal.js";
import { Page } from "../../../app/page/page.js";
import { ShowDataDetails } from "../../../app/ui/show-data-details.js";
import { baseRenderer } from "../../action/define/renderer/renderer.js";
import { MessageApi } from "../../api/message-api.js";
import { ReactionApi } from "../../api/ReactionApi.js";
import { csReactionPicker } from "../../reaction/define/reaction-picker.element.js";
import { csReactionItem } from "../../reaction/display/reaction-item.js";

export class TextRenderer extends baseRenderer {
    item!: ITrelloActionComment;
    El!: HTMLDivElement;

    async RenderText(): Promise<any> {
        this.item = JSON.parse(this.src) as ITrelloActionComment;

        this.El = document.createElement("div");

        const options = {

            avatar: "/assets/images/user.jpg",
            time: new Date(this.item.date).toLocaleTimeString(),
            content: this.item.data.text
        }

        if (this.item.memberCreator.avatarUrl)
            options.avatar = `${this.item.memberCreator.avatarUrl}/30.png`;

        var raw = await Page.GetComponent("/trello/message/template/text-comment.html", options)

        this.El.innerHTML = raw;


        this.El.querySelector("#btn-show-reaction")?.addEventListener("click", async _ => {
            this.DisplayReactions();
        })

        this.El.querySelector("#btn-add-reaction")!
            .addEventListener("click", async _ => {
                document.body.classList.add("loading");

                var R = new csReactionPicker();

                R.addEventListener("on-icon-selection", async event => {

                    var k = event as CustomEvent;
                    console.log("ON SELECT", k.detail);

                    var data = await new ReactionApi().AddReaction(this.item.id, k.detail);
                    console.log(data.RawText);
                    // var dip = this.El.querySelector(".reaction-preview")!
                    // dip.textContent = (data.ToList() as ITrelloReaction[]).map(u => {
                    //     return u.emoji.native
                    // }).join(" ")

                    this.DisplayReactions();

                })

                document.body.appendChild(R);

                document.body.classList.remove("loading")
            })

        this.El.querySelector("#btn-delete-reaction")!
            .addEventListener("click", async _ => {

                var parentx = (this.El.getRootNode() as ShadowRoot).host;
                Page.WaitForConformation("Delete Message ", async () => {
                    var data = await new MessageApi().Delete(this.item.id);
                    parentx.parentElement?.removeChild(parentx)
                }, { action: "none" })


            })

        this.El.querySelector("#btn-edit-document")!
            .addEventListener("click", async _ => {

                var M = new AppModal();

                var fb = new FormBuilder();
                fb.textarea("title", this.item.data.text)
                fb.OnSubmit = async () => {
                var dta = await new MessageApi().Update(this.item.data.card.id ,this.item.id,  { text: fb.Inputs.get("title")!.value });

                    // itx.name = nameک
                    this.item.data.text = fb.Inputs.get("title")!.value;
                   
                    
                    Page.CloseModal();
                    this.El.querySelector("msg-content")!.textContent = this.item.data.text;
                }
                fb.finilize();
                M.Show(fb.element);


            })




        this.DisplayReactions();

        return this.El;
    }
    async DisplayReactions() {
        document.body.classList.add("loading")
        var data = await new ReactionApi().OfComment(this.item.id);


        var dip = this.El.querySelector(".reaction-preview")!;
        dip.innerHTML = "";
        var collection = data.ToList() as ITrelloReaction[];

        new Set(collection.map(k => k.idEmoji))
            .forEach(emoj => {
                var k = new csReactionItem();
                k.collection = collection.filter(h => h.emoji.unified == emoj);
                dip.appendChild(k);
            })

        document.body.classList.remove("loading")



    }

    constructor(src: string) {
        super(src);

    }
}


var smp =
    [
        {
            "id": "610dba469b3ae478748b73e5",
            "idMember": "56a78b166adb63ac67f45a4f",
            "idModel": "610db9b8a210c76449c8a9cd",
            "idEmoji": "1F621",
            "member": {
                "id": "56a78b166adb63ac67f45a4f",
                "activityBlocked": false,
                "avatarHash": "36bcb67f0f63053219310bf292c46c9c",
                "avatarUrl": "https://trello-members.s3.amazonaws.com/56a78b166adb63ac67f45a4f/36bcb67f0f63053219310bf292c46c9c",
                "fullName": "hossein sedighian",
                "idMemberReferrer": "569dcfe1431afa7707cbc967",
                "initials": "HS",
                "nonPublic": {},
                "nonPublicAvailable": true,
                "username": "hosseinsedighian1"
            }, "emoji": {
                "unified": "1F621",
                "native": "😡",
                "name": "POUTING FACE",
                "skinVariation": null,
                "shortName": "rage"
            }
        }]