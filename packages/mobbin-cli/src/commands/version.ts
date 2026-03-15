import { defineCommand } from "citty";

declare const __VERSION__: string;

export const versionCommand = defineCommand({
	meta: {
		name: "version",
		description: "Show CLI version",
	},
	run: () => {
		console.log(typeof __VERSION__ !== "undefined" ? __VERSION__ : "0.0.0");
	},
});
