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

const tagWrap = (tag, lines, classes, delim = "", isResolvingList = false) => {
	lines = [lines].flat().filter((line) => Boolean(line));
	if (lines.length) {
		lines = lines.join(delim);
		if (/\$(OPTIONS|QUESTIONS)\$/.test(lines)) {
			const listType = lines.match(/\$(OPTIONS|QUESTIONS)\$/)[1];
			if (isResolvingList) {
				const afterLines = lines.match(new RegExp(`\\$${listType}\\$(.*)$`))?.[1]?.trim() ?? "";
				lines = lines.replace(new RegExp(`\\s*\\$${listType}\\$.*$`), "");
				return [
					`<${tag}${classes ? ` class="${classes}"` : ""}>${lines}</${tag}>`,
					`@@@${listType}@@@`,
					afterLines.length > 0 ? `<${tag}${classes ? ` class="${classes}"` : ""}>${afterLines}</${tag}>` : ""
				].join("");
			}
			lines = lines.replace(new RegExp(`\\s*\\$${listType}\\$`), "").trim();
			return `<${tag}${classes ? ` class="${classes}"` : ""}>${lines}</${tag}>$${listType}$`;
		}
		return `<${tag}${classes ? ` class="${classes}"` : ""}>${lines}</${tag}>`;
	}
	return "";
};

