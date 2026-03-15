---
name: mobbin
description: Search and download UI design references from Mobbin (screens, apps, flows, UI elements) via CLI. Browse mobile and web design patterns, download screen images, and explore design inspiration.
---

# Mobbin CLI

CLI to search and download UI design references from [Mobbin](https://mobbin.com/).

## Triggers

Use this skill when the user mentions: mobbin, design references, UI patterns, screen designs, mobile design, app design, design inspiration, UI elements, screen patterns, onboarding flow, signup screen, login screen, design system examples, app screenshots.

## Prerequisites

The CLI must be authenticated before use:

```bash
mobbin auth status
```

If not authenticated, login first:

```bash
mobbin auth login -e EMAIL -p PASSWORD
```

## Commands Reference

### Authentication

```bash
# Check auth status
mobbin auth status

# Login (interactive or with flags)
mobbin auth login
mobbin auth login -e user@example.com -p password

# Logout
mobbin auth logout
```

### Search Screens

Search for screen designs by patterns, UI elements, keywords, or categories.

```bash
# Search by screen pattern
mobbin screens search --patterns Signup
mobbin screens search --patterns "Login,Onboarding"

# Search by UI elements
mobbin screens search --elements "Button,Card,Bottom Sheet"

# Search by text visible in screenshots (OCR)
mobbin screens search -k "Sign up"

# Search by app category
mobbin screens search -c Finance
mobbin screens search -c "Shopping,Entertainment"

# Filter animated screens
mobbin screens search --animation

# Combine filters
mobbin screens search --patterns Checkout -c Shopping -p ios --sort popularity -l 10

# Change platform (ios, android, web)
mobbin screens search -p web --patterns "Landing Page"
mobbin screens search -p android --patterns Settings
```

**Arguments:**
- `--platform, -p` — Platform: `ios` (default), `android`, `web`
- `--patterns` — Screen patterns (comma-separated): Signup, Login, Home, Checkout, Settings, Notifications, Onboarding, Search, etc.
- `--elements` — UI elements (comma-separated): Banner, Bottom Sheet, Button, Card, Toast, Dialog, Text Field, Chip, Tab Bar, etc.
- `--keywords, -k` — Text search in screenshots (OCR)
- `--categories, -c` — App categories (comma-separated): Finance, Shopping, Entertainment, Health & Fitness, etc.
- `--animation` — Filter animated screens only
- `--sort, -s` — Sort: `trending` (default), `publishedAt`, `popularity`
- `--limit, -l` — Number of results (default: 24)
- `--table, -t` — Display as table instead of JSON

**Output (JSON):** Array of screen objects with `id`, `appName`, `screenPatterns`, `screenElements`, `screenUrl`, `screenCdnImgSources` (with download URLs), `metadata` (width/height).

### Download Screens

Download screen images to a local directory.

```bash
# Download 5 trending signup screens
mobbin screens download --patterns Signup -l 5

# Download to specific directory
mobbin screens download --patterns Checkout -o ./designs

# Download web landing pages
mobbin screens download -p web --patterns "Landing Page" -l 10 -o ./references
```

**Arguments:** Same filters as `screens search`, plus:
- `--output, -o` — Output directory (default: current directory)

**Output (JSON):** `{ "downloaded": [{ "file": "path", "app": "name", "patterns": [...] }] }`

### Search Apps

```bash
# Search trending apps
mobbin apps search

# Search by category
mobbin apps search -c Finance
mobbin apps search -c "Shopping,Entertainment" -p ios

# Sort by latest
mobbin apps search --sort publishedAt -l 10
```

### List Apps

```bash
# Full catalog for a platform
mobbin apps list -p ios
mobbin apps list -p web
mobbin apps list -p android
```

### Popular Apps

```bash
# Get popular apps
mobbin apps popular -p ios
mobbin apps popular -p web -l 5
```

### Browse Filters

List all available filter values to use in searches.

```bash
# List all filter categories
mobbin filters list

# List specific category values
mobbin filters list -c screenPatterns
mobbin filters list -c screenElements
mobbin filters list -c appCategories
mobbin filters list -c flowActions

# As table
mobbin filters list -c screenPatterns -t
```

### Collections

```bash
# List your saved collections
mobbin collections list
```

## Typical Workflows

### 1. Find design inspiration for a specific screen

```bash
# Search for onboarding screens in finance apps
mobbin screens search --patterns Onboarding -c Finance -l 10

# Download the best ones
mobbin screens download --patterns Onboarding -c Finance -l 5 -o ./onboarding-refs
```

### 2. Explore UI patterns

```bash
# See what filter options are available
mobbin filters list -c screenPatterns -t

# Search for a specific pattern
mobbin screens search --patterns "Subscription & Paywall" --sort popularity -l 10
```

### 3. Research competitor apps

```bash
# Find an app
mobbin apps search -c Finance --sort popularity -l 5

# Browse screens from top apps
mobbin screens search -c Finance --patterns "Home" --sort popularity
```

### 4. Download reference images for implementation

```bash
# Download checkout flow references for a shopping app
mobbin screens download --patterns Checkout -c Shopping -l 10 -o ./checkout-refs

# Download specific UI element examples
mobbin screens download --elements "Bottom Sheet" -l 5 -o ./bottom-sheet-refs
```

## Image URLs

Each screen result contains image URLs in `screenCdnImgSources`:
- `src` — Optimized CDN URL (webp)
- `srcSet` — Responsive srcset
- `downloadableSrc` — Direct download URL (full quality, no watermark)

Raw Supabase storage URL pattern:
```
https://ujasntkfphywizsdaapi.supabase.co/storage/v1/object/public/content/{screenUrl}
```

## Output Format

All commands output **JSON to stdout** by default (for programmatic/AI consumption). Use `--table` or `-t` for human-readable table format. Errors are written to stderr.
