export type Platform = "ios" | "android" | "web";

export type SortBy = "trending" | "publishedAt" | "popularity";

export type ContentType = "apps" | "screens" | "flows";

export interface PaginationOptions {
	pageSize: number;
	sortBy: SortBy;
	cursor?: string;
}

export interface ScreenFilterOptions {
	platform: Platform;
	screenPatterns?: string[] | null;
	screenElements?: string[] | null;
	screenKeywords?: string | null;
	appCategories?: string[] | null;
	hasAnimation?: boolean | null;
}

export interface AppFilterOptions {
	platform: Platform;
	appCategories?: string[] | null;
}

export interface ScreenCdnImgSource {
	src: string;
	srcSet: string;
	downloadableSrc: string;
}

export interface ScreenMetadata {
	width: number;
	height: number;
}

export interface Screen {
	id: string;
	screenUrl: string;
	screenNumber: number;
	screenPatterns: string[];
	screenElements: string[];
	screenKeywords: string[];
	appVersionId: string;
	appId: string;
	appName: string;
	appCategory: string;
	appLogoUrl: string;
	platform: Platform;
	popularityMetric: number;
	trendingMetric: number;
	metadata: ScreenMetadata;
	screenCdnImgSources: ScreenCdnImgSource;
}

export interface App {
	id: string;
	appName: string;
	appCategory: string;
	appLogoUrl: string;
	appTagline: string;
	platform: Platform;
	keywords: string[];
	createdAt: string;
	appVersionId: string;
	appVersionPublishedAt: string;
	previewScreens: string[];
	previewVideoUrl: string | null;
	allAppCategories: string[];
	popularityMetric: number;
	trendingMetric: number;
	isRestricted: boolean;
}

export interface PopularApp {
	app_id: string;
	app_name: string;
	app_logo_url: string;
	preview_screens: string[];
	app_category: string;
	popularity_metric: number;
}

export interface SearchableApp {
	id: string;
	platform: Platform;
	appName: string;
	appLogoUrl: string;
	appTagline: string;
	keywords: string[];
	previewScreens: string[];
}

export interface TrendingApp {
	id: string;
	platform: Platform;
	appName: string;
	appLogoUrl: string;
	trending_metric: number;
}

export interface DictionaryEntry {
	id: string;
	displayName: string;
	definition: string;
	synonyms: string[];
	subCategory: string;
	exampleScreens: string[];
	contentCounts?: Record<string, number>;
}

export interface DictionaryCategory {
	slug: string;
	displayName: string;
	experience: "web" | "mobile";
	subCategories: {
		displayName: string;
		entries: DictionaryEntry[];
	}[];
}

export interface TrendingFilterTag {
	imageUrl: string;
	cardType: string;
	order: number;
	dictionaryEntry: DictionaryEntry;
}

export interface SearchableSite {
	id: string;
	name: string;
	logo_url: string;
	tagline: string;
	keywords: string[];
}

export interface Collection {
	id: string;
	name: string;
	[key: string]: unknown;
}

export interface SupabaseSession {
	access_token: string;
	refresh_token: string;
	expires_at: number;
	expires_in: number;
	user: {
		id: string;
		email: string;
		[key: string]: unknown;
	};
}

export interface FetchScreensResponse {
	value: {
		searchRequestId: string;
		data: Screen[];
	};
}

export interface SearchAppsResponse {
	value: {
		searchRequestId: string;
		data: App[];
	};
}

export interface PopularAppsResponse {
	value: PopularApp[];
}

export interface DictionaryResponse {
	value: DictionaryCategory[];
}

export interface TrendingAppsResponse {
	value: TrendingApp[];
}

export interface TrendingFilterTagsResponse {
	value: TrendingFilterTag[];
}

export interface SearchableSitesResponse {
	value: SearchableSite[];
}

export interface CollectionsResponse {
	value: Collection[];
}

export interface SavedContentsResponse {
	value: unknown[];
}
