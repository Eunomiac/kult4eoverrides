const registerSystemSettings = function() {
	game.settings.register("kult4eoverrides", "debug", {
		"name": "Enable Overrides Debug",
		"hint": "Enable debugging of the kult4eoverrides module.",
		"scope": "world",
		"config": true,
		"default": false,
		"type": Boolean,
		"onChange": () => window.location.reload()
	});
};

export default registerSystemSettings;

export const TEMPLATES = {
	pc: "modules/kult4eoverrides/templates/sheets/pc-sheet.hbs",
	npc: "modules/kult4eoverrides/templates/sheets/npc-sheet.hbs",
	advantage: "modules/kult4eoverrides/templates/sheets/advantage-sheet.hbs",
	advantageCard: "modules/kult4eoverrides/templates/partials/advantage-card.hbs",
	disadvantage: "modules/kult4eoverrides/templates/sheets/disadvantage-sheet.hbs",
	disadvantageCard: "modules/kult4eoverrides/templates/partials/disadvantage-card.hbs",
	darksecret: "modules/kult4eoverrides/templates/sheets/darksecret-sheet.hbs",
	darksecretCard: "modules/kult4eoverrides/templates/partials/darksecret-card.hbs",
	gear: "modules/kult4eoverrides/templates/sheets/gear-sheet.hbs",
	gearCard: "modules/kult4eoverrides/templates/partials/gear-card.hbs",
	move: "modules/kult4eoverrides/templates/sheets/move-sheet.hbs",
	moveCard: "modules/kult4eoverrides/templates/partials/move-card.hbs",
	relationship: "modules/kult4eoverrides/templates/sheets/relationship-sheet.hbs",
	relationshipCard: "modules/kult4eoverrides/templates/partials/relationship-card.hbs",
	weapon: "modules/kult4eoverrides/templates/sheets/weapon-sheet.hbs",
	weaponCard: "modules/kult4eoverrides/templates/partials/weapon-card.hbs",
	card: "modules/kult4eoverrides/templates/partials/card.hbs",
	advancementBoxes: "modules/kult4eoverrides/templates/partials/advancement-line-boxes.hbs",
	advancementLabel: "modules/kult4eoverrides/templates/partials/advancement-line-label.hbs",
	advancementHeader: "modules/kult4eoverrides/templates/partials/advancement-line-header.hbs",
	advancementPurchase: "modules/kult4eoverrides/templates/partials/advancement-purchase.hbs",

};