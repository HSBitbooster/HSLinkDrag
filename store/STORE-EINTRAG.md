# Chrome Web Store – Texte zum Kopieren

Alle Felder in der Reihenfolge des Entwickler-Dashboards
(https://chrome.google.com/webstore/devconsole). Inhalte in den grauen Kästen
1:1 kopieren. Die Kurzbeschreibung kommt automatisch aus dem Paket
(`extDescription` in `_locales/*/messages.json`, max. 132 Zeichen).

Paket bauen: `scripts/build-zip.sh` → `dist/HSLinkDrag-<version>.zip`
Bilder: `store/images/` (neu erzeugen: `scripts/store-images.sh`)

---

## Update auf 1.0.4 (erst nach Freigabe von 1.0.3)

Während eine Version in Prüfung ist, nimmt das Dashboard kein neues Paket an. Darum:

1. Freigabe-E-Mail für 1.0.3 abwarten (Status im Dashboard: „Veröffentlicht“).
2. Paket bauen – bricht ab, wenn die Firefox-Version nicht ebenfalls 1.0.4 hat:
   `scripts/build-zip.sh` → `dist/HSLinkDrag-1.0.4.zip`
3. Dashboard → HSLinkDrag → **Paket** → „Neues Paket hochladen“ → ZIP auswählen.
4. **Store-Eintrag:** Texte und Bilder bleiben gültig, keine Änderung nötig.
5. **Datenschutz:** Berechtigungen unverändert (`storage`, `search`, Content-Script auf allen
   Websites) – Begründungen, Datennutzung und Datenschutzerklärung bleiben.
6. „Zur Überprüfung einreichen“. Nach der Freigabe Status in `docs/KONZEPT.md` nachtragen.

Was 1.0.4 ändert (zur eigenen Übersicht, der Chrome Web Store hat kein Feld für Versionshinweise):

- Links, deren Ziehen die Website selbst sperrt (z. B. Googles Reiter „Bilder“, „Videos“),
  lassen sich jetzt ebenfalls öffnen; Karussells und Schieberegler mit eigenem Ziehen bleiben
  unberührt.
- Der Kasten mit Linktext und Adresse, den Chrome beim Ziehen zeigt, verdeckt den Hinweis
  nicht mehr (wird bei eingeschaltetem Hinweis ausgeblendet).
- Ist Text markiert und man zieht an einem Link außerhalb der Markierung, öffnet der Link.
- Gleicher Stand wie HSLinkDrag 1.0.4 für Firefox.

---

## Tab „Paket“ (Package)

ZIP-Datei `dist/HSLinkDrag-<version>.zip` hochladen.

## Tab „Store-Eintrag“ (Store listing)

**Sprache:** Standardsprache ist Englisch (`default_locale: en`). Deutsch wird
automatisch angeboten, weil das Paket `_locales/de` enthält – für Deutsch die
deutschen Texte und Bilder eintragen.

**Kategorie:** Werkzeuge (Tools) – bzw. „Produktivität → Tools“, je nach Dashboard-Stand.

### Beschreibung – Deutsch

```
Links, Bilder, SVG-Grafiken und markierten Text mit einer kurzen Mausbewegung in einem neuen Tab öffnen.

So geht's: Element anklicken, mit gedrückter Maustaste ein Stück nach rechts oder links ziehen, loslassen.

• Nach rechts ziehen: neuer Tab im Vordergrund
• Nach links ziehen: neuer Tab im Hintergrund – du bleibst auf der Seite
  (beide Richtungen frei einstellbar, auch „nichts tun“)

FUNKTIONEN
• Links öffnen – auch Links in SVG-Grafiken und in eingebetteten Frames
• Bilder und SVG-Grafiken öffnen, auch wenn sie nicht verlinkt sind
• Verlinkte Bilder: SHIFT beim Loslassen entscheidet, ob der Link oder das Bild geöffnet wird
• Markierten Text ziehen: Suche mit Google, DuckDuckGo, Bing oder der Chrome-Standardsuchmaschine
• Ist der markierte Text eine Internetadresse (z. B. „www.example.com“), wird sie direkt geöffnet
• E-Mail-Links und markierte E-Mail-Adressen öffnen dein E-Mail-Programm
• Position des neuen Tabs: rechts oder links vom aktuellen Tab oder am Ende
• Mehrere Tabs reihen sich in Öffnungsreihenfolge ein und bleiben in der Tab-Gruppe
• Hinweis am Mauszeiger zeigt vorab, was beim Loslassen passiert
• ESC während des Ziehens bricht ab
• Mindestdistanz einstellbar – kein versehentliches Öffnen
• Ausschlussliste für Websites mit eigenem Drag & Drop
• Ein-/Ausschalten mit einem Klick auf das Symbol in der Symbolleiste
• Eingabefelder bleiben unberührt: Text in Suchfelder ziehen funktioniert wie gewohnt

DATENSCHUTZ
HSLinkDrag sammelt keine Daten, enthält keine Werbung und kein Tracking und lädt keinen Code nach. Die Einstellungen speichert Chrome in deinem Browserprofil.

Oberfläche auf Deutsch und Englisch.
```

### Beschreibung – Englisch

```
Open links, images, SVG graphics and selected text in a new tab with a short mouse movement.

How it works: press the mouse button on an element, drag a little to the right or left, release.

• Drag right: new tab in the foreground
• Drag left: new tab in the background – you stay on the page
  (both directions configurable, including "do nothing")

FEATURES
• Open links – including links in SVG graphics and embedded frames
• Open images and SVG graphics, even when they are not linked
• Linked images: SHIFT on release decides whether the link or the image opens
• Drag selected text to search with Google, DuckDuckGo, Bing or Chrome's default search engine
• If the selected text is a web address (e.g. "www.example.com"), it is opened directly
• Email links and selected email addresses open your email client
• New tab position: right or left of the current tab, or at the end
• Several tabs line up in the order you opened them and stay in the tab group
• A hint next to the mouse pointer shows what will happen on release
• Press ESC while dragging to cancel
• Adjustable minimum distance – no accidental opening
• Exclusion list for websites with their own drag & drop
• Turn on/off with one click on the toolbar icon
• Input fields are left alone: dragging text into search boxes works as usual

PRIVACY
HSLinkDrag collects no data, has no ads or tracking and loads no remote code. Chrome stores the settings in your browser profile.

User interface in English and German.
```

### Grafiken

| Feld | Datei |
|---|---|
| Store-Symbol 128 × 128 | `icons/icon-128.png` |
| Screenshots 1280 × 800 (DE) | `store/images/de-1-vordergrund.png` … `de-4-einstellungen.png` |
| Screenshots 1280 × 800 (EN) | `store/images/en-1-foreground.png` … `en-4-settings.png` |
| Kleine Werbekachel 440 × 280 | `store/images/kachel-de.png` / `store/images/tile-en.png` |
| Marquee 1400 × 560 | `store/images/marquee-de.png` / `store/images/marquee-en.png` (optional; empfohlen vor einem Antrag auf das „Empfohlen“-Abzeichen) |

### Weitere Felder

- **Offizielle URL / Website:** leer lassen (optional)
- **Support-URL:** leer lassen (optional) oder später eine öffentliche Seite

---

## Tab „Datenschutz“ (Privacy practices)

### Einzweck-Beschreibung (Single purpose)

```
HSLinkDrag opens links, images, SVG graphics and selected text in a new tab when the user drags them a short distance with the mouse; the drag direction decides whether the tab opens in the foreground or background.
```

### Begründung der Berechtigungen (Permission justification)

**storage**
```
Stores the user's settings (drag directions, tab position, search engine, minimum distance, excluded websites, on/off state) in chrome.storage.sync, and temporarily keeps SVG graphics the user chose to open in chrome.storage.session so the extension's own viewer page can display them. No other data is stored.
```

**search**
```
Used only when the user has chosen "Chrome default search engine" in the settings: dragged selected text is then searched with chrome.search.query in a new tab, so the user's own search engine is used instead of a fixed one.
```

**Host-Berechtigung (Content script on all websites / host permission)**
```
The content script must run on every website because the drag gesture can be used on any page the user visits: it detects when the user drags a link, image, SVG graphic or selected text and asks the extension to open it in a new tab. It does not read, collect or transmit page content; it only reacts to the user's own drag gesture. Users can exclude websites in the settings.
```

### Remote-Code

```
No, I am not using remote code.
```
(Alle Scripte sind im Paket enthalten; es wird nichts nachgeladen oder per eval ausgeführt.)

### Datennutzung (Data usage)

- Bei **keiner** Datenkategorie einen Haken setzen (HSLinkDrag erhebt keine Nutzerdaten).
- Alle drei Bestätigungen anhaken:
  - Daten werden nicht an Dritte verkauft/übertragen (außer für zugelassene Anwendungsfälle)
  - Daten werden nicht für Zwecke ohne Bezug zum Einzweck genutzt
  - Daten werden nicht zur Bonitätsprüfung oder für Kredite genutzt

### Datenschutzerklärung (Privacy policy URL)

```
https://github.com/HSBitbooster/HSLinkDrag-Datenschutz/blob/main/README.md
```

Öffentliches Repository `HSBitbooster/HSLinkDrag-Datenschutz`, enthält nur `store/DATENSCHUTZ.md`
als `README.md`. Bei Änderungen an `store/DATENSCHUTZ.md` dort ebenfalls aktualisieren.

---

## Tab „Vertrieb“ (Distribution)

- **Zahlung:** kostenlos
- **Sichtbarkeit:** Öffentlich (oder zum Ausprobieren „Nicht gelistet“ – nur mit Link auffindbar)
- **Regionen:** alle
