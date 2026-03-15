import { execSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { platform } from "node:process";
import { defineCommand } from "citty";

const copyImageToClipboard = (filePath: string): void => {
	switch (platform) {
		case "darwin": {
			// Convert to PNG first (sips handles webp), then copy via osascript
			const pngPath = `${filePath}.png`;
			execSync(`sips -s format png "${filePath}" --out "${pngPath}" > /dev/null 2>&1`);
			execSync(
				`osascript -e 'set the clipboard to (read (POSIX file "${pngPath}") as «class PNGf»)'`,
			);
			execSync(`rm -f "${pngPath}"`);
			break;
		}
		case "linux":
			// xclip or xsel — xclip is more common for image clipboard
			try {
				execSync("which xclip > /dev/null 2>&1");
				execSync(`xclip -selection clipboard -t image/webp -i "${filePath}"`);
			} catch {
				try {
					execSync("which wl-copy > /dev/null 2>&1");
					execSync(`wl-copy < "${filePath}"`);
				} catch {
					throw new Error("Install xclip or wl-copy to use clipboard on Linux");
				}
			}
			break;
		case "win32":
			// PowerShell clip
			execSync(
				`powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile('${filePath}'))"`,
			);
			break;
		default:
			throw new Error(`Clipboard not supported on ${platform}`);
	}
};
import type { Platform, SortBy } from "mobbin-sdk";
import { getClient } from "../client.js";
import { outputTable } from "../output.js";

const searchCommand = defineCommand({
	meta: {
		name: "search",
		description: "Search screens by patterns, elements, keywords",
	},
	args: {
		platform: {
			type: "string",
			description: "Platform: ios, android, web",
			default: "ios",
			alias: "p",
		},
		patterns: {
			type: "string",
			description: "Screen patterns (comma-separated, e.g. Signup,Login)",
		},
		elements: {
			type: "string",
			description: "UI elements (comma-separated, e.g. Button,Card)",
		},
		keywords: {
			type: "string",
			description: "Text search in screenshots",
			alias: "k",
		},
		categories: {
			type: "string",
			description: "App categories (comma-separated, e.g. Finance,Shopping)",
			alias: "c",
		},
		animation: {
			type: "boolean",
			description: "Filter for animated screens only",
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
			default: "24",
			alias: "l",
		},
		table: {
			type: "boolean",
			description: "Output as table instead of JSON",
			alias: "t",
		},
	},
	run: async ({ args }) => {
		const client = await getClient();

		const result = await client.screens.search(
			{
				platform: args.platform as Platform,
				screenPatterns: args.patterns ? args.patterns.split(",") : null,
				screenElements: args.elements ? args.elements.split(",") : null,
				screenKeywords: args.keywords ?? null,
				appCategories: args.categories ? args.categories.split(",") : null,
				hasAnimation: args.animation ?? null,
			},
			{
				pageSize: Number.parseInt(args.limit, 10),
				sortBy: args.sort as SortBy,
			},
		);

		if (args.table) {
			outputTable(
				["App", "Pattern", "Elements", "URL"],
				result.data.map((s) => [
					s.appName,
					s.screenPatterns.join(", "),
					s.screenElements.slice(0, 3).join(", "),
					s.screenCdnImgSources?.src ?? s.screenUrl,
				]),
			);
			return;
		}

		console.log(JSON.stringify(result, null, 2));
	},
});

const downloadCommand = defineCommand({
	meta: {
		name: "download",
		description: "Download screen images",
	},
	args: {
		platform: {
			type: "string",
			description: "Platform: ios, android, web",
			default: "ios",
			alias: "p",
		},
		patterns: {
			type: "string",
			description: "Screen patterns (comma-separated)",
		},
		elements: {
			type: "string",
			description: "UI elements (comma-separated)",
		},
		keywords: {
			type: "string",
			description: "Text search in screenshots",
			alias: "k",
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
			description: "Number of screens to download",
			default: "5",
			alias: "l",
		},
		output: {
			type: "string",
			description: "Output directory",
			default: ".",
			alias: "o",
		},
	},
	run: async ({ args }) => {
		const client = await getClient();

		const result = await client.screens.search(
			{
				platform: args.platform as Platform,
				screenPatterns: args.patterns ? args.patterns.split(",") : null,
				screenElements: args.elements ? args.elements.split(",") : null,
				screenKeywords: args.keywords ?? null,
				appCategories: args.categories ? args.categories.split(",") : null,
			},
			{
				pageSize: Number.parseInt(args.limit, 10),
				sortBy: args.sort as SortBy,
			},
		);

		const downloaded: { file: string; app: string; patterns: string[] }[] = [];

		for (const screen of result.data) {
			const cdnSrc = screen.screenCdnImgSources?.src;
			if (!cdnSrc) continue;
			const buffer = await client.screens.download(cdnSrc);
			const safeName = screen.appName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
			const filename = `${safeName}_${screen.id.slice(0, 8)}.webp`;
			const filepath = join(args.output, filename);

			await writeFile(filepath, Buffer.from(buffer));
			downloaded.push({
				file: filepath,
				app: screen.appName,
				patterns: screen.screenPatterns,
			});
		}

		console.log(JSON.stringify({ downloaded }, null, 2));
	},
});

const copyCommand = defineCommand({
	meta: {
		name: "copy",
		description: "Copy a screen image to clipboard",
	},
	args: {
		platform: {
			type: "string",
			description: "Platform: ios, android, web",
			default: "ios",
			alias: "p",
		},
		patterns: {
			type: "string",
			description: "Screen patterns (comma-separated)",
		},
		elements: {
			type: "string",
			description: "UI elements (comma-separated)",
		},
		keywords: {
			type: "string",
			description: "Text search in screenshots",
			alias: "k",
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
		index: {
			type: "string",
			description: "Index of the screen to copy (0-based, from search results)",
			default: "0",
			alias: "i",
		},
	},
	run: async ({ args }) => {
		const client = await getClient();

		const idx = Number.parseInt(args.index, 10);
		const result = await client.screens.search(
			{
				platform: args.platform as Platform,
				screenPatterns: args.patterns ? args.patterns.split(",") : null,
				screenElements: args.elements ? args.elements.split(",") : null,
				screenKeywords: args.keywords ?? null,
				appCategories: args.categories ? args.categories.split(",") : null,
			},
			{
				pageSize: idx + 1,
				sortBy: args.sort as SortBy,
			},
		);

		const screen = result.data[idx];
		if (!screen) {
			console.error(`No screen found at index ${idx}`);
			process.exit(1);
		}

		const cdnSrc = screen.screenCdnImgSources?.src;
		if (!cdnSrc) {
			console.error("No CDN image available for this screen");
			process.exit(1);
		}

		const buffer = await client.screens.download(cdnSrc);
		const tmpFile = join(tmpdir(), `mobbin_${screen.id.slice(0, 8)}.png`);

		await writeFile(tmpFile, Buffer.from(buffer));
		copyImageToClipboard(tmpFile);
		execSync(`rm -f "${tmpFile}"`);

		console.log(
			JSON.stringify({
				copied: true,
				app: screen.appName,
				patterns: screen.screenPatterns,
				id: screen.id,
			}),
		);
	},
});

export const screensCommand = defineCommand({
	meta: {
		name: "screens",
		description: "Search and download screen designs",
	},
	subCommands: {
		search: searchCommand,
		download: downloadCommand,
		copy: copyCommand,
	},
});
