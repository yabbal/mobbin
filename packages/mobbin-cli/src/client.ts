import { MobbinClient } from "mobbin-sdk";
import { isSessionExpired, loadSession, saveSession } from "./config.js";

export const getClient = async (): Promise<MobbinClient> => {
	const session = loadSession();

	if (!session) {
		console.error("Not logged in. Run `mobbin auth login` first.");
		process.exit(1);
	}

	const client = new MobbinClient({ session });

	if (isSessionExpired(session)) {
		try {
			const newSession = await client.auth.refresh(session.refresh_token);
			saveSession(newSession);
			client.session = newSession;
		} catch {
			console.error("Session expired. Run `mobbin auth login` to re-authenticate.");
			process.exit(1);
		}
	} else {
		await client.init();
	}

	return client;
};
