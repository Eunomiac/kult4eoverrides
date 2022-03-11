import kult4eitemsheet from "../../../../systems/kult4e/modules/sheets/kult4eitemsheet.js";
import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";

export default class kult4eOverridesItemSheet extends kult4eitemsheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["kult4eoverrides", "sheet", "item"]
		});
	}
	get template() { return TEMPLATES[this.item.data.type] }

	get isEditable() {
		return super.isEditable && (!this.item.koFlags.isFrozen || game.user.isGM);
	}

	getData() {
		const data = super.getData();
		data.isGM = game.user.isGM;
		data.flags = this.item.koFlags;
		data.isSheetOpen = data.flags?.isSheetOpen ?? false;
		data.isEditable = this.isEditable;
		console.log("DATA", data);
		return data;
	}
}