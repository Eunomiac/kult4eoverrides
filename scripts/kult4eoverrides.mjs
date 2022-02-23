// #region ▒░▒░▒░▒[IMPORTS] Importing Modules ▒░▒░▒░▒ ~
import {
	kult4eActor,
	kult4ePCsheet,
	kult4eNPCsheet,
	kult4eitemsheet,
	kult4eOverridesActor,
	kult4eOverridesPCSheet,
	kult4eOverridesNPCSheet,
	kult4eOverridesItemSheet,
	templates
} from "./charMaster.mjs";
import registerDebugger from "./debugger.mjs";
import registerSystemSettings from "./settings.mjs";
// #endregion ▒▒▒▒[IMPORTS]▒▒▒▒

// #region ████████ ON INIT: On-Initialization Hook ████████
Hooks.once("init", async () => {
	registerDebugger();
	registerSystemSettings();

	KO.display("██████ Initializing Kult 4E Overrides ██████");
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
	loadTemplates(templates);
	KO.display("██████ Kult 4E Override Complete █████████");
});
// #endregion ▄▄▄▄▄ ON INIT ▄▄▄▄▄