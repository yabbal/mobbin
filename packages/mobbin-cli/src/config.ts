import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { SupabaseSession } from "mobbin-sdk";

const CONFIG_DIR = join(homedir(), ".config", "mobbin");
const AUTH_FILE = join(CONFIG_DIR, "auth.json");

const ensureConfigDir = () => {
	if (!existsSync(CONFIG_DIR)) {
		mkdirSync(CONFIG_DIR, { recursive: true });
	}
};

export const saveSession = (session: SupabaseSession): void => {
	ensureConfigDir();
	writeFileSync(AUTH_FILE, JSON.stringify(session, null, 2), { mode: 0o600 });
};

export const loadSession = (): SupabaseSession | null => {
	if (!existsSync(AUTH_FILE)) return null;
	try {
		const data = readFileSync(AUTH_FILE, "utf-8");
		return JSON.parse(data) as SupabaseSession;
	} catch {
		return null;
	}
};

export const clearSession = (): void => {
	if (existsSync(AUTH_FILE)) {
		unlinkSync(AUTH_FILE);
	}
};

export const isSessionExpired = (session: SupabaseSession): boolean => {
	// expires_at is in seconds
	return Date.now() / 1000 >= session.expires_at;
};
