const BASE_URL = "https://mobbin.com";
const SUPABASE_URL = "https://ujasntkfphywizsdaapi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_LbI2-4spKrYx1xHKrI4YyQ_rC-csyUz";

export interface FetchOptions {
	getAccessToken: () => string | undefined;
	getSession: () => Record<string, unknown> | undefined;
}

const COOKIE_NAME = "sb-ujasntkfphywizsdaapi-auth-token";
const CHUNK_SIZE = 3180;

const buildSupabaseCookies = (session: Record<string, unknown>): string => {
	// Supabase SSR doesn't encode forward slashes in cookies
	const encoded = encodeURIComponent(JSON.stringify(session)).replaceAll("%2F", "/");
	const chunks: string[] = [];
	for (let i = 0; i < encoded.length; i += CHUNK_SIZE) {
		chunks.push(encoded.slice(i, i + CHUNK_SIZE));
	}
	return chunks.map((chunk, i) => `${COOKIE_NAME}.${i}=${chunk}`).join("; ");
};

export const createFetch = (options: FetchOptions) => {
	const request = async <T>(
		path: string,
		init?: RequestInit & { baseUrl?: string },
	): Promise<T> => {
		const baseUrl = init?.baseUrl ?? BASE_URL;
		const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

		const headers = new Headers(init?.headers);

		if (!headers.has("Content-Type") && init?.method !== "GET") {
			headers.set("Content-Type", "application/json");
		}

		const token = options.getAccessToken();
		if (token) {
			if (baseUrl === SUPABASE_URL) {
				headers.set("Authorization", `Bearer ${token}`);
				headers.set("apikey", SUPABASE_ANON_KEY);
				headers.set("x-client-info", "supabase-ssr/0.0.10");
			} else {
				// Mobbin API routes use Supabase session cookies for auth
				const session = options.getSession();
				if (session) {
					headers.set("Cookie", buildSupabaseCookies(session));
				}
			}
		}

		const response = await fetch(url, {
			...init,
			headers,
		});

		if (!response.ok) {
			const body = await response.text().catch(() => "");
			throw new MobbinApiError(response.status, response.statusText, body, url);
		}

		return response.json() as Promise<T>;
	};

	return { request };
};

export class MobbinApiError extends Error {
	constructor(
		public readonly status: number,
		public readonly statusText: string,
		public readonly body: string,
		public readonly url: string,
	) {
		super(`Mobbin API error ${status} ${statusText}: ${body} (${url})`);
		this.name = "MobbinApiError";
	}
}

export { SUPABASE_URL, SUPABASE_ANON_KEY, BASE_URL };
