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
import JSONDATA from "./scripts/jsonImport.mjs";
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
const parsedData = JSONDATA.map((itemData) => {
	// Strip page numbers
	itemData = stringMap(itemData, (str) => str.replace(/\s*\d\d\d\s*/g, ""));

	// Convert pipe-delimited strings to arrays
	["description", "lists", "results", "suffix"].forEach((key) => {
		itemData[key] = stringMap(itemData[key], (str) => {
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
		itemData[key] = stringMap(itemData[key], (str) => {
			[
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
					str = str.replace(new RegExp(`(${pat})`, "g"), `<span class="item-${className}">$1</span>`);
				});
			return str;
		});
	});

	// Reposition white space to outside of tags
	["description", "lists", "results", "rollPhrase", "suffix"].forEach((key) => {
		itemData[key] = stringMap(itemData[key], (str) => str
			.replace(/(<[^>]+>)(\s*)(.*?)(\s*)(<\/[^>]+>)/g, "$2$1$3$5$4"));
	});

	return itemData;
});

const wrapItemDiv = (lines) => `<div class="item-text">${
	lines.filter((line) => Boolean(line)).join("\n")
}</div>`;
const stripHTML = (str) => {
	do {
		str = str.replace(/<[^>]+>(.*)<\/[^>]+>/g, "$1");
	} while (/<[^>]+>(.*)<\/[^>]+>/.test(str));
	return str;
};

const subMoveCheck = (data) => {
	if (data.moveName && data.name !== data.moveName) {
		return `<span class="source-name">${{
			advantage: "Advantage",
			disadvantage: "Disadvantage",
			weapon: "Weapon",
			gear: "Gear",
			darksecret: "Dark Secret",
			relationship: "Relation"
		}[data.itemType]}: ${data.name}</span>`;
	}
	return "";
};
const centerCheck = (resultData) => {
	if (!resultData.list && stripHTML(resultData.text).length <= 60) {
		return `<p><center>${resultData.text}</center></p>`;
	}
	return `<p>${resultData.text}</p>`;
};
const listCheck = (resultData) => {
	if (resultData.list) {
		return `<ul>${resultData.list.map((line) => `<li>${line}</li>`).join("\n")}</ul>`;
	}
	return "";
};
const suffixCheck = (resultData, suffixData) => {
	if (/Hold/.test(`${resultData.text}${resultData.list?.join("")}`) && /Hold/.test(suffixData.text)) {
		return `<p>${suffixData.text}</p>${listCheck(suffixData)}`;
	}
	return "";
};
const imgCheck = async (itemData) => {
	let imgSrc, imgExists;
	if (itemData.moveName) {
		imgSrc = `modules/kult4eoverrides/assets/icons/move/${itemData.moveName.replace(/\s/g, "-").replace(/[:]/g, "").toLowerCase()}.svg`;
		try {
			imgExists = await srcExists(imgSrc);
		} catch (errObj) {
			imgExists = false;
		}
	}
	if (!imgExists) {
		imgSrc = `modules/kult4eoverrides/assets/icons/${itemData.itemType}/${itemData.name.replace(/\s/g, "-").toLowerCase()}.svg`;
		try {
			imgExists = await srcExists(imgSrc);
		} catch (errObj) {
			imgExists = false;
		}
	}
	if (!imgExists) {
		imgSrc = `modules/kult4eoverrides/assets/icons/${itemData.itemType}/${itemData.itemType}-default.svg`;
	}
	return imgSrc;
};

// SECOND PASS: Construct item data in accordance with kult4e template.json
const PARSERS = {
	move: async (data) => ({
		"name": data.moveName ?? data.name,
		"type": "move",
		"img": await imgCheck(data),
		"data.attributemod": data.attributemod === "choose" ? "none" : data.attributemod ?? "none",
		"data.completesuccess": wrapItemDiv([
			subMoveCheck(data),
			centerCheck(data.results.success),
			listCheck(data.results.success),
			suffixCheck(data.results.success, data.suffix)
		]),
		"data.partialsuccess": wrapItemDiv([
			subMoveCheck(data),
			centerCheck(data.results.partial),
			listCheck(data.results.partial),
			suffixCheck(data.results.partial, data.suffix)
		]),
		"data.failure": wrapItemDiv([
			subMoveCheck(data),
			centerCheck(data.results.fail),
			listCheck(data.results.fail),
			suffixCheck(data.results.fail, data.suffix)
		]),
		"data.trigger": wrapItemDiv([
			subMoveCheck(data),
			`<p><span class="item-trigger">${data.trigger}</span> ${data.rollPhrase}</p>`
		]),
		"data.specialflag": {
			"keep it together": 1,
			"see through the illusion": 2,
			"endure injury": 3
		}[data.name.toLowerCase()] ?? 0
	})
};

const parseItemData = () => Promise.all(parsedData
	.filter((data) => data.itemType === "move" || (["advantage", "disadvantage"].includes(data.itemType) && data.type === "active"))
	.map((itemData) => PARSERS.move(itemData)));
/*!DEVCODE*/

// #region ████████ ON INIT: On-Initialization Hook ████████
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
	KO.log(JSON.stringify(ITEMDATA, null, 2));
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