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
import U from "./scripts/utilities.mjs";
import JSONDATA, {PARSERS} from "./scripts/jsonImport.mjs";
/*!DEVCODE*/
// #endregion ▒▒▒▒[IMPORTS]▒▒▒▒

/*DEVCODE*/
const stringMap = (obj, mapFunc) => {
	if (typeof obj === "string") { return mapFunc(obj) }
	if (!obj) { return obj }
	if (["number", "boolean", "function"].includes(typeof obj)) { return obj }
	if (Array.isArray(obj)) { return obj.map((elem) => stringMap(elem, mapFunc)) }
	return Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, stringMap(val, mapFunc)]));
};

// FIRST PASS: Iterate through all strings, adding formatting
const parseJSONData = (data) => {
	// Strip page numbers
	data = stringMap(data, (str) => str.replace(/\s*\d\d\d\s*/g, ""));

	// Convert pipe-delimited strings to arrays
	["description", "lists", "results", "suffix"].forEach((key) => {
		data[key] = stringMap(data[key], (str) => {
			if (/^\|/.test(str)) {
				return str.split(/\|/).slice(1);
			} else if (/\|/.test(str)) {
				console.error(`String '${str}' has a pipe, but not at the start`);
			}
			return str;
		});
	});

	// Wrap key words and phrases in <span> tags with indicated classes
	["description", "lists", "results", "rollPhrase", "suffix"].forEach((key) => {
		data[key] = stringMap(data[key], (str) => {
			[
				["\\[\\[\\[[^\\]]+\\]\\]\\]", "move-name"],
				["\\+(?:Fortitude|Willpower|Reflexes|Reason|Intuition|Perception|Coolness|Violence|Charisma|Soul|0|Varies|Attribute)", "roll-desc"],
				["(Serious|Critical)\\s+[Ww]oun[a-z]+", "keyword"],
				["(?:[Tt]he)?\\s+GM(?:\\s+\\w+){1,3}\\s+(?:Hold|Moves?)", "gm-phrase"],
				["Avoid Harm", "move-name"],
				["[\\s()+−\\d]*(?:Stability|Rage|Power|Edges?|Harm|Time|Relations?|ongoing)[\\s()+−\\d]*", "keyword"],
				["Endure Injury", "move-name"],
				["Keep [Ii]t Together", "move-name"],
				["Act Under Pressure", "move-name"],
				["Engage [Ii]n Combat", "move-name"],
				["Influence (?:Ano|O)ther", "move-name"],
				["See [Tt]hrough [Tt]he Illusion", "move-name"],
				["Read [Aa] Person", "move-name"],
				["Observe [Aa] Situation", "move-name"],
				["Investigate", "move-name"],
				["Help(?:\/|\\s+[Oo]r\\s+)Hinder(?:\\s+(?:Ano|O)ther)?", "move-name"]
			]
				.forEach(([pat, className]) => {
					str = str
						.replace(new RegExp(`(${pat})`, "g"), `<span class="item-${className}">$1</span>`)
						.replace(/\[\[\[([^\]]+)\]\]\]/g, "$1");
				});
			return str;
		});
	});

	// Reposition white space and parentheses to outside of tags
	["description", "lists", "results", "rollPhrase", "suffix"].forEach((key) => {
		data[key] = stringMap(data[key], (str) => str
			.replace(/(<[^>]+>)([\s(]*)(.*?)([\s)]*)(<\/[^>]+>)/g, "$2$1$3$5$4"));
	});

	// Repeat parsing for any sub-moves
	if (data.moves?.length) {
		data.moves = data.moves.map((moveData) => parseJSONData(moveData));
	}

	return data;
};
const parsedData = JSONDATA.map(parseJSONData);

const awaitApply = async (itemPromise, assignData = {}) => {
	const item = await itemPromise;
	return {
		...item,
		...assignData
	};
};

const parseItemData = async () => Promise.all(parsedData
	.filter((data) => ["move", "advantage", "disadvantage"].includes(data.itemType))
	.map(async (itemData) => PARSERS[itemData.itemType](itemData)));
/*!DEVCODE*/

// #region ████████ ON INIT: On-Initialization Hook ████████
kult4eOverridesItem.RegisterHooks();

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

	Handlebars.registerHelper("select", function handlebarSelect(value, options) {
		const $el = $("<select />").html(options.fn(this));
		$el.find(`[value="${value}"]`).attr({selected: "selected"});
		return $el.html();
	});
	await loadTemplates(Object.values(TEMPLATES));

	/*DEVCODE*/
	const ITEMDATA = await parseItemData();
	KO.log("JSON Item Data", JSON.stringify(ITEMDATA, null, 2));
	window.createItems = () => {
		Item.createDocuments(ITEMDATA);
	};
	window.clearItems = async () => Item.deleteDocuments(Array.from(game.items.values())
		.filter((item) => !item.isEmbedded)
		.map((item) => item.id));
	window.resetItems = async () => {
		await window.clearItems();
		window.createItems();
	};
	/*!DEVCODE*/

	KO.display("██████ Kult 4E Override Complete █████████");
});
// #endregion ▄▄▄▄▄ ON INIT ▄▄▄▄▄