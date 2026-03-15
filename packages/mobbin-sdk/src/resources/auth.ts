import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../fetch.js";
import type { SupabaseSession } from "../types.js";
import { Resource } from "./base.js";

interface LoginByEmailResponse {
	value: { type: "password" | "magic_link" };
}

export class AuthResource extends Resource {
	/**
	 * Check the auth method for an email (password or magic link)
	 */
	checkEmail = async (email: string): Promise<"password" | "magic_link"> => {
		const res = await this.fetch.request<LoginByEmailResponse>("/api/auth/login-by-email-only", {
			method: "POST",
			body: JSON.stringify({ email, redirectTo: "/", isForgotPassword: false }),
		});
		return res.value.type;
	};

	/**
	 * Login with email and password via Supabase Auth directly
	 */
	login = async (email: string, password: string): Promise<SupabaseSession> => {
		const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				apikey: SUPABASE_ANON_KEY,
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const body = await response.text().catch(() => "");
			throw new Error(`Login failed (${response.status}): ${body}`);
		}

		return response.json() as Promise<SupabaseSession>;
	};

	/**
	 * Refresh the session using a refresh token
	 */
	refresh = async (refreshToken: string): Promise<SupabaseSession> => {
		const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				apikey: SUPABASE_ANON_KEY,
			},
			body: JSON.stringify({ refresh_token: refreshToken }),
		});

		if (!response.ok) {
			const body = await response.text().catch(() => "");
			throw new Error(`Token refresh failed (${response.status}): ${body}`);
		}

		return response.json() as Promise<SupabaseSession>;
	};

	/**
	 * Get current user info
	 */
	getUser = async () => {
		return this.fetch.request<{ id: string; email: string; [key: string]: unknown }>(
			`${SUPABASE_URL}/auth/v1/user`,
			{
				method: "GET",
				baseUrl: SUPABASE_URL,
			},
		);
	};
}
