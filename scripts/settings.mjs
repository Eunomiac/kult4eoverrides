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