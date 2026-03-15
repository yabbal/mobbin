import { createFetch } from "./fetch.js";
import { AppsResource } from "./resources/apps.js";
import { AuthResource } from "./resources/auth.js";
import { CollectionsResource } from "./resources/collections.js";
import { FiltersResource } from "./resources/filters.js";
import { ScreensResource } from "./resources/screens.js";
import { SearchResource } from "./resources/search.js";
import type { SupabaseSession } from "./types.js";

export interface MobbinClientOptions {
	/** Provide an access token directly */
	accessToken?: string;
	/** Provide email + password for auto-login */
	credentials?: {
		email: string;
		password: string;
	};
	/** Provide a full session (from stored auth) */
	session?: SupabaseSession;
}

export class MobbinClient {
	private _accessToken?: string;
	private _session?: SupabaseSession;
	private _fetch: ReturnType<typeof createFetch>;

	private _auth?: AuthResource;
	private _screens?: ScreensResource;
	private _apps?: AppsResource;
	private _search?: SearchResource;
	private _filters?: FiltersResource;
	private _collections?: CollectionsResource;

	constructor(private readonly options: MobbinClientOptions = {}) {
		this._accessToken = options.accessToken;
		this._session = options.session;

		this._fetch = createFetch({
			getAccessToken: () => this._accessToken,
			getSession: () => this._session as unknown as Record<string, unknown> | undefined,
		});
	}

	/**
	 * Initialize the client — login if credentials provided
	 */
	async init(): Promise<void> {
		if (this._accessToken) return;

		if (this._session) {
			this._accessToken = this._session.access_token;
			return;
		}

		if (this.options.credentials) {
			const session = await this.auth.login(
				this.options.credentials.email,
				this.options.credentials.password,
			);
			this._session = session;
			this._accessToken = session.access_token;
			return;
		}
	}

	get session(): SupabaseSession | undefined {
		return this._session;
	}

	set session(session: SupabaseSession) {
		this._session = session;
		this._accessToken = session.access_token;
	}

	get accessToken(): string | undefined {
		return this._accessToken;
	}

	set accessToken(token: string) {
		this._accessToken = token;
	}

	get auth(): AuthResource {
		if (!this._auth) this._auth = new AuthResource(this._fetch);
		return this._auth;
	}

	get screens(): ScreensResource {
		if (!this._screens) this._screens = new ScreensResource(this._fetch);
		return this._screens;
	}

	get apps(): AppsResource {
		if (!this._apps) this._apps = new AppsResource(this._fetch);
		return this._apps;
	}

	get search(): SearchResource {
		if (!this._search) this._search = new SearchResource(this._fetch);
		return this._search;
	}

	get filters(): FiltersResource {
		if (!this._filters) this._filters = new FiltersResource(this._fetch);
		return this._filters;
	}

	get collections(): CollectionsResource {
		if (!this._collections) this._collections = new CollectionsResource(this._fetch);
		return this._collections;
	}
}