const tagStrip = (str) => {
	if (str) {
		do {
			str = `${str}`.replace(/<[^>]+>(.*)<\/[^>]+>/g, "$1");
		} while (/<[^>]+>(.*)<\/[^>]+>/.test(str));
	}
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
	if (!resultData || !resultData.text) { return "" }
	if (!resultData.list && tagStrip(resultData.text).length <= 60) {
		return `<p><center>${resultData.text}</center></p>`;
	}
	return `<p>${resultData.text}</p>`;
};
const listCheck = (listLines) => {
	listLines = [listLines].flat().filter((line) => Boolean(line));
	if (listLines.length) {
		return `<ul>${listLines.map((line) => `<li>${line}</li>`).join("\n")}</ul>`;
	}
	return "";
};
const suffixCheck = (resultData, suffixData) => {
	if (/Hold/.test(`${resultData.text}${resultData.list?.join("")}`) && /Hold/.test(suffixData.text)) {
		return `<p>${suffixData.text}</p>${listCheck(suffixData.list)}`;
	}
	return "";
};
const imgCheck = async (itemData) => {
	// return `modules/kult4eoverrides/assets/icons/${itemData.itemType}/${itemData.itemType}-default.svg`;
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
const descriptionCheck = (itemData, isDescribingMove) => tagWrap("div", [
	isDescribingMove ? subMoveCheck(itemData) : "",
	tagWrap("p", [
		itemData.description.intro,
		tagWrap("span", itemData.trigger, "item-trigger"),
		itemData.description.static,
		itemData.rollPhrase
	], null, " ", true),
	...itemData.hasEdges
		? [
				centerCheck({text: `This ${isDescribingMove ? "Move" : U.capitalize(itemData.itemType)} grants <span class="item-keyword">Edges</span>.`}),
				"Spend <span class=\"item-keyword\">Edges</span> to:",
				listCheck(itemData.lists.edges)
			]
		: [],
	tagWrap("p", [
		itemData.suffix.text,
		listCheck(itemData.suffix.list)
	], null, "", true)
], "item-text", "\n")
	.replace(/@@@OPTIONS@@@/, listCheck(itemData.lists.options))
	.replace(/@@@QUESTIONS@@@/, listCheck(itemData.lists.questions));
const resultCheck = (result, data, isCheckingSubMove = true) => {
	if (!result) { return result }
	return tagWrap("div", [
		isCheckingSubMove ? subMoveCheck(data) : "",
		tagWrap("p", result.list ? result.text : centerCheck(result)),
		listCheck(result.list),
		suffixCheck(result, data.suffix)
	], "item-text");
};

// SECOND PASS: Construct item data in accordance with kult4e template.json
const PARSERS = {
	move: async (data) => ({
		"name": data.moveName ?? data.name,
		"type": "move",
		"img": await imgCheck(data),
		"data.attributemod": data.attributemod ?? "none",
		"data.completesuccess": resultCheck(data.results.success, data),
		"data.partialsuccess": resultCheck(data.results.partial, data),
		"data.failure": resultCheck(data.results.fail, data),
		"data.trigger": descriptionCheck(data, true),
		"data.specialflag": {
			"keep it together": 1,
			"see through the illusion": 2,
			"endure injury": 3
		}[data.name.toLowerCase()] ?? 0,
		"flags.kult4eoverrides.dataJSON": JSON.stringify(data)
	}),
	advantage: async (data) => ({
		"name": data.name,
		"type": "advantage",
		"img": await imgCheck(data),
		"data.attributemod": data.attributemod ?? "none",
		"data.type": data.type,
		"data.effect": descriptionCheck(data),
		"data.completesuccess": resultCheck(data.results.success, data, false),
		"data.partialsuccess": resultCheck(data.results.partial, data, false),
		"data.failure": resultCheck(data.results.fail, data, false),
		"data.tokens": data.hasTokens ? 0 : "",
		"data.hasTokens": data.hasTokens,
		"flags.kult4eoverrides.moveName": data.type === "active"
			? data.moveName ?? data.name
			: null,
		"flags.kult4eoverrides.dataJSON": JSON.stringify(data)
	}),
	disadvantage: async (data) => ({
		"name": data.name,
		"type": "disadvantage",
		"img": await imgCheck(data),
		"data.effect": descriptionCheck(data),
		"data.attributemod": data.attributemod ?? "none",
		"data.type": data.type,
		"data.completesuccess": resultCheck(data.results.success, data, false),
		"data.partialsuccess": resultCheck(data.results.partial, data, false),
		"data.failure": resultCheck(data.results.fail, data, false),
		"data.tokens": data.hasTokens ? 0 : "",
		"data.hasTokens": data.hasTokens,
		"flags.kult4eoverrides.moveName": data.type === "active"
			? data.moveName ?? data.name
			: null,
		"flags.kult4eoverrides.dataJSON": JSON.stringify(data)
	})
};

const awaitApply = async (itemPromise, assignData = {}) => {
	const item = await itemPromise;
	return {
		...item,
		...assignData
	};
};

const parseItemData = async () => {
	const altMoveList = await Promise.all(parsedData
		.filter((data) => data.itemType.startsWith("+"))
		.map((data) => {
			data.name = data.itemType.slice(1);
			const {itemType} = data;
			data.itemType = "move";
			return awaitApply(PARSERS.move(data), {
				"flags.kult4eoverrides.linkType": "advantage",
				"flags.kult4eoverrides.linkName": data.name
			});
		}));

	console.log(altMoveList);

	const altMoves = {};
	altMoveList.forEach((move) => {
		const parentName = move["flags.kult4eoverrides.linkName"];
		altMoves[parentName] = altMoves[parentName] ?? [];
		altMoves[parentName].push(move);
	});

	console.log(altMoves);
	console.log("Explosives Expert" in altMoves);

	const returnData = await Promise.all(parsedData
		.filter((data) => ["move", "advantage", "disadvantage"].includes(data.itemType))
		.map(async (itemData) => {
			const data = await PARSERS[itemData.itemType](itemData);
			if (data.name in altMoves) {
				data["flags.kult4eoverrides.altMove"] = JSON.stringify(altMoves[data.name]);
				KO.log(JSON.stringify(data, null, 2));
			}
			return data;
		}));

	const testRecord = returnData.find((datum) => datum.name === "Explosives Expert");
	KO.log("Explosives Expert: ", testRecord);

	return returnData;
};

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
	// KO.log(JSON.stringify(ITEMDATA, null, 2));
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