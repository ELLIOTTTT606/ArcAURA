# Changelog

## 1.0.0 — Refactor initial

### Transformations structurelles

- **Découpage du monolithe** : `/index.html` (1 495 lignes, ~7,5 Mo)
  → 40+ fichiers organisés sous `/refactored/src/` (`styles/`, `pages/`,
  `js/core/`, `js/utils/`, `js/data/`, `js/pages/`, `assets/`).
- **Extraction des assets binaires embarqués** :
  - `src/assets/promo-video.mp4` (5,3 Mo) — était une chaîne base64 de
    7,1 M caractères inline dans `initComm()` (ligne 612).
  - `src/assets/affiche.jpg` (280 Ko) — était une data-URI inline
    dans la page Communication (ligne 305, ~373 K caractères).
  - `src/assets/arcaura-logo.svg` — était une data-URI inline
    (ligne 157). Contenu conservé tel quel (SVG volontairement
    malformé dans l'original, avec `onerror` de repli).
  > Gain : le shell HTML passe de ~7,5 Mo à ~1 Ko.
- **CSS éclaté** en 14 fichiers, avec `main.css` comme point d'entrée
  regroupant les `@import`, les variables CSS (`:root`) et la media query
  responsive.
- **JavaScript modulaire** (ES modules) : séparation `core/` (navigation,
  onglets, modal), `utils/` (format, DOM helpers), `data/` (structures
  métier pures), `pages/` (logique par écran).
- **HTML fragmenté** : chaque page dans `src/pages/*.html`, chargée au
  démarrage par `main.js` via `fetch()`.
- **Handlers inline `onclick` remplacés** par des attributs `data-nav`
  et `data-modal` + délégation d'événements — sauf les handlers
  `onclick="showRisksInCell(...)"` et `onclick="showCarbonDetail(...)"`
  générés dynamiquement dans les templates, préservés volontairement
  (cf. section "Préservations volontaires").

### Nettoyages sans impact fonctionnel

- **Doublon `initRisks`** : l'original déclarait cette fonction deux fois
  (lignes 1091 puis 1159). En JS, la seconde gagne. Seule la seconde,
  plus complète (matrice + ré-render sur changement d'onglet), est
  conservée dans `src/js/pages/risks.js`. Comportement exécuté identique.
- **`renderStats('g-ov-stats', …)`** : le libellé de la cinquième stat
  dans `initGantt` est préservé à `{l:'Break-even', v:'An 17'}` tel que
  dans l'original.
- **Formattage** : indentation cohérente (2 espaces), guillemets simples
  en JS, `;` systématiques, `end_of_line = lf`.
- **Guillemets CSS** : unifiés (simples) dans les fichiers externalisés ;
  les chaînes CSS-en-template-string dans le JS sont laissées telles quelles.

### Tests ajoutés

- `tests/format.test.mjs` : 5 cas sur `fmt()` et `gc()`.
- `tests/budget.test.mjs` : 7 cas vérifiant que `generateData20Years()`
  produit bien 240 mois contigus, avec les phases attendues, et que
  `calculateAggregates()` retourne un cumul qui est bien la somme
  courante des résultats nets.

> Vérification de parité : un diff programmatique champ-par-champ
> sur les 240 × 14 valeurs générées par l'ancien et le nouveau
> `generateData20Years + calculateAggregates` donne **0 différence**.

### Configuration ajoutée

- `.editorconfig` — conventions de fichier
- `.gitignore` — exclusions standard
- `.eslintrc.json` — règles ES 2022 minimalistes
- `package.json` — scripts `serve`, `test`, `lint`

### Préservations volontaires (non modifiées malgré le refactor)

Ces points ont été **gardés à l'identique** pour respecter la règle
"ne jamais modifier la logique métier" :

1. **Break-even annoncé en Gantt** (`An 17`) ≠ break-even calculé par le
   moteur budgétaire (An 19). Incohérence présente dans l'original ;
   non corrigée ici.
2. **SVG logo malformé** (`xmlns]=`, `y="20" y="90"`, `N00f5ff`, etc.) :
   conservé tel quel ; reste caché par le handler `onerror` existant.
3. **Styles inline dans le JavaScript** (grosses chaînes `h += '<div style="…">…'`
   dans `renderRiskMatrix`, `renderRisks`, `showRisksInCell`, `initCarbon`,
   `renderCarbonCircle`, `showCarbonDetail`) : préservés mot-à-mot pour
   garantir un rendu pixel-identique. Une externalisation en CSS est
   documentée dans `TODO.md`.
4. **Handlers `onclick` inline dans le HTML généré** par la matrice de
   risques et le doughnut carbone : préservés, ce qui nécessite d'exposer
   `showRisksInCell` et `showCarbonDetail` sur `window` depuis `main.js`.
5. **Mélange d'écritures** (expressions mini-fiées des générateurs budget,
   versus code plus lisible dans les risques et le carbone) : conservé
   tel quel dans chaque module.
6. **Données chiffrées** (budgets, actions mensuelles, risques, KPIs,
   tonnages carbone, coordonnées de la matrice) : extraites **verbatim**
   depuis `index.html` vers `src/js/data/` — aucun caractère modifié.
7. **Affiche nommée `.jpg`** (et non `.png` comme dans le HTML original) :
   les bytes décodés depuis la base64 sont un JPEG (magic `/9j/`). Le
   renommage ne modifie aucun comportement visible — le navigateur affiche
   le même pixel.
