import Table from "cli-table3";

export type OutputFormat = "json" | "table";

export const getFormat = (args: { json?: boolean }): OutputFormat => {
	return args.json ? "json" : "json"; // Default to json for AI consumption
};

export const output = (data: unknown, format: OutputFormat = "json"): void => {
	if (format === "json") {
		console.log(JSON.stringify(data, null, 2));
		return;
	}

	// Table format handled by specific commands
	console.log(JSON.stringify(data, null, 2));
};

export const outputTable = (headers: string[], rows: string[][]): void => {
	const table = new Table({
		head: headers,
		style: { head: ["cyan"] },
	});
	for (const row of rows) {
		table.push(row);
	}
	console.log(table.toString());
};
