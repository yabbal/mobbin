# Mobbin CLI & SDK

> CLI et SDK TypeScript non officiels pour [Mobbin](https://mobbin.com/) — recherche et telechargement de references de design UI (ecrans, apps, flows, elements).

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| [`mobbin-cli`](./packages/mobbin-cli) | CLI pour rechercher et telecharger des designs | [![npm](https://img.shields.io/npm/v/mobbin-cli)](https://www.npmjs.com/package/mobbin-cli) |
| [`mobbin-sdk`](./packages/mobbin-sdk) | SDK TypeScript pour l'API Mobbin | [![npm](https://img.shields.io/npm/v/mobbin-sdk)](https://www.npmjs.com/package/mobbin-sdk) |

## Installation

```bash
# CLI (global)
pnpm add -g mobbin-cli

# SDK (dans un projet)
pnpm add mobbin-sdk
```

## Quick Start

### CLI

```bash
# Authentification
mobbin auth login

# Rechercher des ecrans de login
mobbin screens search --patterns Login

# Telecharger des ecrans de signup
mobbin screens download --patterns Signup -l 5 -o ./refs

# Copier un ecran dans le presse-papier
mobbin screens copy --patterns Checkout

# Lister les apps populaires
mobbin apps popular -t

# Explorer les filtres disponibles
mobbin filters list -c screenPatterns -t
```

### SDK

```typescript
import { MobbinClient } from "mobbin-sdk";

const client = new MobbinClient({
  credentials: { email: "user@example.com", password: "..." },
});
await client.init();

// Rechercher des ecrans
const screens = await client.screens.search(
  { platform: "ios", screenPatterns: ["Login"] },
  { pageSize: 10, sortBy: "trending" },
);

// Telecharger une image
const buffer = await client.screens.download(
  screens.data[0].screenCdnImgSources.src,
);
```

## Commandes CLI

| Commande | Description |
|----------|-------------|
| `mobbin auth login` | Se connecter a Mobbin |
| `mobbin auth logout` | Se deconnecter |
| `mobbin auth status` | Voir le statut d'authentification |
| `mobbin screens search` | Rechercher des ecrans (patterns, elements, mots-cles) |
| `mobbin screens download` | Telecharger des images d'ecrans |
| `mobbin screens copy` | Copier un ecran dans le presse-papier |
| `mobbin apps search` | Rechercher des apps |
| `mobbin apps list` | Lister toutes les apps d'une plateforme |
| `mobbin apps popular` | Apps populaires |
| `mobbin filters list` | Lister les filtres disponibles |
| `mobbin collections list` | Lister vos collections |

## Plateformes supportees

- iOS
- Android
- Web

## License

MIT - [yabbal](https://github.com/yabbal)
