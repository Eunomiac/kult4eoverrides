import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";
import {PARSERS} from "../../scripts/jsonImport.mjs";

export default class kult4eOverridesItem extends Item {
	static get RegisterHooks() {
		return () => {
			Hooks.on("createItem", async (item) => {
				if (item.isEmbedded && item.parent && item.koFlags.movesJSON) {
					if (item.parent instanceof Actor) {
						const parsedMoveData = await Promise.all(JSON.parse(item.koFlags.movesJSON)
							.map((moveData) => PARSERS.move(moveData)));
						item.parent.createEmbeddedDocuments("Item", parsedMoveData);
					} else {
						console.log("Why the hell not?", JSON.stringify(item.parent, null, 2));
					}
				}
			});
		};
	}
	get template() { return TEMPLATES[this.type] }

	get koFlags() { return this.data.flags.kult4eoverrides ?? {} }
}