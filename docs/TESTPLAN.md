# HSLinkDrag – Testplan

Manuelle Prüfung in echtem Chrome mit entpackt geladener Erweiterung.
Testseite: `test/testseite.html` (über `python3 -m http.server 8765 --bind 127.0.0.1`).

Legende: ✅ bestanden · ❌ Fehler · ⬜ offen · 🤖 automatisiert geprüft (Chrome-APIs simuliert)

## Bereits automatisiert geprüft (2026-11-03)

- 🤖 Unit-Tests `node --test test/` – Erkennung URL/E-Mail/Suche, Such-URLs, Ausschlussliste (10/10).
- 🤖 Content-Script im Browser mit simulierten Chrome-APIs: alle Fälle der Testseite
  (Links, mailto, javascript:/#, SVG-Link, Bild, Bild mit Link ± SHIFT, data:-Bild,
  Suche, Adresse, E-Mail, Markierung im Link, Drop auf Textarea, Eingabefeld,
  draggable-Element, ESC/kein Drop, Mindestdistanz, Richtung deaktiviert,
  SHIFT-Einstellung getauscht, Chrome-Standardsuche, ausgeschaltet, Ausschlussliste).
- 🤖 Ein echter nativer Drag (per Maussteuerung) auf einem Link löste das Öffnen aus.
- 🤖 Optionsseite: Darstellung (hell/dunkel), Speichern, Bereinigung Ausschlussliste,
  Begrenzung Mindestdistanz.

## Nur im echten Chrome prüfbar

Diese Teile laufen im Service-Worker bzw. hängen vom echten Browser/Betriebssystem ab.

| Nr. | Test | Erwartet | Ergebnis |
|---|---|---|---|
| T1 | Link nach rechts ziehen | Neuer Tab rechts, im Vordergrund | ✅ |
| T2 | Link nach links ziehen | Neuer Tab rechts, im Hintergrund | ✅ |
| T3 | 3 Links nacheinander nach links (Hintergrund) | Reihenfolge 1, 2, 3 rechts vom Ursprungstab | ✅ |
| T4 | Danach anderen Tab anklicken, zurück, erneut ziehen | Neuer Tab wieder direkt rechts vom Ursprungstab | ✅ |
| T5 | Position „Links“ | Neuer Tab links vom Ursprungstab | ✅ |
| T6 | Position „Am Ende“ | Neuer Tab ganz rechts | ✅ |
| T7 | Ursprungstab in Tab-Gruppe, Position rechts | Neuer Tab in derselben Gruppe | ✅ |
| T8 | Neuen Tab schließen | Chrome springt zurück zum Ursprungstab (Opener) | ✅ |
| T9 | Verlinktes Bild ziehen, beim Loslassen SHIFT halten (Linux!) | Bild statt Link; Hinweis wechselt live | ✅ |
| T10 | ESC während des Ziehens | Nichts geöffnet, Hinweis verschwindet | ✅ |
| T11 | Loslassen außerhalb des Browserfensters | Nichts geöffnet | ✅ |
| T12 | mailto-Link ziehen | E-Mail-Programm öffnet sich, Seite bleibt, kein leerer Tab | ✅ |
| T13 | Markierte E-Mail-Adresse ziehen | wie T12 | ✅ |
| T14 | Suchmaschine Google / DuckDuckGo / Bing | Suche in jeweiliger Maschine | ✅ |
| T15 | Suchmaschine „Chrome-Standard“ | Suche mit in Chrome eingestellter Suchmaschine, Tab an richtiger Position | ✅ |
| T16 | Toolbar-Symbol klicken | Symbol grau + „AUS“, Gesten wirkungslos; erneut klicken → aktiv | ✅ |
| T17 | Ausschlussliste `localhost` | Auf Testseite keine Geste; Hinweis erscheint nicht | ✅ |
| T18 | Link im iframe ziehen, im Frame loslassen | Funktioniert | ✅ |
| T19 | Inkognito-Fenster (Erweiterung dort erlaubt) | Tab öffnet im Inkognito-Fenster | ✅ |
| T20 | Echte Seiten: Google-Ergebnisse, Wikipedia, GitHub, Bildersuche | Links/Bilder öffnen wie erwartet | ✅ |
| T21 | Optionsseite auf Englisch (Browsersprache EN) | Englische Texte | ✅ |
| T22 | SVG-Link (Text und Kreis) ziehen | Link öffnet; kein zusätzlicher Klick im aktuellen Tab | ✅ |
| T23 | Verlinktes Bild ziehen, SHIFT **während** des Ziehens drücken/loslassen | Hinweis wechselt live zwischen „Link“ und „Bild“; beim Loslassen zählt der SHIFT-Zustand | ✅ |
| T24 | Verlinktes Bild ziehen, ESC drücken | Abbruch | ✅ |
| T25 | Link/Text/Bildlink/SVG aus beiden Frames (gleicher und fremder Ursprung) **heraus** auf die Seite ziehen, nach rechts **und** nach links | Öffnet; Richtung (Vorder-/Hintergrund) stimmt | ✅ |
| T26 | ~~Link von der Seite in einen Frame ziehen~~ | entfällt seit 1.0.2 (nicht unterstützt) | – |
| T27 | mailto-Link mit sichtbarer Adresse und „mailto:…“ als markierter Text | E-Mail-Programm (mit Betreff beim Text) | ✅ |
| T28 | Inline-SVG ohne Link (grünes „SVG“) ziehen | Neuer Tab mit Anzeigeseite: Grafik grün mit weißer Schrift, fenstergroß; Klick = Originalgröße; „Als SVG-Datei speichern“ funktioniert | ✅ |
| T29 | SVG-Stern im Link ziehen, ohne / mit SHIFT | ohne: Link · mit: oranger Stern als Grafik | ✅ |
| T30 | SVG-Link (Kreis) mit SHIFT ziehen | blauer Kreis als Grafik | ✅ |
| T31 | Am Stern im Knopf ziehen | nichts | ✅ |
| T32 | Echte Seiten mit SVG-Symbolen (z. B. GitHub, Wikipedia-Diagramme) | Grafik öffnet sinnvoll; Klicks auf Knöpfe/Symbole funktionieren unverändert | ✅ |
| T33 | In beiden Frames (gleicher und fremder Ursprung): SVG, SVG im Link, SVG-Link – innerhalb und über den Rand hinaus, ohne/mit SHIFT | Öffnet wie auf der Seite; Richtung stimmt; SHIFT schaltet „Link“ ↔ „Bild“ | ✅ |
| T34 | Beim Ziehen aus einem Frame heraus auf den Hinweis achten | Hinweis folgt dem Mauszeiger auch außerhalb des Frames, verschwindet nach dem Loslassen | ✅ |

