# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and [Semantic Versioning](https://semver.org/).

## [Unreleased]
### Added
- FEAT-005: Developer Mode (/dev pagina) — alle vragen testbaar zonder assessment flow
- FEAT-006: Lab-omgeving Fase 1 — data structuur + 28 vragen
- FEAT-007: Resultaat splitsen in 3 stappen (/profiel → /methode → /tools)
- FEAT-008: Uitnodigingssysteem Lab met pre-assigned rollen
- FEAT-009: Vraag beoordelingssysteem in Developer Mode (1–5 sterren)
- FEAT-010: Lab-knop op landing page
- FEAT-011: Custom OG Image / share-kaart
- FEAT-012: Landing page optimalisatie (social proof + SEO)
- FEAT-013: Supabase backend + user accounts

### Fixed
- BUG-001: Voice werkt niet op Android — browser check + fallback UI
- BUG-002: Slepen/schuiven werkt niet op mobiel — touch event support

---

## [1.4.0] - 2026-05-03
### Added
- Score spectrum bar op resultaatpagina (kleurverloop + percentage per dimensie)
- Terugknop op /start pagina
- Dev shortcut /dev (eerste versie)

## [1.3.1] - 2026-05-03
### Changed
- Paginatitel gewijzigd naar 'TaalDNA Profiel'
- Versienummer zichtbaar in footer

## [1.3.0] - 2026-05-03
### Added
- O5: Woordwolk oefening (meet X-as: Analytisch ↔ Intuïtief)
- O6: Leerscenario oefening (meet Y-as: Sociaal ↔ Solo)
- Voortgangsbalk uitgebreid van 4 naar 6 stappen
- ExerciseInfluenceSection uitgebreid met 2 nieuwe rijen

### Fixed
- PolyCards vergelijkingspagina uitgeschakeld (prematuur)

## [1.2.0] - 2026-05-02
### Added
- Scoring algoritme (2D-profiel: X-as + Y-as)
- Resultaat-pagina met profielnaam en app-aanbevelingen
- Vergelijkingspagina /compare/taaldna

## [1.1.0] - 2026-05-02
### Added
- Assessment flow compleet (4 interactieve oefeningen)
- O1: Luisteroefening
- O2: Sorteeroefening
- O3: Drag-and-drop
- O4: Voice oefening

## [1.0.0] - 2026-05-02
### Added
- Eerste live versie op taaldna.vercel.app
- Landing page
- /start onboarding pagina
- Next.js 14 App Router setup (TypeScript + Tailwind CSS)
