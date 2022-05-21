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
		data.isGM = game.user.isGM;
		data.flags = this.actor.data.flags;
		data.isSheetOpen = data.flags?.kult4eoverrides?.isSheetOpen ?? false;

		const advancementsToSpend = U.pInt(Math.max(Math.floor(this.actor.koFlags.xp / 5) - this.actor.numPurchasedAdvantages, 0));
		data.advancementIntro = `You have <span class="adv-number">${advancementsToSpend}</span> Advancement${advancementsToSpend !== 1 ? "s" : ""} to spend.`;
		data.advancementSubIntro = `(${5 - ((this.actor.koFlags.xp ?? 0) % 5)} XP needed for another Advancement)`;

		[data.advancementLines, data.purchaseLines] = this.actor.getAdvancementLines();
		KO.display("██████ Advancement Lines ██████");
		KO.display(data.advancementLines);

		/* Filter for items with moves attached, create data.specialMoves schema
			 for different categories of move */
		data.moves = this.actor.moves;
		data.moves.weapon = data.moves.weapon?.map((move) => {
			move.shortName = move.name.replace(/^.*:\s*/, "");
			return move;
		});

		/* Set up wound data */

		data.wounds = [];

		for (const [woundKey, woundText] of Object.entries(this.actor.data.data.woundtext)) {
			const thisWound = {};
			if (!woundText) {
				Object.assign(thisWound, {
					key: woundKey,
					type: /major/.test(woundKey) ? "major" : "critical",
					text: "",
					isUsed: false
				});
			} else {
				Object.assign(thisWound, {
					key: woundKey,
					type: /major/.test(woundKey) ? "major" : "critical",
					text: woundText,
					isStable: this.actor.data.data.woundstabilized[woundKey] === "true"
				});
			}
			if (thisWound.type === "critical") {
				data.wounds.unshift(thisWound);
			} else {
				data.wounds.push(thisWound);
			}
		}
		data.wounds.push(data.wounds.shift());


		// KO.log("getData() -> Actor Moves", data.moves);
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
		/*!DEVCODE*/

		KO.log("PC Sheet GetData => ", data);
		return data;
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find(".item-post").click((event) => {
			const li = $(event.currentTarget).parents(".item-name");
			const item = this.actor.items.get(li.data("itemId"));
			let effect;
			if (item.data.type === "disadvantage" || item.data.type === "advantage") {
				effect = item.data.data.effect;
			} else if (item.data.type === "move") {
				effect = item.data.data.trigger;
			} else if (item.data.type === "weapon") {
				effect = item.data.data.special;
			} else if (item.data.type === "gear" || item.data.type === "darksecret") {
				effect = item.data.data.description;
			}
			ChatMessage.create({
				content: `<div class='move-name'>${item.name}</div><div>${effect}</div>`,
				speaker: ChatMessage.getSpeaker({alias: this.name})
			});
		});

		html.find(".token-add-edge").click((event) => {
			const li = $(event.currentTarget).parents(".item-name");
			const item = this.actor.getEmbeddedDocument("Item", li.data("itemId"));
			if (item.name !== this.actor.koFlags.edgeSource) {
				if (this.actor.koFlags.edgeSource) {
					this.actor.items.find((itm) => itm.name === this.actor.koFlags.edgeSource)?.update({"data.tokens": 0});
				}
				this.actor.setFlag("kult4eoverrides", "edgeSource", item.name);
			}
			const newtokens = Number(item.data.data.tokens) + 1;
			KO.log("Add Tokens => ", {currentTokens: item.data.data.tokens, newTokens: newtokens});
			this.actor.setFlag("kult4eoverrides", "heldEdges", newtokens);
			item.update({"data.tokens": newtokens});
		});

		html.find(".token-spend-edge").click((event) => {
			const li = $(event.currentTarget).parents(".item-name");
			const item = this.actor.getEmbeddedDocument("Item", li.data("itemId"));
			const newtokens = Number(item.data.data.tokens) - 1;
			item.update({"data.tokens": newtokens});
			this.actor.setFlag("kult4eoverrides", "heldEdges", newtokens);
			if (newtokens === 0) {
				this.actor.setFlag("kult4eoverrides", "edgeSource", null);
			}
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

		/*DEVCODE*/
		html.find(".advancement-box").click((event) => {
			const {dataset} = event.currentTarget;
			if (dataset.type === "invalid") { return }
			if (this.actor.numPurchasedAdvantages >= Math.floor(this.actor.koFlags.xp / 5)) { return }
			const [index, box] = [dataset.row, dataset.box].map((val) => U.pInt(val));
			// debugger;
			if (Object.values(this.actor.koFlags?.purchases ?? {}).find((purch) => purch.index === index && purch.box === box)) {
				const curPurchases = {...this.actor.koFlags.purchases};
				const purchKey = Object.entries(curPurchases).find(([ind, pData]) => pData.index === ind && pData.box === box);
				delete curPurchases[purchKey];
				this.actor.setFlag("kult4eoverrides", "purchases", curPurchases);
				return;
			}
			const num = Object.values(this.actor.koFlags?.purchases ?? {}).length + 1;
			this.actor.setFlag("kult4eoverrides", "purchases", {
				...(this.actor.koFlags?.purchases ?? {}),
				[num]: {index, box}
			});
		});
		/*!DEVCODE*/

		const curTab = this.actor.koFlags.curTab || "Front";
		html.find(`.tabButton[data-tab="${curTab}"`).addClass("active");
		html.find(`.${this.actor.id}-tab`).each((_, elem) => {
			elem.style.display = elem.id === curTab ? "block" : "none";
		});
		//~ const tabSections = document.getElementsByClassName(`${this.actor.id}-tab`);
		//~ Array.from(tabSections).forEach((tabSection) => {
		//~ 	tabSection.style.display = tabSection.id === curTab ? "block" : "none";
		//~ });
	}
}
