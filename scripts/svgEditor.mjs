// #region ▮▮▮▮▮▮▮ IMPORTS ▮▮▮▮▮▮▮ ~
import * as fs from "fs";
import * as path from "path";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮

// #region ████████ CONFIGURATION ████████ ~
const JSONPATH = path.resolve("./assets/icons");
// #endregion ▄▄▄▄▄ CONFIGURATION ▄▄▄▄▄

const PATTERNS = [
	[
		/<path\s(d="[^"]+").*?>[\n\s]*<\/path>/,
		"<path $1\n fill=\"url(#bg-gradient)\" fill-opacity=\"1\" stroke=\"url(#stroke-gradient)\" stroke-opacity=\"1\" stroke-width=\"10\" @PATH-PARAMS@>[\n\s]*</path>"
	],
	[
		/<g\s/,
		`
			<defs>
				@CLIP-PATH@
				<linearGradient id="bg-gradient" x1="0" x2="1" y1="1" y2="0">@BG-GRADIENT@</linearGradient>
				<linearGradient id="stroke-gradient" x1="0" x2="1" y1="1" y2="0">@STROKE-GRADIENT@</linearGradient>
			</defs>
			<g
		`
	]
];
const COLORSTOPS = {
	advantage: {
		"bg-gradient": `
			<stop offset="50%" stop-color="rgb(255, 243, 181)" stop-opacity="1"></stop>
			<stop offset="100%" stop-color="rgb(255, 255, 255)" stop-opacity="1"></stop>
		`,
		"stroke-gradient": `
			<stop offset="50%" stop-color="rgb(141, 118, 42)" stop-opacity="1"></stop>
			<stop offset="100%" stop-color="rgb(255, 243, 181)" stop-opacity="1"></stop>
		`
	},
	disadvantage: {
		"bg-gradient": `
			<stop offset="0%" stop-color="rgb(255, 0, 0)" stop-opacity="1"></stop>
			<stop offset="50%" stop-color="rgb(109, 22, 22)" stop-opacity="1"></stop>
		`,
		"stroke-gradient": `
			<stop offset="50%" stop-color="rgb(141, 118, 42)" stop-opacity="1"></stop>
			<stop offset="100%" stop-color="rgb(255, 243, 181)" stop-opacity="1"></stop>
		`
	},
	weapon: {
		"clip-path": `
			<clipPath id="icon-bg">
				<polygon points="376,463.85,136,463.85,16,256,136,48.15,376,48.15,496,256" fill="rgb(100,0,0)" fill-opacity="1" stroke="#ff0000" stroke-opacity="1" stroke-width="16" transform="translate(-25.6, -25.6) scale(1.1, 1.1) rotate(0, 256, 256) skewX(0) skewY(0)">
				</polygon>
			</clipPath>
		`,
		"path-params": "clip-path=\"url(#icon-bg)\" transform=\"translate(-25.6, -25.6) scale(1.1, 1.1) rotate(0, 256, 256) skewX(0) skewY(0)\"",
		"bg-gradient": `
			<stop offset="40%" stop-color="rgb(200, 0, 0)" stop-opacity="1"></stop>
			<stop offset="100%" stop-color="rgb(109, 22, 22)" stop-opacity="1"></stop>
		`,
		"stroke-gradient": `
			<stop offset="50%" stop-color="rgb(255, 0, 0)" stop-opacity="1"></stop>
			<stop offset="100%" stop-color="rgb(255, 0, 0)" stop-opacity="1"></stop>
		`
	}
};

// #region ████████ PROCESSING IMPORT: Processing the Imported JSON from Scryfall ████████ ~

const BACKUP_SVG_DIR = async (svgDir) => await new Promise((resolve, reject) => {
	fs.mkdir(path.resolve(JSONPATH, svgDir, "BACKUPS"), {recursive: true}, (err) => {
		if (!err) {
			fs.readdir(path.resolve(JSONPATH, svgDir), "utf8", (err, files) => {
				Promise.all(
					files.map((fileName) => new Promise((subResolve, subReject) =>
						fs.copyFile(
							path.resolve(JSONPATH, svgDir, fileName),
							path.resolve(JSONPATH, svgDir, "BACKUPS", fileName),
							subResolve
						)))).then(resolve);
				});
			} else {
				reject(err.message);
			}
		})
	});

