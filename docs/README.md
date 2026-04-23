# ArcAURA — version refactorée

Plateforme interne de pilotage du projet **ArcAURA** (mobilité électrique partagée
en Région AURA, horizon 2026–2045) : projections financières 20 ans, diagrammes
de Gantt, analyse de risques, cycle de vie carbone et supports de communication.

Cette version est une **restructuration intégrale** du fichier unique
`index.html` (1 495 lignes, ~7,5 Mo) situé à la racine du dépôt. Le fichier
original est **conservé tel quel** ; tout le code refactoré vit dans ce
répertoire `/refactored/`.

## ✨ Ce qui a changé

- **Assets binaires extraits** du HTML (vidéo MP4 5,3 Mo, affiche JPEG
  280 Ko, logo SVG) vers `src/assets/` — le HTML de la page passe
  de ~7,5 Mo à ~1 Ko.
- **CSS éclaté** en modules par composant et par page, avec `@import`
  depuis un unique `styles/main.css`.
- **JavaScript modulaire** (ES modules natifs) organisé en `core/`,
  `utils/`, `data/`, `pages/` — une responsabilité par fichier.
- **Pages HTML** séparées en fragments dans `src/pages/`, chargées
  dynamiquement au démarrage par `src/js/main.js`.
- **Tests** basiques sur l'utilitaire de formatage et sur le moteur
  budgétaire 20 ans (vérification de parité bit-à-bit avec la version
  originale).
- **Zéro modification de la logique métier** : tous les chiffres,
  formules, descriptions, KPIs et couleurs sont préservés caractère
  pour caractère (cf. `CHANGELOG.md`).

## 🚀 Lancer l'application

L'application utilise les ES modules et charge ses fragments HTML via
`fetch()` — elle nécessite donc un serveur HTTP local (ne fonctionne pas
en `file://`).

```bash
# Depuis /refactored
npm run serve          # http-server sur http://localhost:8080
# OU
python3 -m http.server --directory src 8080
```

Puis ouvrir <http://localhost:8080/>.

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
