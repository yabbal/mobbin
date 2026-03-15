# Mobbin API Map

## Architecture Overview

Mobbin is a Next.js app hosted on Vercel. Authentication is handled via **Supabase Auth** (project: `ujasntkfphywizsdaapi`). All API endpoints are Next.js API routes under `https://mobbin.com/api/`. Auth tokens are stored in chunked cookies (`sb-ujasntkfphywizsdaapi-auth-token.0` and `.1`).

## Authentication

### Supabase Auth

- **Supabase URL**: `https://ujasntkfphywizsdaapi.supabase.co`
- **Supabase Anon Key**: `sb_publishable_LbI2-4spKrYx1xHKrI4YyQ_rC-csyUz`
- **Auth header for Supabase direct calls**: `Authorization: Bearer <access_token>`
- **Auth header `apikey`**: `sb_publishable_LbI2-4spKrYx1xHKrI4YyQ_rC-csyUz`
- **User ID field**: `sub` in the JWT (e.g., `63585ffe-a240-4615-8b17-afc4bd00629f`)

### Login Flow

#### 1. Check email auth method
```
POST /api/auth/login-by-email-only
Content-Type: application/json

{"email":"user@example.com","redirectTo":"/","isForgotPassword":false}
```
**Response**: `{"value":{"type":"password"}}` (or `"magic_link"`)

#### 2. Login with password (Next.js Server Action)
```
POST /login
Content-Type: text/plain;charset=UTF-8
next-action: 40aff9d8aa33bf140e1cf9370045fad50d8b6732e9

[{"email":"user@example.com","password":"the_password"}]
```
**Response**: Sets `sb-ujasntkfphywizsdaapi-auth-token.0` and `.1` cookies containing the Supabase session (access_token, refresh_token, user data).

#### 3. Get current user (Supabase direct)
```
GET https://ujasntkfphywizsdaapi.supabase.co/auth/v1/user
Authorization: Bearer <access_token>
apikey: sb_publishable_LbI2-4spKrYx1xHKrI4YyQ_rC-csyUz
x-client-info: supabase-ssr/0.0.10
```

---

## Content API Endpoints

All POST endpoints use `Content-Type: application/json`. Auth is via the Supabase session cookie (automatically sent).

### Apps

#### Search/List Apps
```
POST /api/content/search-apps

{
  "searchRequestId": "",
  "filterOptions": {
    "platform": "ios",              // "ios" | "android" | "web"
    "appCategories": ["Entertainment"] // optional array of category names
  },
  "paginationOptions": {
    "pageSize": 7,
    "sortBy": "publishedAt"         // "publishedAt" | "trending" | "popularity"
  }
}
```
**Response**: `{ "value": { "searchRequestId": "", "data": [AppObject, ...] } }`

Each AppObject contains: `id`, `appName`, `appCategory`, `appLogoUrl`, `appTagline`, `platform`, `keywords`, `createdAt`, `appVersionId`, `appVersionPublishedAt`, `previewScreens`, `previewVideoUrl`, `allAppCategories`, `popularityMetric`, `trendingMetric`, `isRestricted`

#### Get Searchable Apps List (full catalog for autocomplete)
```
GET /api/searchable-apps/{platform}
```
Where `{platform}` = `ios` | `android` | `web`

**Response**: Array of `{ id, platform, appName, appLogoUrl, appTagline, keywords, previewScreens }`

#### Get Popular Apps with Preview Screens
```
POST /api/popular-apps/fetch-popular-apps-with-preview-screens

{
  "platform": "ios",
  "limitPerCategory": 10
}
```
**Response**: `{ "value": [{ app_id, app_name, app_logo_url, preview_screens, app_category, popularity_metric }, ...] }`

---

### Screens

#### Search/Fetch Screens (main search endpoint)
```
POST /api/content/fetch-screens

{
  "searchRequestId": "uuid",
  "filterOptions": {
    "platform": "ios",
    "screenElements": null,           // array of element names or null
    "screenKeywords": null,           // text search or null
    "screenPatterns": ["Signup"],     // array of pattern names or null
    "appCategories": null,            // array of category names or null
    "hasAnimation": null              // boolean or null
  },
  "paginationOptions": {
    "pageSize": 24,
    "sortBy": "trending"              // "trending" | "popularity" | "publishedAt"
  }
}
```
**Response**: `{ "value": { "data": [ScreenObject, ...] } }`

