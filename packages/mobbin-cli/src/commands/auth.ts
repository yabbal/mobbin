import * as p from "@clack/prompts";
import { defineCommand } from "citty";
import { MobbinClient } from "mobbin-sdk";
import { clearSession, loadSession, saveSession } from "../config.js";

const loginCommand = defineCommand({
	meta: {
		name: "login",
		description: "Login to Mobbin",
	},
	args: {
		email: {
			type: "string",
			description: "Email address",
			alias: "e",
		},
		password: {
			type: "string",
			description: "Password",
			alias: "p",
		},
	},
	run: async ({ args }) => {
		let email = args.email || process.env.MOBBIN_EMAIL;
		let password = args.password || process.env.MOBBIN_PASSWORD;

		if (!email || !password) {
			p.intro("Mobbin Login");

			if (!email) {
				const result = await p.text({
					message: "Email:",
					validate: (v) => (v.includes("@") ? undefined : "Invalid email"),
				});
				if (p.isCancel(result)) process.exit(0);
				email = result;
			}

			if (!password) {
				const result = await p.password({
					message: "Password:",
				});
				if (p.isCancel(result)) process.exit(0);
				password = result;
			}
		}

		const client = new MobbinClient();
		const authType = await client.auth.checkEmail(email);

		if (authType !== "password") {
			console.error(
				`This account uses ${authType} authentication, which is not supported by the CLI.`,
			);
			process.exit(1);
		}

		const session = await client.auth.login(email, password);
		saveSession(session);

		console.log(
			JSON.stringify({
				status: "ok",
				email: session.user.email,
				userId: session.user.id,
			}),
		);
	},
});

const logoutCommand = defineCommand({
	meta: {
		name: "logout",
		description: "Logout from Mobbin",
	},
	run: () => {
		clearSession();
		console.log(JSON.stringify({ status: "ok", message: "Logged out" }));
	},
});

const statusCommand = defineCommand({
	meta: {
		name: "status",
		description: "Show current auth status",
	},
	run: () => {
		const session = loadSession();
		if (!session) {
			console.log(JSON.stringify({ authenticated: false }));
			return;
		}

		const expired = Date.now() / 1000 >= session.expires_at;
		console.log(
			JSON.stringify({
				authenticated: true,
				expired,
				email: session.user.email,
				userId: session.user.id,
				expiresAt: new Date(session.expires_at * 1000).toISOString(),
			}),
		);
	},
});

export const authCommand = defineCommand({
	meta: {
		name: "auth",
		description: "Authentication management",
	},
	subCommands: {
		login: loginCommand,
		logout: logoutCommand,
		status: statusCommand,
	},
});
