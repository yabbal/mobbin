import { defineCommand } from "citty";
import type { Platform, SortBy } from "mobbin-sdk";
import { getClient } from "../client.js";
import { outputTable } from "../output.js";

const searchCommand = defineCommand({
	meta: {
		name: "search",
		description: "Search apps",
	},
	args: {
		platform: {
			type: "string",
			description: "Platform: ios, android, web",
			default: "ios",
			alias: "p",
		},
		categories: {
			type: "string",
			description: "App categories (comma-separated)",
			alias: "c",
		},
		sort: {
			type: "string",
			description: "Sort by: trending, publishedAt, popularity",
			default: "trending",
			alias: "s",
		},
		limit: {
			type: "string",
			description: "Number of results",
			default: "20",
			alias: "l",
		},
		table: {
			type: "boolean",
			description: "Output as table",
			alias: "t",
		},
	},
	run: async ({ args }) => {
		const client = await getClient();

		const result = await client.apps.search(
			{
				platform: args.platform as Platform,
				appCategories: args.categories ? args.categories.split(",") : null,
			},
			{
				pageSize: Number.parseInt(args.limit, 10),
				sortBy: args.sort as SortBy,
			},
		);

		if (args.table) {
			outputTable(
				["Name", "Platform", "Tagline"],
				result.data.map((a) => [a.appName, a.platform, a.appTagline?.slice(0, 50) ?? ""]),
			);
			return;
		}

		console.log(JSON.stringify(result, null, 2));
	},
});

const listCommand = defineCommand({
	meta: {
		name: "list",
		description: "List all searchable apps for a platform",
	},
	args: {
		platform: {
			type: "string",
			description: "Platform: ios, android, web",
			default: "ios",
			alias: "p",
		},
		table: {
			type: "boolean",
			description: "Output as table",
			alias: "t",
		},
	},
	run: async ({ args }) => {
		const client = await getClient();
		const apps = await client.apps.list(args.platform as Platform);

		if (args.table) {
			outputTable(
				["Name", "Platform", "Tagline"],
				apps.slice(0, 50).map((a) => [a.appName, a.platform, a.appTagline?.slice(0, 50) ?? ""]),
			);
			return;
		}

		console.log(JSON.stringify(apps, null, 2));
	},
});

const popularCommand = defineCommand({
	meta: {
		name: "popular",
		description: "Get popular apps",
	},
	args: {
		platform: {
			type: "string",
			description: "Platform: ios, android, web",
			default: "ios",
			alias: "p",
		},
		limit: {
			type: "string",
			description: "Limit per category",
			default: "10",
			alias: "l",
		},
		table: {
			type: "boolean",
			description: "Output as table",
			alias: "t",
		},
	},
	run: async ({ args }) => {
		const client = await getClient();
		const apps = await client.apps.popular(
			args.platform as Platform,
			Number.parseInt(args.limit, 10),
		);

		if (args.table) {
			outputTable(
				["Name", "Category", "Popularity"],
				apps.map((a) => [a.app_name, a.app_category, String(a.popularity_metric)]),
			);
			return;
		}

		console.log(JSON.stringify(apps, null, 2));
	},
});

export const appsCommand = defineCommand({
	meta: {
		name: "apps",
		description: "Search and browse apps",
	},
	subCommands: {
		search: searchCommand,
		list: listCommand,
		popular: popularCommand,
	},
});