Each ScreenObject contains: `id`, `screenUrl`, `screenNumber`, `screenPatterns`, `screenElements`, `screenKeywords` (OCR text), `appVersionId`, `appId`, `appName`, `appCategory`, `appLogoUrl`, `platform`, `popularityMetric`, `trendingMetric`, `metadata` (width/height), `screenCdnImgSources` (src, srcSet, downloadableSrc)

---

### Search Bar

#### Trending Apps
```
POST /api/search-bar/fetch-trending-apps

{"platform": "ios"}
```
**Response**: `{ "value": [{ id, platform, appName, appLogoUrl, trending_metric, appVersions }, ...] }`

#### Trending Filter Tags
```
POST /api/search-bar/fetch-trending-filter-tags

{"experience": "apps", "platform": "ios"}
```
**Response**: `{ "value": [{ imageUrl, cardType, order, dictionaryEntry: { id, displayName, definition, synonyms, subCategory, exampleScreens } }, ...] }`

#### Trending Text-in-Screenshot Keywords
```
POST /api/search-bar/fetch-trending-text-in-screenshot-keywords

{"platform": "ios"}
```
**Response**: `{ "value": [{ platformType, keyword, order }, ...] }`

#### Trending Sites
```
POST /api/search-bar/fetch-trending-sites
```
(No body required)

#### Searchable Sites
```
POST /api/search-bar/fetch-searchable-sites
```
(No body)

**Response**: `{ "value": [{ id, name, logo_url, tagline, keywords }, ...] }`

#### Recent Searches
```
GET /api/recent-searches
```
**Response**: `{ "apps": { "ios": [...], "web": [...] }, "sites": [...] }`

---

### Filter Tags / Dictionary

#### Fetch Dictionary Definitions (all filter categories)
```
POST /api/filter-tags/fetch-dictionary-definitions
```
(No body)

**Response**: `{ "value": [CategoryObject, ...] }`

Each CategoryObject contains: `slug` (e.g., `appCategories`, `screenPatterns`, `screenElements`, `flowActions`, `styles`), `displayName`, `experience` (`web` | `mobile`), `subCategories` with nested `entries` containing `displayName`, `definition`, `synonyms`, `contentCounts`, `exampleScreens`

---

### Collections

#### Fetch User Collections
```
POST /api/collection/fetch-collections
```
(No body)

**Response**: `{ "value": [] }` (empty if no collections)

---

### Saved Content

#### Fetch Saved Contents (check if items are saved)
```
POST /api/saved/fetch-saved-contents

{
  "contentType": "apps",           // "apps" | "screens" | "flows"
  "contentIds": ["uuid1", "uuid2"]
}
```
**Response**: `{ "value": [] }` (array of saved items)

---

### Subscription / Billing

#### Fetch Churnkey Hash
```
POST /api/churnkey/fetch-churnkey-hash
```
(No body)

---

## Page Routes (Next.js RSC)

These are Next.js React Server Component routes that return pre-rendered content. They use `_rsc` query param for RSC payload.

| Route | Description |
|-------|-------------|
| `/discover/apps/{platform}/latest` | Latest apps (ios/web) |
| `/discover/apps/{platform}/popular` | Most popular apps |
| `/discover/apps/{platform}/top` | Top rated apps |
| `/discover/apps/{platform}/animations` | Apps with animations |
| `/discover/sites/latest` | Latest websites |
| `/search/apps/{platform}?content_type={type}&sort={sort}&filter={filter}` | Search results |
| `/apps/{slug}-{platform}-{appId}/{versionId}/screens` | App detail - screens |
| `/apps/{slug}-{platform}-{appId}/{versionId}/ui-elements` | App detail - UI elements |
| `/apps/{slug}-{platform}-{appId}/{versionId}/flows` | App detail - flows |
| `/screens/{screenId}` | Individual screen detail |
| `/saved/mobile/screens` | User's saved screens |
| `/community/mobile/featured` | Community featured |
| `/settings/account` | Account settings |

### Search URL Pattern
```
/search/apps/{platform}?content_type={type}&sort={sort}&filter={filterCategory}.{filterValue}
```
- `content_type`: `apps` | `screens` | `ui-elements` | `flows`
- `sort`: `publishedAt` | `trending` | `popularity`
- `filter`: `{category}.{value}` where category is `appCategories`, `screenPatterns`, `screenElements`, `flowActions`

