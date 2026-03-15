# mobbin-sdk

> Unofficial TypeScript SDK for the [Mobbin](https://mobbin.com/) API.

## Install

```bash
pnpm add mobbin-sdk
```

## Usage

```typescript
import { MobbinClient } from "mobbin-sdk";

const client = new MobbinClient({
  credentials: { email: "user@example.com", password: "..." },
});
await client.init();

// Search screens
const screens = await client.screens.search(
  { platform: "ios", screenPatterns: ["Login", "Signup"] },
  { pageSize: 10, sortBy: "trending" },
);

// List apps
const apps = await client.apps.list("ios");

// Popular apps
const popular = await client.apps.popular("ios");

// Filters
const filters = await client.filters.list();

// Download a screen image
const buffer = await client.screens.download(
  screens.data[0].screenCdnImgSources.src,
);
```

## License

MIT
