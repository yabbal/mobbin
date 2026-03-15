import type { createFetch } from "../fetch.js";

export abstract class Resource {
	constructor(protected readonly fetch: ReturnType<typeof createFetch>) {}
}
