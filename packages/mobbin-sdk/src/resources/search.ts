import type {
	Platform,
	SearchableSite,
	SearchableSitesResponse,
	TrendingApp,
	TrendingAppsResponse,
	TrendingFilterTag,
	TrendingFilterTagsResponse,
} from "../types.js";
import { Resource } from "./base.js";

export class SearchResource extends Resource {
	/**
	 * Get trending apps
	 */
	trendingApps = async (platform: Platform = "ios"): Promise<TrendingApp[]> => {
		const res = await this.fetch.request<TrendingAppsResponse>(
			"/api/search-bar/fetch-trending-apps",
			{
				method: "POST",
				body: JSON.stringify({ platform }),
			},
		);
		return res.value;
	};

	/**
	 * Get trending filter tags
	 */
	trendingFilterTags = async (
		platform: Platform = "ios",
		experience: "apps" | "sites" = "apps",
	): Promise<TrendingFilterTag[]> => {
		const res = await this.fetch.request<TrendingFilterTagsResponse>(
			"/api/search-bar/fetch-trending-filter-tags",
			{
				method: "POST",
				body: JSON.stringify({ experience, platform }),
			},
		);
		return res.value;
	};

	/**
	 * Get trending text-in-screenshot keywords
	 */
	trendingKeywords = async (
		platform: Platform = "ios",
	): Promise<{ platformType: string; keyword: string; order: number }[]> => {
		const res = await this.fetch.request<{
			value: { platformType: string; keyword: string; order: number }[];
		}>("/api/search-bar/fetch-trending-text-in-screenshot-keywords", {
			method: "POST",
			body: JSON.stringify({ platform }),
		});
		return res.value;
	};

	/**
	 * Get searchable sites
	 */
	searchableSites = async (): Promise<SearchableSite[]> => {
		const res = await this.fetch.request<SearchableSitesResponse>(
			"/api/search-bar/fetch-searchable-sites",
			{
				method: "POST",
			},
		);
		return res.value;
	};

	/**
	 * Get recent searches
	 */
	recentSearches = async (): Promise<{
		apps: { ios: unknown[]; web: unknown[] };
		sites: unknown[];
	}> => {
		return this.fetch.request("/api/recent-searches", { method: "GET" });
	};
}
