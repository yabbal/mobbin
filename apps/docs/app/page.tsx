import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
			<div className="max-w-3xl text-center">
				<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm text-fd-muted-foreground">
					<span className="inline-block h-2 w-2 rounded-full bg-green-500" />
					v1.0.0 available on npm
				</div>

				<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
					Mobbin
					<span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
						{" "}
						CLI & SDK
					</span>
				</h1>

				<p className="mt-6 text-lg leading-relaxed text-fd-muted-foreground sm:text-xl">
					Search, explore and download UI design references directly from your terminal. Access
					thousands of iOS, Android and Web app screens.
				</p>

				<div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-fd-muted-foreground">
					<span className="rounded-md bg-fd-secondary px-3 py-1">826+ iOS apps</span>
					<span className="rounded-md bg-fd-secondary px-3 py-1">110+ patterns</span>
					<span className="rounded-md bg-fd-secondary px-3 py-1">3 platforms</span>
					<span className="rounded-md bg-fd-secondary px-3 py-1">0 runtime dependency (SDK)</span>
				</div>

				<div className="mt-10 flex flex-wrap justify-center gap-4">
					<Link
						href="/docs"
						className="rounded-lg bg-fd-primary px-6 py-3 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
					>
						Documentation
					</Link>
					<Link
						href="/docs/cli"
						className="rounded-lg border border-fd-border px-6 py-3 font-medium transition-colors hover:bg-fd-accent"
					>
						CLI Guide
					</Link>
					<Link
						href="https://github.com/yabbal/mobbin"
						className="rounded-lg border border-fd-border px-6 py-3 font-medium transition-colors hover:bg-fd-accent"
					>
						GitHub
					</Link>
				</div>

				<div className="mt-16 rounded-xl border border-fd-border bg-fd-card p-6 text-left">
					<p className="mb-3 text-sm font-medium text-fd-muted-foreground">Quick start</p>
					<pre className="overflow-x-auto text-sm leading-relaxed">
						<code>{`# Installation
pnpm add -g mobbin-cli

# Login
mobbin auth login

# Search for login screens
mobbin screens search --patterns Login

# Download 5 signup references
mobbin screens download --patterns Signup -l 5 -o ./refs

# Copy a screen to the clipboard
mobbin screens copy --patterns Checkout`}</code>
					</pre>
				</div>

				<div className="mt-16 grid gap-6 text-left sm:grid-cols-3">
					<div className="rounded-xl border border-fd-border bg-fd-card p-6">
						<div className="mb-3 text-2xl">🔍</div>
						<h3 className="mb-2 font-semibold">Advanced search</h3>
						<p className="text-sm text-fd-muted-foreground">
							Filter by patterns (Login, Signup, Checkout...), UI elements (Button, Card,
							Dialog...), app categories and OCR keywords.
						</p>
					</div>
					<div className="rounded-xl border border-fd-border bg-fd-card p-6">
						<div className="mb-3 text-2xl">📥</div>
						<h3 className="mb-2 font-semibold">Direct download</h3>
						<p className="text-sm text-fd-muted-foreground">
							Download high-quality images or copy them directly to your clipboard. Works on macOS,
							Linux and Windows.
						</p>
					</div>
					<div className="rounded-xl border border-fd-border bg-fd-card p-6">
						<div className="mb-3 text-2xl">🤖</div>
						<h3 className="mb-2 font-semibold">AI integration</h3>
						<p className="text-sm text-fd-muted-foreground">
							JSON output by default, designed for AI agents. Usable as a Claude Code skill to
							enhance your design workflows.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
