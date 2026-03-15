# Mobbin CLI & SDK

> Unofficial TypeScript CLI & SDK for [Mobbin](https://mobbin.com/) — search, explore and download UI design references (screens, apps, flows, elements).

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| [`mobbin-cli`](./packages/mobbin-cli) | CLI to search and download designs | [![npm](https://img.shields.io/npm/v/mobbin-cli)](https://www.npmjs.com/package/mobbin-cli) |
| [`mobbin-sdk`](./packages/mobbin-sdk) | TypeScript SDK for the Mobbin API | [![npm](https://img.shields.io/npm/v/mobbin-sdk)](https://www.npmjs.com/package/mobbin-sdk) |

## Installation

```bash
# CLI (global)
pnpm add -g mobbin-cli

# SDK (in a project)
pnpm add mobbin-sdk
```

## Quick Start

### CLI

```bash
# Login
mobbin auth login

# Search login screens
mobbin screens search --patterns Login

# Download signup screens
mobbin screens download --patterns Signup -l 5 -o ./refs

# Copy a screen to clipboard
mobbin screens copy --patterns Checkout

# List popular apps
mobbin apps popular -t

# Explore available filters
mobbin filters list -c screenPatterns -t
```

### SDK

```typescript
import { MobbinClient } from "mobbin-sdk";

const client = new MobbinClient({
  credentials: { email: "user@example.com", password: "..." },
});
await client.init();

// Search screens
const screens = await client.screens.search(
  { platform: "ios", screenPatterns: ["Login"] },
  { pageSize: 10, sortBy: "trending" },
);

// Download an image
const buffer = await client.screens.download(
  screens.data[0].screenCdnImgSources.src,
);
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `mobbin auth login` | Log in to Mobbin |
| `mobbin auth logout` | Log out |
| `mobbin auth status` | Show auth status |
| `mobbin screens search` | Search screens (patterns, elements, keywords) |
| `mobbin screens download` | Download screen images |
| `mobbin screens copy` | Copy a screen to clipboard |
| `mobbin apps search` | Search apps |
| `mobbin apps list` | List all apps for a platform |
| `mobbin apps popular` | Popular apps |
| `mobbin filters list` | List available filters |
| `mobbin collections list` | List your collections |
| `mobbin completion` | Generate shell completion script |

## Shell Completion

```bash
# zsh (add to ~/.zshrc)
eval "$(mobbin completion --shell zsh)"

# bash (add to ~/.bashrc)
eval "$(mobbin completion --shell bash)"

# fish
mobbin completion --shell fish | source
```

## Supported Platforms

- iOS
- Android
- Web

## Documentation

Full documentation available at [yabbal.github.io/mobbin](https://yabbal.github.io/mobbin).

## License

MIT - [yabbal](https://github.com/yabbal)
