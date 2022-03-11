import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";
import {PARSERS} from "../../scripts/jsonImport.mjs";

export default class kult4eOverridesItem extends Item {

	async _onCreate(data, options, user) {
		await super._preCreate(data, options, user);
		if (this.isEmbedded && this.parent instanceof Actor) {
			this.parent.createEmbeddedDocuments("Item", this.moves);
		}
	}

	get template() { return TEMPLATES[this.type] }

	get koFlags() { return this.data.flags.kult4eoverrides ?? {} }

	get moves() { return (this._moves = this._moves ?? (this.koFlags.moves ?? []).map((data) => PARSERS.move(data))) }

	get attacks() { return (this._attacks = this._attacks ?? (this.koFlags.attacks ?? []).map((data) => PARSERS.move(data))) }
}