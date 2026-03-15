import { defineCommand } from "citty";
import { getClient } from "../client.js";

const listCommand = defineCommand({
	meta: {
		name: "list",
		description: "List your collections",
	},
	run: async () => {
		const client = await getClient();
		const collections = await client.collections.list();
		console.log(JSON.stringify(collections, null, 2));
	},
});

export const collectionsCommand = defineCommand({
	meta: {
		name: "collections",
		description: "Manage your collections",
	},
	subCommands: {
		list: listCommand,
	},
});
