# TODO — pistes d'évolution

Ces points n'ont **pas** été réalisés dans la v1.0.0 afin de respecter
la contrainte "ne jamais modifier la logique métier". Ils sont listés
ici pour une itération future.

## Cohérence de données à faire trancher par le métier

- [ ] **Break-even Gantt vs Budget** : l'onglet Gantt annonce
      `Break-even An 17 (M204)`, mais le moteur budgétaire calcule un
      break-even à l'an **19**. Faire trancher par le PO lequel est
      correct, puis aligner l'autre.
- [ ] **Plafonds d'abonnés** : `generateData20Years` cappe à 2 850
      puis 3 300 abonnés (`Math.min(abonnes + …, 2850/3300)`). Vérifier
      que ces plafonds sont conformes au plan commercial à jour.

## Qualité de code

- [ ] Externaliser les énormes chaînes de `style="…"` inline générées dans
      `renderRiskMatrix`, `showRisksInCell`, `initCarbon` et
      `showCarbonDetail` vers des classes CSS dédiées (`styles/pages/risks.css`,
      `styles/pages/carbon.css`).
- [ ] Remplacer les `onclick` inline restants (`showRisksInCell`,
      `showCarbonDetail`) par de la délégation d'événements `[data-*]`,
      afin de ne plus avoir à exposer ces fonctions sur `window`.
- [ ] Réécrire les générateurs budgétaires mini-fiés
      (`generateData20Years`, `calculateAggregates`) en code lisible et
      commenté, après avoir ajouté des tests de non-régression
      champ-par-champ plus complets.
- [ ] Remplacer `innerHTML = '...'` par des helpers DOM sûrs (`createElement` +
      `textContent`) au moins pour les données venant de `risksData` /
      `carbonDetails`, ce qui faciliterait une future ouverture à
      l'édition utilisateur.
- [ ] Factoriser le rendu des fiches de risque (commun entre
      `renderRisks` et `showRisksInCell`).

## Fonctionnalités

- [ ] Ajouter un router basé sur `history.pushState` / `hashchange` afin
      que chaque page ait une URL partageable (`#/budget`, `#/gantt`, …).
- [ ] Permettre d'exporter les tableaux budgétaires en CSV/XLSX.
- [ ] Permettre l'impression PDF de chaque diagramme de Gantt.
- [ ] I18N : extraire tous les libellés français dans un dictionnaire
      `i18n/fr.json`, préparer le support EN.
- [ ] Ajouter un mode clair en complément du mode sombre actuel.
- [ ] Lazy-loader la vidéo promo (`<video preload="none">` + `IntersectionObserver`).

## Outillage

- [ ] Ajouter un workflow GitHub Actions qui exécute `npm test` et
      `npm run lint` sur chaque push.
- [ ] Ajouter Prettier avec une config alignée sur `.editorconfig`.
- [ ] Remplacer le logo SVG malformé par une version propre + fallback
      PNG, une fois qu'un design validé est disponible.
- [ ] Remplacer Chart.js CDN par une version vendor locale pour
      pouvoir fonctionner hors-ligne.
- [ ] Ajouter un rapport de couverture de tests (`node --test --experimental-test-coverage`).

## Documentation

- [ ] Capturer des captures d'écran (home, chaque page) dans
      `docs/screenshots/` et les référencer depuis `README.md`.
- [ ] Documenter le schéma exact d'un enregistrement `risksData` /
      `gantt` dans `ARCHITECTURE.md` (types + contraintes).
- [ ] Ajouter un guide de contribution (`CONTRIBUTING.md`) expliquant
      où ajouter un nouveau risque / une nouvelle tâche Gantt.
