// #region ▒░▒░▒░▒[IMPORTS] Importing Modules ▒░▒░▒░▒ ~
import kult4eActor from "../../systems/kult4e/modules/sheets/kult4eActor.js";
import kult4ePCsheet from "../../systems/kult4e/modules/sheets/kult4ePCsheet.js";
import kult4eNPCsheet from "../../systems/kult4e/modules/sheets/kult4eNPCsheet.js";
import kult4eitemsheet from "../../systems/kult4e/modules/sheets/kult4eitemsheet.js";
import kult4eOverridesActor from "./modules/sheets/kult4eOverridesActor.mjs";
import kult4eOverridesPCSheet from "./modules/sheets/kult4eOverridesPCSheet.mjs";
import kult4eOverridesNPCSheet from "./modules/sheets/kult4eOverridesNPCSheet.mjs";
import kult4eOverridesItem from "./modules/sheets/kult4eOverridesItem.mjs";
import kult4eOverridesItemSheet from "./modules/sheets/kult4eOverridesItemSheet.mjs";
import registerDebugger from "./modules/system/logger.mjs";
import registerSystemSettings, {TEMPLATES} from "./modules/system/settings.mjs";
/*DEVCODE*/
import U, {HELPERS} from "./scripts/utilities.mjs";
import BUILD_ITEM_DATA, {PARSERS} from "./scripts/jsonImport.mjs";
/*!DEVCODE*/
// #endregion ▒▒▒▒[IMPORTS]▒▒▒▒

// #region ████████ ON INIT: On-Initialization Hook ████████
// kult4eOverridesItem.RegisterHooks();

Hooks.once("init", async () => {
	registerDebugger();
	registerSystemSettings();

	KO.display("██████ Initializing Kult 4E Overrides ██████");

	CONFIG.Actor.documentClass = kult4eOverridesActor;
	CONFIG.Item.documentClass = kult4eOverridesItem;

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

	await loadTemplates(Object.values(TEMPLATES));
	Handlebars.registerHelper(HELPERS);

	/*DEVCODE*/
	const ITEMDATA = await BUILD_ITEM_DATA();
	KO.log("BUILT ITEM DATA", ITEMDATA);
	window.resetItems = async () => {
		await Item.deleteDocuments(Array.from(game.items.values()).map((item) => item.id));
		await Folder.deleteDocuments(Array.from(game.folders.values()).map((folder) => folder.id));
		const folderMap = {
			advantage: "Advantages",
			disadvantage: "Disadvantages",
			move: "Moves",
			weapon: "Weapons",
			darksecret: "Dark Secrets"
		};
		const itemFolders = {
			"Advantages": "#4d4023",
			"Disadvantages": "#520000",
			"Moves": "#000000",
			"Weapons": "#FF0000",
			"Dark Secrets": "#6d00a8"
		};
		const FOLDERDATA = Object.entries(itemFolders).map(([folderName, folderColor]) => ({
			name: folderName,
			type: "Item",
			sorting: "a",
			color: folderColor
		}));
		const folders = await Folder.createDocuments(FOLDERDATA);
		KO.log("FOLDERS", folders);

		const items = await Item.createDocuments(ITEMDATA);
		items.forEach((item) => {
			item.update({folder: game.folders.getName(folderMap[item.type]).id});
		});
	};
	/*!DEVCODE*/

	KO.display("██████ Kult 4E Override Complete █████████");
});
// #endregion ▄▄▄▄▄ ON INIT ▄▄▄▄▄