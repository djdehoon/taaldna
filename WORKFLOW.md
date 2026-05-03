# PolyCards — Git & GitHub Workflow Standaard

> Versie 1.0 | Mei 2026  
> Geldt voor: commits, branches, issues, pull requests

---

## 1. Categorieën (types)

Gebruik altijd één van deze types — consistent door de hele workflow:

| Type | Gebruik |
|---|---|
| `feat` | Nieuwe functionaliteit |
| `fix` | Bugfix |
| `docs` | Alleen documentatie of logboek |
| `style` | Opmaak, geen logica |
| `refactor` | Code herstructurering zonder nieuwe functie |
| `test` | Tests toevoegen of aanpassen |
| `chore` | Build, dependencies, tools, config |
| `perf` | Performance verbetering |

---

## 2. Issues

### Naamgeving
```
[type] Korte beschrijving
```

### Voorbeelden
```
[feat] Add spaced repetition algorithm
[fix] Card flip broken on mobile
[chore] Upgrade React to v18
[docs] Update functionaliteitslogboek v1.1
```

### Labels
Maak in GitHub de volgende labels aan (zelfde als de types):
- 🟢 `feat`
- 🔴 `fix`
- 🔵 `docs`
- 🟡 `refactor`
- ⚪ `chore`
- 🟣 `perf`

---

## 3. Branches

### Naamgeving
```
type/korte-beschrijving-met-koppeltekens
```

### Voorbeelden
```
feat/spaced-repetition
fix/card-flip-mobile
docs/update-readme
chore/upgrade-react
```

### Regels
- Altijd vertrekken vanaf `main`
- Nooit direct op `main` werken
- Na merge → branch verwijderen

---

## 4. Commits

### Formaat
```
type(scope): beschrijving in gebiedende wijs

[optionele body: waarom deze wijziging?]

[optionele footer: Closes #xx]
```

### Regels
- Max **50 tekens** in de eerste regel
- **Gebiedende wijs** — beschrijft wat de commit doet, niet wat je ging doen
- **Geen punt** aan het einde
- Commit alleen **werkende, geteste code**
- Één commit = één logische wijziging

### Voorbeelden
```
feat(cards): add spaced repetition algorithm

fix(ui): correct button alignment on mobile

docs(changelog): update functionaliteitslogboek v1.0.2

chore(deps): upgrade React to v18.3

fix(cards): prevent duplicate cards on fast click

Added debounce of 300ms to the submit handler.
User could trigger card creation twice by rapid clicking.

Closes #42
```

---

## 5. Pull Requests

### Naamgeving
Zelfde als de commit message van de hoofdwijziging:
```
feat(cards): add spaced repetition algorithm
```

### Body bevat altijd
- Korte beschrijving van wat er veranderd is
- `Closes #xx` om het bijbehorende issue automatisch te sluiten
- Screenshot of testbewijs indien van toepassing

---

## 6. Het volledige workflow-ritme

```
1. Maak een Issue aan → [feat] Beschrijving (#42)
     ↓
2. Maak een branch → feat/beschrijving
     ↓
3. Schrijf code → test → werkt het?
     ├── ✅ JA → commit
     └── ❌ NEE → fix eerst
     ↓
4. Commit → feat(scope): beschrijving — Closes #42
     ↓
5. Pull Request → zelfde naam als commit
     ↓
6. Merge naar main → issue automatisch gesloten ✅
     ↓
7. Update functionaliteitslogboek
```

---

## 7. Wat NIET te doen

| ❌ Vermijden | ✅ In plaats daarvan |
|---|---|
| `fix stuff` | `fix(cards): correct flip animation` |
| `WIP` op main | WIP alleen op feature branch |
| Alles in één grote commit | Kleine, logische commits |
| Committen zonder testen | Altijd eerst testen |
| Toekomst beschrijven | Beschrijf wat er ín de commit zit |
| Issue vergeten te koppelen | Altijd `Closes #xx` in footer |

---

## 8. Scope-voorbeelden voor PolyCards

| Scope | Betekenis |
|---|---|
| `cards` | Flashcard logica |
| `ui` | Interface / styling |
| `auth` | Login / gebruikersbeheer |
| `data` | Opslag / database |
| `deploy` | Netlify / hosting config |
| `docs` | Documentatie / logboek |