Examples:
- `/search/apps/ios?content_type=screens&sort=trending&filter=screenPatterns.Signup`
- `/search/apps/ios?content_type=apps&sort=publishedAt&filter=appCategories.Finance`
- `/search/apps/ios?content_type=ui-elements&sort=trending&filter=screenElements.Card`
- `/search/apps/ios?content_type=flows&sort=trending&filter=flowActions.Onboarding`

---

## CDN / Media URLs

### Screen Images
```
https://bytescale.mobbin.com/FW25bBB/image/mobbin.com/prod/content/app_screens/{uuid}.png?f=webp&w=1920&q=85&fit=shrink-cover
```

With watermark:
```
https://bytescale.mobbin.com/FW25bBB/image/mobbin.com/prod/content/app_screens/{uuid}.png?f=webp&w=1920&q=85&fit=shrink-cover&extend-bottom=120&image=%2Fmobbin.com%2Fprod%2Fwatermark%2F1.0%2F{screenId}&gravity=bottom&v=1.0
```

### App Logos
```
https://bytescale.mobbin.com/FW25bBB/image/mobbin.com/prod/content/app_logos/{uuid}.webp?f=png&w=400&q=85&fit=shrink-cover
```

### Raw Supabase Storage (no CDN transforms)
```
https://ujasntkfphywizsdaapi.supabase.co/storage/v1/object/public/content/app_screens/{uuid}.png
https://ujasntkfphywizsdaapi.supabase.co/storage/v1/object/public/content/app_logos/{uuid}.webp
```

### Flow Videos
```
https://bytescale.mobbin.com/FW25bBB/video/mobbin.com/prod/content/app_flow_videos/{uuid}.mp4?f=mp4-h264&w=1920&hp=1920&sh=100&mute=true&p=mhq&q=73&gop=300&sd=false&rf=6&bf=7&qz=-1&if=0&bo=-1
```

### Animation Videos
```
https://bytescale.mobbin.com/FW25bBB/video/mobbin.com/prod/content/animations/{uuid}.mp4?f=mp4-h264&w=1920&hp=1920&sh=100&mute=true&p=mhq&q=73&gop=300&sd=false&rf=6&bf=7&qz=-1&if=0&bo=-1&fps=60
```

---

## External Services

| Service | Purpose |
|---------|---------|
| **Supabase** (`ujasntkfphywizsdaapi.supabase.co`) | Auth, database, storage |
| **Bytescale** (`bytescale.mobbin.com/FW25bBB`) | CDN for images and video transforms |
| **Stripe** (`m.stripe.com`) | Payments |
| **Knock** (`api.knock.app`) | Push notifications |
| **Sentry** (`monitoring`) | Error tracking |
| **Plausible** (`analytics/api/p`) | Analytics |

---

## Key Filter Categories

### App Categories (iOS)
AI, Education, Finance, Travel & Transportation, Shopping, Entertainment, Health & Fitness, Lifestyle, Photo & Video, Productivity, Social, Communication, Food & Drink, Music, News, Sports, Weather, Utilities, Business, ...

### Screen Patterns
Signup, Login, Home, Checkout, Settings, Notifications, My Account & Profile, Filter & Sort, Subscription & Paywall, Onboarding, Search, ...

### UI Elements
Banner, Bottom Sheet, Button, Card, Stacked List, Toast, Dialog, Divider, Text Field, Chip, Tab Bar, ...

### Flow Actions
Creating Account, Filtering & Sorting, Logging In, Editing Profile, Onboarding, ...

---

## Notes for CLI Implementation

1. **Auth**: Login via `/api/auth/login-by-email-only` then `/login` server action. Store the Supabase session cookies.
2. **Main search**: Use `/api/content/fetch-screens` and `/api/content/search-apps` for the core search functionality.
3. **Pagination**: Use `paginationOptions.pageSize` and cursor-based pagination (response provides cursor info).
4. **Image download**: Use raw Supabase storage URLs (without watermark) or `downloadableSrc` from the CDN response.
5. **Rate limiting**: No obvious rate limits observed, but the session cookie is required for authenticated endpoints.
6. **All API calls use cookies for auth**, not Authorization headers (except direct Supabase calls).
