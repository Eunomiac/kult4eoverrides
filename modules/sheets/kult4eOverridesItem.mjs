import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";
import {PARSERS} from "../../scripts/jsonImport.mjs";

export default class kult4eOverridesItem extends Item {
	// static get RegisterHooks() {
	// 	return () => {
	// 		Hooks.on("createItem", (item) => {
	// 			if (item.moves.length && item.isEmbedded && item.parent && item.parent instanceof Actor) {
	// 				item.parent.createEmbeddedDocuments("Item", item.moves);
	// 			}
	// 		});
	// 	};
	// }

	async _onCreate(data, options, user) {
		await super._preCreate(data, options, user);
		KO.log("On Create Item", data, options, user);
		if (this.moves.length && this.isEmbedded && this.parent instanceof Actor) {
			this.parent.createEmbeddedDocuments("Item", this.moves);
		}
	}

	get template() { return TEMPLATES[this.type] }

	get koFlags() { return this.data.flags.kult4eoverrides ?? {} }

	get moves() { return (this._moves = this._moves ?? (this.koFlags.moves ?? []).map((data) => PARSERS.move(data))) }
}