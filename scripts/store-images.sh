#!/usr/bin/env bash
# Erzeugt die Store-Bilder (Screenshots 1280 × 800, Werbekachel 440 × 280) aus
# store/scenes/ mit headless Chrome nach store/images/.
set -euo pipefail

cd "$(dirname "$0")/.."
root=$(pwd)
out="$root/store/images"
mkdir -p "$out"

shot() {  # shot <seite?query> <breite> <höhe> <datei>
  google-chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --allow-file-access-from-files --virtual-time-budget=3000 \
    --window-size="$2,$3" --screenshot="$out/$4" "file://$root/store/scenes/$1" 2> /dev/null
  echo "$4"
}

shot "scene.html?s=1&lang=de" 1280 800 de-1-vordergrund.png
shot "scene.html?s=2&lang=de" 1280 800 de-2-hintergrund.png
shot "scene.html?s=3&lang=de" 1280 800 de-3-text.png
shot "scene.html?s=4&lang=de" 1280 800 de-4-einstellungen.png
shot "scene.html?s=1&lang=en" 1280 800 en-1-foreground.png
shot "scene.html?s=2&lang=en" 1280 800 en-2-background.png
shot "scene.html?s=3&lang=en" 1280 800 en-3-text.png
shot "scene.html?s=4&lang=en" 1280 800 en-4-settings.png
shot "tile.html?lang=de" 440 280 kachel-de.png
shot "tile.html?lang=en" 440 280 tile-en.png
