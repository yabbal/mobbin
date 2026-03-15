import { defineCommand, runMain } from "citty";
import { appsCommand } from "./commands/apps.js";
import { authCommand } from "./commands/auth.js";
import { collectionsCommand } from "./commands/collections.js";
import { filtersCommand } from "./commands/filters.js";
import { screensCommand } from "./commands/screens.js";
import { versionCommand } from "./commands/version.js";

declare const __VERSION__: string;

const main = defineCommand({
	meta: {
		name: "mobbin",
		version: typeof __VERSION__ !== "undefined" ? __VERSION__ : "0.0.0",
		description: "CLI for Mobbin - browse and download design references",
	},
	subCommands: {
		auth: authCommand,
		screens: screensCommand,
		apps: appsCommand,
		filters: filtersCommand,
		collections: collectionsCommand,
		version: versionCommand,
	},
});

runMain(main);
