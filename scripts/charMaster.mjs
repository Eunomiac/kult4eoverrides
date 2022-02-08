// #region ▮▮▮▮▮▮▮[IMPORTS]▮▮▮▮▮▮▮ ~
import kult4eActor from "../../../systems/kult4e/modules/sheets/kult4eActor.js";
import kult4ePCsheet from "../../../systems/kult4e/modules/sheets/kult4ePCsheet.js";
import kult4eNPCsheet from "../../../systems/kult4e/modules/sheets/kult4eNPCsheet.js";
import kult4eitemsheet from "../../../systems/kult4e/modules/sheets/kult4eitemsheet.js";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮

// #region ████████ SHEET OVERRIDES: Overriding Actor Sheet with Subclass Extension ████████ ~
const TEMPLATES = {
	pc: "modules/kult4eoverrides/html/sheets/pc-sheet.hbs",
	npc: "modules/kult4eoverrides/html/sheets/npc-sheet.hbs",
	advantage: "modules/kult4eoverrides/html/sheets/advantage-sheet.hbs",
	advantageCard: "modules/kult4eoverrides/html/partials/advantage-card.hbs",
	disadvantage: "modules/kult4eoverrides/html/sheets/disadvantage-sheet.hbs",
	disadvantageCard: "modules/kult4eoverrides/html/partials/disadvantage-card.hbs",
	darksecret: "modules/kult4eoverrides/html/sheets/darksecret-sheet.hbs",
	darksecretCard: "modules/kult4eoverrides/html/partials/darksecret-card.hbs",
	gear: "modules/kult4eoverrides/html/sheets/gear-sheet.hbs",
	gearCard: "modules/kult4eoverrides/html/partials/gear-card.hbs",
	move: "modules/kult4eoverrides/html/sheets/move-sheet.hbs",
	moveCard: "modules/kult4eoverrides/html/partials/move-card.hbs",
	relationship: "modules/kult4eoverrides/html/sheets/relationship-sheet.hbs",
	relationshipCard: "modules/kult4eoverrides/html/partials/relationship-card.hbs",
	weapon: "modules/kult4eoverrides/html/sheets/weapon-sheet.hbs",
	weaponCard: "modules/kult4eoverrides/html/partials/weapon-card.hbs"
};

// class kult4eOverridesActor extends kult4eActor {
// 	get template() { return sheetTemplates.pc }
// }

class kult4eOverridesPCSheet extends kult4ePCsheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["kult4eoverrides", "sheet", "actor", "pc"],
			template: TEMPLATES.pc
		});
	}

	get template() { return TEMPLATES.pc }
}

class kult4eOverridesNPCSheet extends kult4eNPCsheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["kult4eoverrides", "sheet", "actor", "npc"],
			template: TEMPLATES.npc
		});
	}

	get template() { return TEMPLATES.npc }
}

class kult4eOverridesItemSheet extends kult4eitemsheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["kult4eoverrides", "sheet", "item"]
		});
	}
	get template() { return TEMPLATES[this.item.data.type] }
}
// #endregion ▄▄▄▄▄ SHEET OVERRIDES ▄▄▄▄▄

// #region ▮▮▮▮▮▮▮[EXPORTS]▮▮▮▮▮▮▮ ~
const templates = Object.values(TEMPLATES);
export {
	kult4eActor,
	kult4ePCsheet,
	kult4eNPCsheet,
	kult4eitemsheet,
	// kult4eOverridesActor,
	kult4eOverridesPCSheet,
	kult4eOverridesNPCSheet,
	kult4eOverridesItemSheet,
	templates
};
// #endregion ▮▮▮▮[EXPORTS]▮▮▮▮