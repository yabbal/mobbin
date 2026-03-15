import { defineCommand } from "citty";
import { getClient } from "../client.js";
import { outputTable } from "../output.js";

const listCommand = defineCommand({
	meta: {
		name: "list",
		description: "List all available filter categories and values",
	},
	args: {
		category: {
			type: "string",
			description:
				"Filter category slug (e.g. screenPatterns, screenElements, appCategories, flowActions)",
			alias: "c",
		},
		table: {
			type: "boolean",
			description: "Output as table",
			alias: "t",
		},
	},
	run: async ({ args }) => {
		const client = await getClient();
		const categories = await client.filters.list();

		if (args.category) {
			const cat = categories.find((c) => c.slug === args.category);
			if (!cat) {
				console.error(
					`Category "${args.category}" not found. Available: ${categories.map((c) => c.slug).join(", ")}`,
				);
				process.exit(1);
			}

			if (args.table) {
				const rows: string[][] = [];
				for (const sub of cat.subCategories) {
					for (const entry of sub.entries) {
						rows.push([entry.displayName, sub.displayName, entry.definition?.slice(0, 60) ?? ""]);
					}
				}
				outputTable(["Name", "Sub-category", "Definition"], rows);
				return;
			}

			console.log(JSON.stringify(cat, null, 2));
			return;
		}

		if (args.table) {
			outputTable(
				["Slug", "Display Name", "Experience", "Entries"],
				categories.map((c) => [
					c.slug,
					c.displayName,
					c.experience,
					String(c.subCategories.reduce((acc, s) => acc + s.entries.length, 0)),
				]),
			);
			return;
		}

		console.log(JSON.stringify(categories, null, 2));
	},
});

export const filtersCommand = defineCommand({
	meta: {
		name: "filters",
		description: "Browse available filter categories",
	},
	subCommands: {
		list: listCommand,
	},
});
