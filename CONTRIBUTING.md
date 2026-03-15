# Contributing

## Getting Started

```bash
git clone https://github.com/yabbal/mobbin.git
cd mobbin
pnpm install
pnpm build
```

## Project Structure

```
mobbin/
├── packages/mobbin-sdk/   # SDK TypeScript
├── packages/mobbin-cli/   # CLI
├── apps/docs/             # Documentation (Fumadocs)
```

## Development Workflow

1. Creer une branche depuis `main`
2. Faire vos modifications
3. Commiter avec [Conventional Commits](https://www.conventionalcommits.org/) (lefthook verifie automatiquement)
4. Creer une Pull Request

## Commands

```bash
pnpm build       # Build tous les packages
pnpm lint        # Linter (Biome)
pnpm check       # Typecheck
```

## Releases

Les releases sont gerees via [Changesets](https://github.com/changesets/changesets). Pour proposer une release :

```bash
pnpm changeset
```

## Code of Conduct

Soyez respectueux et constructif.
