# ArcAURA

Plateforme interne de pilotage du projet **ArcAURA** (mobilité électrique
partagée en Région AURA, horizon 2026–2045) : projections financières
20 ans, diagrammes de Gantt, analyse de risques, cycle de vie carbone
et supports de communication.

Cette version est une **restructuration intégrale** du fichier unique
`index.html` d'origine (1 495 lignes, ~7,5 Mo) en une arborescence
modulaire à la racine du dépôt, sans modification de la logique métier
(cf. [`CHANGELOG.md`](CHANGELOG.md)).

## ✨ Ce qui a changé depuis la version monolithique

- **Assets binaires extraits** du HTML (vidéo MP4 5,3 Mo, affiche JPEG
  280 Ko, logo SVG) vers `assets/` — le HTML de la page passe
  de ~7,5 Mo à ~1 Ko.
- **CSS éclaté** en modules par composant et par page, avec `@import`
  depuis un unique `styles/main.css`.
- **JavaScript modulaire** (ES modules natifs) organisé en `js/core/`,
  `js/utils/`, `js/data/`, `js/pages/` — une responsabilité par fichier.
- **Pages HTML** séparées en fragments dans `pages/`, chargées
  dynamiquement au démarrage par `js/main.js`.
- **Tests** basiques sur l'utilitaire de formatage et sur le moteur
  budgétaire 20 ans (parité bit-à-bit vérifiée avec la version
  d'origine).

## 🚀 Lancer l'application en local

L'application utilise les ES modules et charge ses fragments HTML via
`fetch()` — elle nécessite donc un serveur HTTP local (ne fonctionne pas
en `file://`).

```bash
# depuis la racine du repo
npm run serve          # http-server sur http://localhost:8080
# OU
python3 -m http.server 8080
```

Puis ouvrir <http://localhost:8080/>.

## 🌐 Hébergement sur GitHub Pages

Le fichier `.nojekyll` à la racine du repo désactive le traitement
Jekyll par défaut de GitHub Pages (nécessaire pour que tous les
fichiers des sous-dossiers `js/`, `styles/`, `pages/`, `assets/`
soient bien servis).

**Pour activer GitHub Pages :**

1. **Settings → Pages**
2. **Source** : *Deploy from a branch*
3. **Branch** : `main`, **folder** : `/ (root)`
4. Sauvegarder

L'URL devient alors `https://<utilisateur>.github.io/ArcAURA/`.

## 🧪 Lancer les tests

```bash
npm test               # node --test tests/*.test.mjs
```

Aucune dépendance à installer : les tests utilisent le runner natif de
Node.js (≥ 18).

## 🧹 Lint

```bash
npm run lint
```

## 📚 Documentation détaillée

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — arborescence, modules, flux de
  données et contrat des interfaces
- [`CHANGELOG.md`](CHANGELOG.md) — liste exhaustive des transformations
  appliquées et des points de préservation volontaire
- [`TODO.md`](TODO.md) — pistes d'évolution future (non réalisées)
