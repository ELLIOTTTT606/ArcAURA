# Architecture

## Vue d'ensemble

ArcAURA est une **Single-Page Application** 100 % client, sans build, qui
expose 6 "pages" navigables depuis un menu d'accueil :

| Page            | Rôle                                                        |
| --------------- | ----------------------------------------------------------- |
| `home`          | Menu d'accueil (5 cartes)                                   |
| `budget`        | Projection financière 20 ans + graphique Chart.js           |
| `gantt`         | 5 diagrammes de Gantt (global + 4 phases)                   |
| `communication` | Vidéo promo + affiche tarifaire (avec zoom modal)            |
| `risks`         | Matrice de risques 5×5 + fiches détaillées pour 4 phases    |
| `carbon`        | Cycle de vie CO₂ (SVG doughnut + détails par étape)         |

## Arborescence

```
/
├── index.html                     Shell minimal (head + <main> + modal)
├── .nojekyll                      Désactive Jekyll pour GitHub Pages
├── assets/
│   ├── arcaura-logo.svg           Logo (était en data-URI SVG base64)
│   ├── affiche.jpg                Affiche tarifaire (était en base64 JPEG)
│   └── promo-video.mp4            Vidéo promo (était en base64 MP4 inline)
├── styles/
│   ├── main.css                   Point d'entrée CSS (@import + vars + media)
│   ├── base.css                   Reset, body, background animé
│   ├── layout.css                 .page, .container, header, h1
│   ├── components/
│   │   ├── back-button.css
│   │   ├── tabs.css
│   │   ├── info-box.css
│   │   ├── kpi.css
│   │   ├── table.css
│   │   ├── chart.css
│   │   ├── legend.css
│   │   └── modal.css
│   └── pages/
│       ├── home.css
│       ├── budget.css
│       ├── gantt.css
│       └── communication.css
├── pages/                         Fragments HTML, chargés via fetch()
│   ├── home.html
│   ├── budget.html
│   ├── gantt.html
│   ├── communication.html
│   ├── risks.html
│   └── carbon.html
├── js/
│   ├── main.js                    Bootstrap : charge les pages, câble les events
│   ├── core/
│   │   ├── navigation.js          navigate(), bindNavLinks()
│   │   ├── tabs.js                attachTabs()
│   │   └── modal.js               openModal(), closeModal(), bindModal()
│   ├── utils/
│   │   ├── format.js              fmt(), gc()
│   │   └── dom.js                 $(), $$(), setHTML()
│   ├── data/
│   │   ├── budget-actions.js      Détails mensuels (actionDetails)
│   │   ├── gantt/
│   │   │   ├── labels.js          Libellés des catégories Gantt
│   │   │   ├── global.js          Vue globale 20 ans (gGlobal)
│   │   │   ├── phase1.js          Données Gantt phase 1 (gP1)
│   │   │   ├── phase2.js          Données Gantt phase 2 (gP2)
│   │   │   ├── phase3.js          Données Gantt phase 3 (gP3)
│   │   │   └── phase4.js          Données Gantt phase 4 (gP4)
│   │   ├── risks/
│   │   │   ├── risks-data.js      Catalogue des risques par phase
│   │   │   └── risks-mapping.js   Coordonnées (prob × impact) par risque
│   │   └── carbon-data.js         Phases + détails du cycle de vie carbone
│   └── pages/
│       ├── budget.js              generateData20Years, calculateAggregates, initBudget
│       ├── gantt.js               renderGantt, renderStats, initGantt
│       ├── communication.js       initComm (branche la source vidéo)
│       ├── risks.js               renderRiskMatrix, renderRisks, showRisksInCell, initRisks
│       └── carbon.js              initCarbon, renderCarbonCircle, showCarbonDetail
├── tests/
│   ├── format.test.mjs
│   └── budget.test.mjs
├── docs/                          README, ARCHITECTURE, CHANGELOG, TODO
├── .editorconfig
├── .eslintrc.json
├── .gitignore
└── package.json
```

## Flux de démarrage

1. `index.html` charge `styles/main.css` (qui `@import` tous les sous-CSS)
   et `js/main.js` en `type="module"`.
2. `main.js` :
   - `fetch()` les 6 fragments de `pages/*.html`, les concatène dans `#app`.
   - Expose `showRisksInCell` et `showCarbonDetail` sur `window` (ces fonctions
     sont invoquées depuis des `onclick` inline générés dans les templates HTML —
     préservation volontaire du comportement original).
   - Appelle `bindNavLinks()` (délégation d'événements `[data-nav]`) et
     `bindModal()` (overlay, Escape, `[data-modal]`).
   - Navigue vers `home`.
3. Chaque navigation vers `budget|gantt|comm|risks|carbon` déclenche,
   **une seule fois**, l'initialiseur correspondant qui construit
   dynamiquement les tableaux / graphiques de la page.

## Contrat d'interface (cross-module)

| Expose                       | Lieu                         | Consommé par                             |
| ---------------------------- | ---------------------------- | ---------------------------------------- |
| `navigate(pageId)`           | `core/navigation.js`         | `core/navigation.js` (handlers)           |
| `attachTabs(id)`             | `core/tabs.js`               | toutes les pages avec onglets             |
| `openModal / closeModal`     | `core/modal.js`              | `bindModal` (handler interne)             |
| `fmt(n)` / `gc(n)`           | `utils/format.js`            | `pages/budget.js`                         |
| `generateData20Years`        | `pages/budget.js`            | tests                                    |
| `calculateAggregates`        | `pages/budget.js`            | tests                                    |
| `init{Budget,Gantt,Comm,…}`  | `pages/*.js`                 | `core/navigation.js`                      |
| `showRisksInCell`            | `pages/risks.js`             | `window` (via `onclick` inline HTML)      |
| `showCarbonDetail`           | `pages/carbon.js`            | `window` (via `onclick` inline HTML / SVG)|

## Pourquoi ES modules et pas un bundler ?

Le projet est volontairement **build-less** :

- Aucune dépendance npm à installer pour le rendu (Chart.js reste en CDN,
  comme l'original).
- Le code reste lisible à l'identique dans le navigateur.
- Tout serveur statique (http-server, `python -m http.server`, Nginx)
  sert l'application sans étape de compilation.

## Choix de préservation

Voir `CHANGELOG.md` pour la liste exhaustive des points où j'ai volontairement
gardé le code original inchangé malgré ses défauts (doublon `initRisks`,
HTML/CSS inline dans les template strings, handlers `onclick` dans le HTML
généré, etc.) afin de garantir une parité comportementale à 100 %.
