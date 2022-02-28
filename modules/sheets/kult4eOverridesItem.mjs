import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";

export default class kult4eOverridesItem extends Item {
	static get RegisterHooks() {
		return () => {
			Hooks.on("createItem", async (item) => {
				if (item.isEmbedded && item.parent && item.type !== "move" && item.data.data.type === "active") {
					if (item.parent instanceof Actor) {
						const dataObjs = [{
							...JSON.parse(item.koFlags.dataJSON),
							"flags.kult4eoverrides.linkType": item.type,
							"flags.kult4eoverrides.linkName": item.name
						}];
						if (item.koFlags.altMove) {
							console.log(item.koFlags.altMove);
							try {
								JSON.parse(item.koFlags.altMove).forEach((moveJSON) => {
									dataObjs.push(JSON.parse(moveJSON));
								});
							} catch (err) {
								KO.error("altMove Stringify Error", item.koFlags.altMove);
							}
						}
						item.parent.createEmbeddedDocuments("Item", dataObjs);
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