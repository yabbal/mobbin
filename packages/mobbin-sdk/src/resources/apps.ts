import type {
	AppFilterOptions,
	PaginationOptions,
	Platform,
	PopularApp,
	PopularAppsResponse,
	SearchableApp,
} from "../types.js";
import { Resource } from "./base.js";

export class AppsResource extends Resource {
	/**
	 * Search apps by filtering the full catalog
	 */
	search = async (
		filterOptions: AppFilterOptions,
		paginationOptions: Partial<PaginationOptions> = {},
	): Promise<{ data: SearchableApp[] }> => {
		const allApps = await this.list(filterOptions.platform);
		let filtered = allApps;

		if (filterOptions.appCategories?.length) {
			// Filter by category using the popular apps endpoint which has categories
			const popular = await this.popular(filterOptions.platform);
			const categoryAppIds = new Set(
				popular
					.filter((a) => filterOptions.appCategories?.includes(a.app_category))
					.map((a) => a.app_id),
			);
			filtered = allApps.filter((a) => categoryAppIds.has(a.id));
		}

		const limit = paginationOptions.pageSize ?? 20;
		return { data: filtered.slice(0, limit) };
	};

	/**
	 * Get popular apps with preview screens
	 */
	popular = async (platform: Platform = "ios", limitPerCategory = 10): Promise<PopularApp[]> => {
		const res = await this.fetch.request<PopularAppsResponse>(
			"/api/popular-apps/fetch-popular-apps-with-preview-screens",
			{
				method: "POST",
				body: JSON.stringify({ platform, limitPerCategory }),
			},
		);
		return res.value;
	};

	/**
	 * Get searchable apps list (full catalog for a platform)
	 */
	list = async (platform: Platform = "ios"): Promise<SearchableApp[]> => {
		return this.fetch.request<SearchableApp[]>(`/api/searchable-apps/${platform}`, {
			method: "GET",
		});
	};
}
