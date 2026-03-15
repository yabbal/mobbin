import type { DictionaryCategory, DictionaryResponse } from "../types.js";
import { Resource } from "./base.js";

export class FiltersResource extends Resource {
	/**
	 * Fetch all filter categories and their entries
	 */
	list = async (): Promise<DictionaryCategory[]> => {
		const res = await this.fetch.request<DictionaryResponse>(
			"/api/filter-tags/fetch-dictionary-definitions",
			{
				method: "POST",
			},
		);
		return res.value;
	};
}
