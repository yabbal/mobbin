import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
			<div className="max-w-3xl text-center">
				<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm text-fd-muted-foreground">
					<span className="inline-block h-2 w-2 rounded-full bg-green-500" />
					v1.0.0 disponible sur npm
				</div>

				<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
					Mobbin
					<span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
						{" "}
						CLI & SDK
					</span>
				</h1>

				<p className="mt-6 text-lg leading-relaxed text-fd-muted-foreground sm:text-xl">
					Recherchez, explorez et telechargez des references de design UI directement depuis votre
					terminal. Accedez a des milliers d&apos;ecrans d&apos;apps iOS, Android et Web.
				</p>

				<div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-fd-muted-foreground">
					<span className="rounded-md bg-fd-secondary px-3 py-1">826+ apps iOS</span>
					<span className="rounded-md bg-fd-secondary px-3 py-1">110+ patterns</span>
					<span className="rounded-md bg-fd-secondary px-3 py-1">3 plateformes</span>
					<span className="rounded-md bg-fd-secondary px-3 py-1">0 dependance runtime (SDK)</span>
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
						Guide CLI
					</Link>
					<Link
						href="https://github.com/yabbal/mobbin"
						className="rounded-lg border border-fd-border px-6 py-3 font-medium transition-colors hover:bg-fd-accent"
					>
						GitHub
					</Link>
				</div>

				<div className="mt-16 rounded-xl border border-fd-border bg-fd-card p-6 text-left">
					<p className="mb-3 text-sm font-medium text-fd-muted-foreground">Demarrage rapide</p>
					<pre className="overflow-x-auto text-sm leading-relaxed">
						<code>{`# Installation
pnpm add -g mobbin-cli

# Connexion
mobbin auth login

# Rechercher des ecrans de login
mobbin screens search --patterns Login

# Telecharger 5 references de signup
mobbin screens download --patterns Signup -l 5 -o ./refs

# Copier un ecran dans le presse-papier
mobbin screens copy --patterns Checkout`}</code>
					</pre>
				</div>

				<div className="mt-16 grid gap-6 text-left sm:grid-cols-3">
					<div className="rounded-xl border border-fd-border bg-fd-card p-6">
						<div className="mb-3 text-2xl">🔍</div>
						<h3 className="mb-2 font-semibold">Recherche avancee</h3>
						<p className="text-sm text-fd-muted-foreground">
							Filtrez par patterns (Login, Signup, Checkout...), elements UI (Button, Card,
							Dialog...), categories d&apos;apps et mots-cles OCR.
						</p>
					</div>
					<div className="rounded-xl border border-fd-border bg-fd-card p-6">
						<div className="mb-3 text-2xl">📥</div>
						<h3 className="mb-2 font-semibold">Telechargement direct</h3>
						<p className="text-sm text-fd-muted-foreground">
							Telechargez les images en haute qualite ou copiez-les directement dans votre
							presse-papier. Fonctionne sur macOS, Linux et Windows.
						</p>
					</div>
					<div className="rounded-xl border border-fd-border bg-fd-card p-6">
						<div className="mb-3 text-2xl">🤖</div>
						<h3 className="mb-2 font-semibold">Integration IA</h3>
						<p className="text-sm text-fd-muted-foreground">
							Sortie JSON par defaut, pensee pour les agents IA. Utilisable comme skill Claude Code
							pour enrichir vos workflows de design.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
