import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16">
			<h1 className="text-4xl font-bold mb-4">Mobbin CLI & SDK</h1>
			<p className="text-lg text-fd-muted-foreground mb-8 max-w-lg">
				CLI et SDK TypeScript non officiels pour Mobbin — recherche et telechargement de references
				de design UI.
			</p>
			<div className="flex gap-4">
				<Link
					href="/docs"
					className="px-6 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
				>
					Documentation
				</Link>
				<Link
					href="https://github.com/yabbal/mobbin"
					className="px-6 py-3 border border-fd-border rounded-lg font-medium hover:bg-fd-accent transition-colors"
				>
					GitHub
				</Link>
			</div>
		</main>
	);
}
