// #region ▒░▒░▒░▒[IMPORTS] Importing Modules ▒░▒░▒░▒ ~
import kult4eActor from "../../systems/kult4e/modules/sheets/kult4eActor.js";
import kult4ePCsheet from "../../systems/kult4e/modules/sheets/kult4ePCsheet.js";
import kult4eNPCsheet from "../../systems/kult4e/modules/sheets/kult4eNPCsheet.js";
import kult4eitemsheet from "../../systems/kult4e/modules/sheets/kult4eitemsheet.js";
import kult4eOverridesActor from "./modules/sheets/kult4eOverridesActor.mjs";
import kult4eOverridesPCSheet from "./modules/sheets/kult4eOverridesPCSheet.mjs";
import kult4eOverridesNPCSheet from "./modules/sheets/kult4eOverridesNPCSheet.mjs";
import kult4eOverridesItemSheet from "./modules/sheets/kult4eOverridesItemSheet.mjs";
import registerDebugger from "./modules/system/logger.mjs";
import registerSystemSettings, {TEMPLATES} from "./modules/system/settings.mjs";
// #endregion ▒▒▒▒[IMPORTS]▒▒▒▒

// #region ████████ ON INIT: On-Initialization Hook ████████
Hooks.once("init", async () => {
	registerDebugger();
	registerSystemSettings();

	/*DEVCODE*/
	KO.display("██████ Initializing Kult 4E Overrides ██████");
	/*!DEVCODE*/

	CONFIG.Actor.documentClass = kult4eOverridesActor;

	Actors.unregisterSheet("kult4e", kult4ePCsheet);
	Actors.unregisterSheet("kult4e", kult4eNPCsheet);
	Actors.registerSheet("kult4e", kult4eOverridesPCSheet, {
		types: ["pc"],
		makeDefault: true
	});
	Actors.registerSheet("kult4e", kult4eOverridesNPCSheet, {
		types: ["npc"],
		makeDefault: true
	});

	Items.unregisterSheet("kult4e", kult4eitemsheet);
	Items.registerSheet("kult4e", kult4eOverridesItemSheet, {
		types: ["move", "weapon", "advantage", "disadvantage", "darksecret", "relationship", "gear"],
		makeDefault: true
	});

	Handlebars.registerHelper("select", function handlebarSelect(value, options) {
		const $el = $("<select />").html(options.fn(this));
		$el.find(`[value="${value}"]`).attr({selected: "selected"});
		return $el.html();
	});
	await loadTemplates(Object.values(TEMPLATES));

	/*DEVCODE*/
	KO.display("██████ Kult 4E Override Complete █████████");
	/*!DEVCODE*/
});
// #endregion ▄▄▄▄▄ ON INIT ▄▄▄▄▄