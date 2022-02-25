import kult4eNPCsheet from "../../../../systems/kult4e/modules/sheets/kult4eNPCsheet.js";
import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";

export default class kult4eOverridesNPCSheet extends kult4eNPCsheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["kult4eoverrides", "sheet", "actor", "npc"],
			template: TEMPLATES.npc
		});
	}

	get template() { return TEMPLATES.npc }
}