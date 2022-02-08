// #region ▒░▒░▒░▒[IMPORTS] Importing Modules ▒░▒░▒░▒ ~
import {
	kult4eActor,
	kult4ePCsheet,
	kult4eNPCsheet,
	kult4eitemsheet,
	// kult4eOverridesActor,
	kult4eOverridesPCSheet,
	kult4eOverridesNPCSheet,
	kult4eOverridesItemSheet,
	templates
} from "./charMaster.mjs";
// #endregion ▒▒▒▒[IMPORTS]▒▒▒▒

// #region ████████ ON INIT: On-Initialization Hook ████████ ~
Hooks.once("init", async () => {
	console.log("██████ INITIALIZING KULT 4E OVERRIDES ... ██████");
	loadTemplates(templates);
	console.log("██████ OVERRIDES INITIALIZATION COMPLETE █████████");

	Handlebars.registerHelper("select", function(value, options) {
		const $el = $("<select />").html(options.fn(this));
		$el.find(`[value="${value}"]`).attr({selected: "selected"});
		return $el.html();
	});
});
// #endregion ▄▄▄▄▄ ON INIT ▄▄▄▄▄

Hooks.once("setup", () => {
	console.log("██████ SETTING UP CHARACTER SHEET OVERRIDES ... ██████");
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
	console.log("██████ CHARACTER SHEET OVERRIDING COMPLETE █████████");
});