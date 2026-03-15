# mobbin-cli

> CLI for [Mobbin](https://mobbin.com/) — search and download UI design references.

## Install

```bash
pnpm add -g mobbin-cli
```

## Usage

```bash
# Login
mobbin auth login

# Search screens
mobbin screens search --patterns Login
mobbin screens search --elements "Bottom Sheet" -c Finance

# Download screens
mobbin screens download --patterns Signup -l 5 -o ./refs

# Copy to clipboard
mobbin screens copy --patterns Checkout

# Browse apps
mobbin apps list -p ios
mobbin apps popular -t
mobbin apps search -c Finance

# Explore filters
mobbin filters list -c screenPatterns -t
```

## License

MIT
