const kultOverridesDebugger = (type, message, ...content) => {
	if (game.settings.get("kult4eoverrides", "debug")) {
		const styleLine = Object.entries({
			...STYLES.base,
			...STYLES[type] ?? {}
		}).map(([prop, val]) => `${prop}: ${val};`).join(" ");
		if (content.length) {
			console.group(`%c${message}`, styleLine);
			content.forEach((line) => console.dir(line));
			console.groupEnd();
		} else {
			console.log(`%c${message}`, styleLine);
		}
	}
};

const STYLES = {
	base: {
		"background": "#000000",
		"color": "#EDB620",
		"font-family": "Pragmata Pro",
		"padding": "0 25px"
	},
	display: {
		"color": "#EDB620",
		"font-family": "AlverataInformalW01-Regular",
		"font-size": "16px",
		"margin-left": "-100px",
		"padding": "0 100px"
	},
	error: {
		"color": "#FF0000",
		"background": "#950A0F",
		"font-weight": "bold"
	}
};

const KO = {
	display: (...content) => kultOverridesDebugger("display", ...content),
	log: (...content) => kultOverridesDebugger("base", ...content),
	error: (...content) => kultOverridesDebugger("error", ...content)
};

const registerDebugger = () => {
	window.KO = KO;
};

export default registerDebugger;