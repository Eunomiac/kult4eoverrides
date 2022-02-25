import kult4ePCsheet from "../../../../systems/kult4e/modules/sheets/kult4ePCsheet.js";
import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";

export default class kult4eOverridesPCSheet extends kult4ePCsheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["kult4eoverrides", "sheet", "actor", "pc"],
			template: TEMPLATES.pc
		});
	}

	get template() { return TEMPLATES.pc }

	getData() {
		const data = super.getData();
		data.flags = this.actor.data.flags;
		data.isSheetOpen = data.flags?.kult4eoverrides?.isSheetOpen ?? false;
		data.advancementLines = [
			{template: "boxline", type: "aware", index: 0, isActive: true, boxes: [true, false, false, false, false, false], label: "+1 <u>active</u> Attribute <i>(+3 max)</i>"},
			{template: "boxline", type: "aware", index: 1, isActive: true, boxes: [false, false], label: "+1 <u>passive</u> Attribute <i>(+3 max)</i>"},
			{template: "boxline", type: "aware", index: 2, isActive: true, boxes: [true], label: "+1 <u>active</u> Attribute <i>(+4 max)</i>"},
			{template: "boxline", type: "aware", index: 3, isActive: true, boxes: [true, false, false], label: "Gain an Archetype Advantage"},
			{template: "header", isActive: true, label: "After <u>TWO</u> more Advancements ..."},
			{template: "boxline", type: "invalid", index: 4, boxes: [false, false], label: "+1 <u>any</u> Attribute <i>(+4 max)</i>"},
			{template: "boxline", type: "invalid", index: 5, boxes: [false, false], label: "Gain <u>any</u> Aware Advantage"},
			{template: "boxline", type: "invalid", index: 6, boxes: [false], label: "End your Arc"},
			{template: "boxline", type: "invalid", index: 7, boxes: [false], label: "Change your Archetype"},
			{template: "header", isActive: true, label: "After <u>SEVEN</u> more Advancements ..."},
			{template: "boxline", type: "invalid", index: 8, boxes: [false], label: "Advance to an Enlightened Archetype"}
		];


		/* Filter for items with moves attached, create data.specialMoves schema
			 for different categories of move */
		data.specialMoves = {
			advantage: data.advantages.filter((advantage) => advantage.type === "advantage")
		};

		/* koFlags schema for Advancements --> Array, ordered by purchases.
			[
				{
					index: number, 				// which .advancement-line was this purchase bought from -- call handler function, also indexed by this number
					boxNum: number,				// which .advancement-box was clicked to purchase this
					data: Record<string,stringLike>,	// options object defined when purchased (in listeners), passed to handler function
				}
			]
		*/
		/* Prepare data for Advancements section:
				-

		*/

		KO.log("PC Sheet GetData => ", data);
		return data;
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find(".token-add-edge").click((event) => {
			const li = $(event.currentTarget).parents(".item-name");
			const item = this.actor.getEmbeddedDocument("Item", li.data("itemId"));
			const newtokens = Number(item.data.data.tokens) + 1;
			KO.log("Add Tokens => ", {currentTokens: item.data.data.tokens, newTokens: newtokens});
			item.update({"data.tokens": newtokens});
		});

		html.find(".token-spend-edge").click((event) => {
			const li = $(event.currentTarget).parents(".item-name");
			const item = this.actor.getEmbeddedDocument("Item", li.data("itemId"));
			const newtokens = Number(item.data.data.tokens) - 1;
			item.update({"data.tokens": newtokens});
		});

		html.find(".sheet-lock").click((event) => {
			this.actor.setFlag("kult4eoverrides", "isSheetOpen", !this.actor.koFlags.isSheetOpen);
		});

		html.find(".attribute-roll").click((event) => {
			const attrName = $(event.currentTarget).data("attrName");
			KO.log(`Attribute name => ${attrName}`);
			this.actor.moveroll(attrName);
		});

		html.find(".tabButton").click((event) => {
			this.actor.setFlag("kult4eoverrides", "curTab", $(event.currentTarget).attr("data-tab"));
		});

		html.find(".advancement-box").click((event) => {

		});

		const curTab = this.actor.koFlags.curTab || "Front";
		html.find(`.tabButton[data-tab="${curTab}"`).addClass("active");
		html.find(`.${this.actor.id}-tab`).each((_, elem) => {
			elem.style.display = elem.id === curTab ? "block" : "none";
		});
		// const tabSections = document.getElementsByClassName(`${this.actor.id}-tab`);
		// Array.from(tabSections).forEach((tabSection) => {
		// 	tabSection.style.display = tabSection.id === curTab ? "block" : "none";
		// });
	}
}
