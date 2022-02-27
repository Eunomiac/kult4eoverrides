import kult4eActor from "../../../../systems/kult4e/modules/sheets/kult4eActor.js";
import {attributeAsk} from "../../../../systems/kult4e/scripts/attributeAsk.js";
import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";

export default class kult4eOverridesActor extends kult4eActor {
	// get template() { return TEMPLATES.pc }

	get koFlags() { return this.data.flags.kult4eoverrides ?? {} }

	async makeroll(moveName, mods, {success, partial, failure}) {
		moveName = U.capitalize(moveName);
		const rollString = [
			"2d10",
			...mods.map((mod) => parseInt(mod))
		].join(" + ");
		KO.log("Roll String => ", rollString);
		const r = new Roll(rollString);
		await r.roll({async: true});
		KO.log("Roll => ", r);

		if (game.dice3d) {
			await game.dice3d.showForRoll(r);
		}

		if (r.total) {
			KO.log("Roll Successful");
			this.update({"data.sitmod": 0});
			KO.log(`Sitmod is ${this.data.data.sitmod}`);
		}

		if (r.total >= 15) {
			this.displayRollResult({roll: r, moveName, resultText: game.i18n.localize("kult4e.Success"), moveResultText: success});
		} else if (r.total < 10) {
			this.displayRollResult({roll: r, moveName, resultText: game.i18n.localize("kult4e.Failure"), moveResultText: failure});
		} else {
			this.displayRollResult({roll: r, moveName, resultText: game.i18n.localize("kult4e.PartialSuccess"), moveResultText: partial});
		}
	}

	async attrroll(attrName) {
		const actorData = this.data;
		const attrMod = actorData.data.attributes[attrName];
		KO.log("Attribute Mod => ", attrMod);
		let sitMod = parseInt(actorData.data.sitmod) + parseInt(actorData.data.forward);
		KO.log("Situation Mod => ", sitMod);
		const woundMod = await this.woundEffect();
		sitMod -= woundMod;
		KO.log("Situation Mod (After Wound) => ", sitMod);
		if (actorData.data.attributes.criticalwound && actorData.data.attributes.criticalwoundstabilized !== "true") {
			sitMod--;
			KO.log("Situation Mod (After Crit) => ", sitMod);
		}
		this.makeroll(attrName, [attrMod, sitMod], {
			success: "",
			partial: "",
			failure: ""
		});
	}

	async moveroll(moveID) {
		const actordata = this.data;
		KO.log("Actor Data => ", actordata);

		if (["fortitude", "willpower", "reflexes", "reason", "intuition", "perception", "coolness", "violence", "charisma", "soul"].includes((moveID ?? "").toLowerCase())) {
			return this.attrroll(moveID);
		} else {
			const move = actordata.items.get(moveID);
			KO.log("Move => ", move);

			const moveData = move.data.data;
			KO.log("Move Data => ", moveData);
			const moveType = moveData.type;
			const moveName = move.name;
			KO.log("Move Type => ", moveType);

			if (moveType === "passive") {
				ui.notifications.warn(game.i18n.localize("kult4e.PassiveAbility"));
				return false;
			} else {
				const attr = moveData.attributemod === "ask" ? await attributeAsk() : moveData.attributemod;
				const resultText = {
					success: moveData.completesuccess,
					failure: moveData.failure,
					partial: moveData.partialsuccess
				};
				const {specialflag} = moveData;
				let mod = 0,
								harm = 0;
				if (specialflag === 3) { // Endure Injury
					const boxoutput = await new Promise((resolve) => {
						new Dialog({
							"title": game.i18n.localize("kult4e.EndureInjury"),
							"content": `<div class="endure-harm-dialog"><label>${game.i18n.localize("kult4e.EndureInjuryDialog")}</label><input id="harm_value" data-type="number" type="number"></div>`,
							"default": "one",
							"buttons": {
								one: {
									label: "Ok",
									callback: () => {
										resolve({harm_value: document.getElementById("harm_value").value});
									}
								}
							}
						}).render(true);
					});
					harm = -1 * parseInt(boxoutput.harm_value);
				}

				if (attr !== "" && attr !== "none") {
					mod = actordata.data.attributes[attr];
				}

				const stab = actordata.data.stability.value;
				let situation = parseInt(actordata.data.sitmod) + parseInt(actordata.data.forward);
				KO.log("Sitmod => ", actordata.data.sitmod);

				const woundmod = await this.woundEffect();
				situation -= woundmod;

				if (actordata.data.attributes.criticalwound && actordata.data.attributes.criticalwoundstabilized !== "true") {
					situation -= 1;
				}
				if (specialflag === 1 && stab > 2) {
					situation -= 1;
				}
				if (moveType === "disadvantage" && stab > 0) {
					situation -= 1;
				}
				if (moveType === "disadvantage" && stab > 2) {
					situation -= 1;
				}
				if (specialflag === 1 && stab > 5) {
					situation -= 1;
				}
				if (moveType === "disadvantage" && stab > 5) {
					situation -= 1;
				}
				if (specialflag === 2 && stab > 5) {
					situation += 1;
				}

				KO.log("Attribute Mod => ", mod);
				KO.log("Situation Mod => ", situation);
				KO.log("Harm => ", harm);

				return this.makeroll(moveName, [mod, situation, harm], resultText);
			}
		}
	}
}