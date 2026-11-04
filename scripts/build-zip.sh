#!/usr/bin/env bash
# Erzeugt das ZIP-Paket für den Chrome Web Store: dist/HSLinkDrag-<version>.zip
# Enthält nur, was die Erweiterung zur Laufzeit braucht (keine Tests, Doku, Store-Material).
set -euo pipefail

cd "$(dirname "$0")/.."

version=$(node -p "require('./manifest.json').version")
out="dist/HSLinkDrag-${version}.zip"

# Chrome- und Firefox-Version müssen gleich sein, Unit-Tests grün, bevor ein Paket entsteht.
node scripts/check-version.js
node --test test/ > /dev/null

mkdir -p dist
rm -f "$out"
zip -q -r -X "$out" \
  manifest.json \
  _locales \
  src \
  options \
  viewer \
  icons/icon-16.png icons/icon-32.png icons/icon-48.png icons/icon-128.png \
  icons/icon-16-off.png icons/icon-32-off.png

echo "$out ($(du -h "$out" | cut -f1)):"
unzip -Z1 "$out"
