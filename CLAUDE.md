# HSLinkDrag

Chrome-Erweiterung (Manifest V3): Links, Bilder und markierten Text per Click & Drag
in neuem Tab öffnen; Zugrichtung bestimmt Vorder-/Hintergrund.

- Konzept, Entscheidungsprotokoll und aktueller Status: [docs/KONZEPT.md](docs/KONZEPT.md)
- Manuelle Test-Checkliste: [docs/TESTPLAN.md](docs/TESTPLAN.md)
- Installation, Bedienung, Projektstruktur: [README.md](README.md)
- Chrome Web Store: Texte [store/STORE-EINTRAG.md](store/STORE-EINTRAG.md), Paket `scripts/build-zip.sh`,
  Bilder `scripts/store-images.sh`. Bei neuen Funktionen Store-Texte und Bilder mitpflegen.
- Kommunikation mit dem Nutzer auf Deutsch.
- Git: Branch `main`, Remote `origin` = https://github.com/HSBitbooster/HSLinkDrag (privat).
  Nach jedem fertigen, getesteten Schritt committen und pushen.

## Arbeitsregeln

- Jede getroffene Entscheidung in `docs/KONZEPT.md` → Abschnitt 9 (Entscheidungsprotokoll)
  eintragen und die betroffenen Konzeptabschnitte nachziehen; Status oben aktuell halten.
- Kein Build-Schritt: reines JavaScript, direkt als entpackte Erweiterung ladbar.
- Gemeinsamer Code in `src/shared/` als klassische Scripts (Namespace `HSLD`), weil
  Content-Scripts keine ES-Module laden können; zusätzlich `module.exports` für Node-Tests.
- Neue Texte immer in beiden Sprachen: `_locales/de` und `_locales/en`.
- Tests: `node --test test/`. Testseite über `.claude/launch.json` („testseite“, Port 8765)
  → `http://localhost:8765/test/testseite.html`.