## Ergebnisse Runde 1 (Version 1.0.0, 2026-11-03)

| Befund | Ursache | Behebung in 1.0.1 |
|---|---|---|
| SVG-Link öffnet keinen Tab | SVG-Links sind in Chrome nicht nativ ziehbar | Maus-Geste für SVG-Links (T22) |
| SHIFT schaltet bei verlinktem Bild nicht um | Chrome/Linux meldet SHIFT in Drag-Ereignissen nicht | Maus-Geste für verlinkte Bilder (T23) |
| „Lokal: localhost:3000 · 192.168.1.1“ unklar | Zwei Fälle in einer Zeile, Erwartung ungenau | Testseite: getrennte Zeilen mit genauer Erwartung |
| mailto-Test als Link fehlte | (mailto-Link stand in Abschnitt 1) | zusätzlicher Link mit sichtbarer Adresse + „mailto:…“-Text (T27) |
| Wunsch: aus Frames heraus ziehen | Jeder Frame hatte eigene, isolierte Geste | Abstimmung über den Service-Worker (T25, T26) |
| E-Mail-Adresse als Text | – | ✅ funktioniert |

## Ergebnisse Runde 2 (Version 1.0.1, 2026-11-03)

| Befund | Ursache | Behebung in 1.0.2 |
|---|---|---|
| ✅ T18 Drags innerhalb der Frames | – | – |
| ✅ T22 SVG-Links, ✅ T23 SHIFT bei Bildlinks | – | – |
| ❌ T25 Gleicher Ursprung: über den Rand öffnet immer im Hintergrund | `screenX` in Drag-Ereignissen unter Linux unbrauchbar | Gesten in Frames als Maus-Geste, Richtung aus Frame-Koordinaten |
| ❌ T25 Fremder Ursprung: über den Rand gar nicht | Chrome sperrt den Drop außerhalb eines fremden Frames | wie oben; im eingebauten Browser nur mit gleichem Ursprung prüfbar |
| Wunsch: SVG wie ein Bild öffnen, mit SHIFT | – | Inline-SVG als Bild (T28–T32) |

## Ergebnisse Runde 3 (Version 1.0.2, 2026-11-03)

| Befund | Ursache | Behebung in 1.0.3 |
|---|---|---|
| ✅ T25 aus Frames heraus, ✅ T27, ✅ T28, ✅ T30, ✅ T31, ✅ T32 | – | – |
| Hinweis bleibt am Frame-Rand hängen | Frame kann nur in seinem eigenen Bereich zeichnen | Übergeordneter Frame zeichnet den Hinweis außerhalb (T34) |
| ❌ T29 SVG im Link: keine SHIFT-Erkennung | Chrome startet einen nativen Drag des Links; dessen Startpunkt ist der Link, nicht die SVG → nur „Link“ erkannt | Laufende Maus-Geste hat Vorrang, nativer Drag wird abgebrochen |
| Test fehlte: SVG mit Link in Frames | – | Test-Frames erweitert (T33) |

## Ergebnisse Runde 4 (Version 1.0.3, 2026-11-03)

✅ T29, ✅ T33, ✅ T34 – keine neuen Befunde.
Nutzer bestätigt außerdem alle Grundtests T1–T17, T19–T21 und T24 als bestanden.

**Damit sind alle Tests des Testplans bestanden (T26 entfällt).**
