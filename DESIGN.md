# Design System: Bakermester Harepus — Nettbutikk i forfall
**Project ID:** easter-egg-hunt (lokal webapp, ikke Stitch)

## 1. Visual Theme & Atmosphere

Nettbutikken skal føles som en **gammel, overopphetet kiosk-skjerm**: pastellfarger som har **bleknet**, gleden er der fortsatt (påske, bakverk), men **systemet mørkner** — glitch, hopp i pris, støy i bildet og små bevegelser som om **hyllene synker** og **strømmen er ustabil**. Atmosfæren er **lekende katastrofe**, ikke skummel: brukeren forstår at det er med vilje, men **føler** forfall gjennom langsom drift, CRT-aktig flimmer, vignett og «mugg»-grønne hint i kantene.

**Nøkkelord:** bleknet pastell, ustabil strøm, sunket layout, digital rot, støy, forsiktig humor.

## 2. Color Palette & Roles

| Beskrivelse | Hex | Rolle |
|-------------|-----|--------|
| **Bleket syrinlys** | `#FAF5FF` | Hovedbakgrunn; «linoleum under lys som har stått på for lenge» |
| **Gulnet smørfyll** | `#FEF08A` | Header / knapper; optimisme som er i ferd med å sprekke |
| **Mørk påskelilla** | `#6B21A8` | Primær overskrift og ikoner; fortsatt lesbar autoritet |
| **Rustrosa alarm** | `#DB2777` | Priser, advarsler, utsolgt; «noe er galt» uten ren rød fare |
| **Mugggrønn kant** | `#4D7C0F` (lav opasitet) | Subtile kanter / badges som hint om «noe vokser feil sted» |
| **Dyp plomme footer** | `#581C87` | Bunntekst; tyngde og «butikken ligger under» |
| **Kritisk rød** | `#DC2626` | Stengt, feil, streket tekst |

## 3. Typography Rules

- **Font:** System / Inter (allerede i layout) — **ikke** bytte til dekorativ display-font; kontrasten mot det kaotiske innholdet skal komme fra **bevegelse og støy**, ikke fra uleselig type.
- **Overskrifter:** fet, lilla (`#6B21A8` eller tilsvarende Tailwind `purple-800/700`), med **glitch-klasser** sparsomt på viktigste tittel — ikke på alt.
- **Brødtekst:** normal vekt, `blue-600` / `green-600` med **corrupt**-klasser for «digital feil» i ordavstand.
- **Små etiketter:** `text-xs`, badges med tynn kant (`border-2`) i gul/rosa for «merkelapp som løsner».

## 4. Component Stylings

- **Knapper:** Avrundet (`rounded`), **gul gradient** som hoved CTA; **animate-button-glitch** / subtil skalering for «knappen vet ikke helt om den skal trykkes».
- **Kort / produktrader:** Lys grønn/rosa bakgrunn, **gul kant**; **fast men liten rotasjon per produkt** (deterministisk fra ID, ikke `Math.random()` i render) for «ting står skjevt i hylla».
- **Hero:** Rosa panel med **vignett + støy** (`bg-static`); bilde med **hue/contrast** og overlay som signaliserer forfall.
- **Globale lag:** `.decay-atmosphere` — vignett + svake scanlines + valgfritt **decay-drift** på flytende elementer for «alt synker litt».

## 5. Layout Principles

- **Luft:** `container mx-auto` og `p-3`/`p-4` beholdt; forfall skal ikke bli rotete **tap** av struktur, men **urolig** struktur.
- **Flytende promo-kort:** Absolutt posisjon med **lange fall-animasjoner** og **decay-drift** slik at de føles som løs papirlapper i trekk.
- **Fast plasserte feilmeldinger:** `fixed` hjørner med **float** + lav opasitet for «toast som ikke dør».
- **Tilgjengelighet:** `prefers-reduced-motion` reduserer eller slår av repeterende animasjoner.

## 6. Motion & Decay (tokens)

- **shake:** Kort, hele siden — sjelden intervall (beholdt).
- **decay-drift:** Langsom `translate` + liten `rotate` — «hylla setter seg».
- **power-flicker:** Svak opacity-puls på header — «strømmen».
- **vignette:** Inset skygge på rot-container — «sikt felt inn».
- **scanlines:** Repeterende gradient-overlay — gammel skjerm.

Disse beskrivelsene er **kilde til prompting** videre (Stitch / redesign) og **matcher** CSS-klassene i `app/globals.css`.