const CONVERT_SVG_DIR = async (svgDir) => await new Promise((resolve, reject) => {
	fs.readdir(path.resolve(JSONPATH, svgDir, "BACKUPS"), "utf8", (err, files) => {
		CONVERT_SVG_FILES(svgDir, files).then(resolve);
	});
});

const CONVERT_SVG_FILES = async (svgDir, svgFileNames = []) => Promise.all(svgFileNames
	.map((svgFileName) => new Promise((resolve, reject) => {
		if (!/\.svg$/.test(svgFileName)) {
			console.log(`Skipping ${svgFileName}...`);
			resolve();
			return;
		}
		fs.readFile(path.resolve(JSONPATH, svgDir, "BACKUPS", svgFileName), "utf8", (err, data) => {
			if (err) { throw new Error(`Error thrown for fileName ${svgFileName}: ${err.message}`) }
			if (!data) { throw new Error(`No Data for fileName ${svgFileName}`)}
			let newData = data.replace(/[\n\t\s]+/g, " ").replace(/\s+/g, " ").trim();
			PATTERNS.forEach(([pattern, replace]) => newData = newData.replace(pattern, replace));
			newData = newData
				.replace(/@BG-GRADIENT@/g, COLORSTOPS[svgDir]["bg-gradient"] ?? "")
				.replace(/@STROKE-GRADIENT@/g, COLORSTOPS[svgDir]["stroke-gradient"] ?? "")
				.replace(/@CLIP-PATH@/g, COLORSTOPS[svgDir]["clip-path"] ?? "")
				.replace(/@PATH-PARAMS@/g, COLORSTOPS[svgDir]["path-params"] ?? "")

			fs.writeFile(path.resolve(JSONPATH, svgDir, svgFileName/* .replace(/(\.svg)+/g, "_CONV.svg") */), newData, (err) => err ? reject() : resolve());
		});
	})));
// #endregion ▄▄▄▄▄ PROCESSING IMPORT ▄▄▄▄▄

// CONVERT_SVG_FILES("advantage", ["authority"]);
const SVG_DIRS = ["advantage", "disadvantage", "weapon"];
const ISBACKINGUP = false;

(async () => {
	if (ISBACKINGUP) {
		console.log("Starting Backup");
		await Promise.all(SVG_DIRS.map(BACKUP_SVG_DIR));
		console.log("Backup Complete!");
	}
	await Promise.all(SVG_DIRS.map(CONVERT_SVG_DIR));
	console.log("Conversion Complete!");
})();
// CONVERT_SVG_DIR("advantage", "disadvantage", "weapon");
// BACKUP_SVG_DIR("advantage");


/* SVG CONVERSION

	/(<path\s(d="[^"]+").*?><\/path>)/
			-> "<path $2 $1\n<path fill=\"transparent\" fill-opacity=\"0\" stroke=\"url(#gold-gradient)\" stroke-opacity=\"1\" stroke-width=\"44\"></path>\n<path $2 fill=\"url(#red-gradient)\"></path>"

	/<g\s/
			-> `
				<defs>
					<linearGradient id="red-gradient" x1="0" x2="1" y1="1" y2="0">
						<stop offset="0%" stop-color="#ff0000" stop-opacity="1"></stop>
						<stop offset="50%" stop-color="rgb(109, 22, 22)" stop-opacity="1"></stop>
					</linearGradient>
					<linearGradient id="gold-gradient" x1="0" x2="1" y1="1" y2="0">
						<stop offset="50%" stop-color="rgb(141, 118, 42)" stop-opacity="1"></stop>
						<stop offset="100%" stop-color="rgb(255, 243, 181)" stop-opacity="1"></stop>
					</linearGradient>
				</defs>
			`



*/