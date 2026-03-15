import type {
	FetchScreensResponse,
	PaginationOptions,
	Screen,
	ScreenFilterOptions,
} from "../types.js";
import { Resource } from "./base.js";

export class ScreensResource extends Resource {
	/**
	 * Search/fetch screens with filters
	 */
	search = async (
		filterOptions: ScreenFilterOptions,
		paginationOptions: Partial<PaginationOptions> = {},
	): Promise<{ data: Screen[]; searchRequestId: string }> => {
		const pagination: PaginationOptions = {
			pageSize: paginationOptions.pageSize ?? 24,
			sortBy: paginationOptions.sortBy ?? "trending",
			...paginationOptions,
		};

		const res = await this.fetch.request<FetchScreensResponse>("/api/content/fetch-screens", {
			method: "POST",
			body: JSON.stringify({
				searchRequestId: "",
				filterOptions: {
					platform: filterOptions.platform,
					screenPatterns: filterOptions.screenPatterns ?? null,
					screenElements: filterOptions.screenElements ?? null,
					screenKeywords: filterOptions.screenKeywords ?? null,
					appCategories: filterOptions.appCategories ?? null,
					hasAnimation: filterOptions.hasAnimation ?? null,
				},
				paginationOptions: pagination,
			}),
		});

		return res.value;
	};

	/**
	 * Download a screen image as a Buffer using the CDN src URL
	 */
	download = async (cdnSrc: string): Promise<ArrayBuffer> => {
		const response = await fetch(cdnSrc);
		if (!response.ok) {
			throw new Error(`Failed to download screen: ${response.status} ${response.statusText}`);
		}
		return response.arrayBuffer();
	};
}
