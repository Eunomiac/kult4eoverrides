import U from "../../scripts/utilities.mjs";
import {TEMPLATES} from "../system/settings.mjs";

export default class kult4eOverridesItem extends Item {
	get template() { return TEMPLATES[this.type] }

	get koFlags() { return this.data.flags.kult4eoverrides ?? {} }
}