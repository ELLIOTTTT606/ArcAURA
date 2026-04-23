// Risk catalog for each phase (verbatim from original index.html l.625-1048).
// Business content — do NOT edit descriptions, KPIs or actors.

export const risksData = {
  p1: [
    {
      title: "Échec consultation citoyenne",
      level: "critical",
      desc: "Le taux d'engagement qualifié reste inférieur à 42 %. La demande réelle ne justifie pas le passage à la phase suivante.",
      kpis: [
        "Taux engagement qualifié ≥ 42 %",
        "Intention d'abonnement ferme ≥ 15 % des intéressés",
        "Consentement à payer vérifié : ≥ 60 % acceptent 140–180 €/mois"
      ],
      actors: "Galadrim, Communes, COPIL"
    },
    {
      title: "Blocage accord-cadre",
      level: "elevated",
      desc: "Les partenaires ne convergent pas sur la répartition des investissements ou les fonds de garantie ne sont pas mobilisables avant M4.",
      kpis: [
        "Répartition validée : Région 43 %, Communes 24 %, Jean Lain 25 %, Autres 8 %",
        "Fonds de garantie par acteur de 500 000 € mobilisables M4",
        "Taux présence comité ≥ 85 %"
      ],
      actors: "Jean Lain, Région AURA, Communes"
    },
    {
      title: "Retards UTAC / DREAL",
      level: "critical",
      desc: "Le dossier réglementaire n'est pas déposé à temps ou la réponse UTAC dépasse le calendrier prévu, bloquant l'homologation.",
      kpis: [
        "Dossier complet déposé semaine 8 maximum",
        "Réponse UTAC obtenue avant semaine 18",
        "Coût homologation unitaire ≤ 1 800 €"
      ],
      actors: "UTAC / DREAL, COPIL"
    },
    {
      title: "Sous-capacité NovumTech",
      level: "elevated",
      desc: "NovumTech ne dispose pas d'un effectif ou d'une certification suffisante pour respecter les délais de retrofit.",
      kpis: [
        "Plan recrutement validé : +4 techniciens habilités avant M3",
        "Certification qualité ISO 9001 obtenue ou en cours",
        "Temps cycle unitaire ≤ 12 jours ouvrés"
      ],
      actors: "NovumTech"
    },
    {
      title: "Dérive budgétaire études parking",
      level: "elevated",
      desc: "Les études techniques de dimensionnement parking dépassent le budget initial prévu.",
      kpis: [
        "Écart cumulé ≤ 8 % à mi-phase",
        "Réserve de sécurité de 15 % (soit 12 750 €) non entamée avant M4"
      ],
      actors: "Eiffage, COPIL"
    },
    {
      title: "Refus subventions ADEME",
      level: "elevated",
      desc: "ADEME rejette le dossier de subvention. Le financement public initial est compromis.",
      kpis: [
        "Dossier déposé avant vague 1 de 2025",
        "Réponse positive reçue avant M5",
        "Plan B activable : financement BPI complémentaire identifié si partiel"
      ],
      actors: "ADEME, COPIL, Région AURA"
    },
    {
      title: "Disponibilité terrain sécurisée",
      level: "moderate",
      desc: "Le terrain n'est pas disponible ou le coût foncier dépasse les prévisions.",
      kpis: [
        "Promesse réciproque signée M2",
        "Permis construire déposé M3",
        "Coût foncier ≤ 180 €/m² (moyenne haute de ce qui se fait en AURA)"
      ],
      actors: "Communes, Région AURA"
    }
  ,
    {
      title: "Retard livraison mobilier bureaux",
      level: "moderate",
      desc: "Les équipements pour les bureaux du COPIL sont livrés avec retard, perturbant légèrement l'installation.",
      kpis: [
        "Commande 8 semaines avant installation",
        "Fournisseur avec délai garanti < 6 semaines",
        "Location temporaire si retard > 2 semaines"
      ],
      actors: "COPIL, Fournisseurs"
    },
    {
      title: "Difficulté recrutement stagiaires support",
      level: "moderate",
      desc: "Le recrutement de stagiaires pour le support administratif prend plus de temps que prévu.",
      kpis: [
        "Campagne recrutement 3 mois avant besoin",
        "Partenariats avec 2+ écoles locales",
        "Stage rémunéré attractif"
      ],
      actors: "COPIL, RH"
    }],
  p2: [
    {
      title: "Échec homologation UTAC lot 1",
      level: "critical",
      desc: "Le certificat d'homologation du lot 1 n'est pas délivré à temps. Les tests crash et émissions ne sont pas validés du premier coup, entraînant des retards sur tous les lots suivants.",
      kpis: [
        "Certificat homologation lot 1 délivré avant 22/07",
        "Tests crash et émissions validés du premier coup",
        "Coût homologation réel ≤ 95 000 € pour 6 lots"
      ],
      actors: "UTAC / DREAL, NovumTech"
    },
    {
      title: "Retards fournisseurs bornes",
      level: "elevated",
      desc: "Schneider Electric ne livre pas les bornes selon le calendrier. L'installation complète est compromise.",
      kpis: [
        "Livraison échelonnée : 100 bornes M7, 100 bornes M8",
        "Installation complète avant le 5 septembre",
        "Mise en service réussis ≥ 95 %"
      ],
      actors: "Schneider Electric, Eiffage"
    },
    {
      title: "Défauts qualité retrofit",
      level: "critical",
      desc: "Les véhicules retrofités présentent des défauts de performance batterie ou de conformité, compromettant la livraison et la confiance client.",
      kpis: [
        "Certificat homologation lot 1 délivré avant 22/07",
        "Écart performance batterie ≤ 5 % entre véhicules",
        "Conformité checklist ≥ 98 %"
      ],
      actors: "NovumTech, UTAC"
    },
    {
      title: "Sous-performance solaire",
      level: "elevated",
      desc: "Le rendement des panneaux solaires est inférieur aux projections. L'autonomie énergétique du site est compromise.",
      kpis: [
        "Rendement panneaux solaires mesurés à 20 %",
        "Taux pannes onduleurs ≤ 2 %"
      ],
      actors: "EDF, Eiffage"
    },
    {
      title: "Désorganisation des 7 entreprises intervenantes",
      level: "elevated",
      desc: "Les 7 entreprises sur le chantier ne sont pas coordonnées, entraînant des retards et des malfaçons.",
      kpis: [
        "Réunion coordination hebdomadaire tenue avec présence ≥ 90 %",
        "Planning partagé mis à jour quotidien",
        "Taux respect jalons intermédiaires ≥ 85 %"
      ],
      actors: "Eiffage, COPIL, Schneider, EDF, NovumTech"
    },
    {
      title: "Dysfonctionnements plateforme",
      level: "elevated",
      desc: "La plateforme ArcAURA Connect présente des bugs ou des performances insuffisantes lors du beta public.",
      kpis: [
        "Temps réservation moyen ≤ 3 minutes",
        "Intégration API TCL/SNCF fonctionnelle M8",
        "Conformité RGPD validée audit externe"
      ],
      actors: "Galadrim, TCL, SNCF"
    },
    {
      title: "Sous-effectif techniciens habilités",
      level: "elevated",
      desc: "Le nombre de techniciens habilités est insuffisant pour assurer la maintenance et le déploiement en temps.",
      kpis: [
        "Quatre technicien(ne)s recruté(e)s et habilité(e)s avant M6",
        "Disponibilité équipe ≥ 90 % (un absent maximum simultané)",
        "Turnover ≤ 0 sur Phase 2"
      ],
      actors: "NovumTech, COPIL"
    }
  ,
    {
      title: "Vandalisme léger sur site pilote",
      level: "moderate",
      desc: "Actes mineurs (graffitis, dégradations légères) nécessitant interventions de nettoyage.",
      kpis: [
        "Vidéosurveillance 24/7 opérationnelle",
        "Intervention nettoyage < 48h",
        "Budget contingence 5000€ par site"
      ],
      actors: "Communes, Eiffage"
    },
    {
      title: "Incompatibilité mineure logiciels",
      level: "moderate",
      desc: "Problèmes mineurs entre logiciels de gestion et systèmes comptables.",
      kpis: [
        "Tests intégration avant déploiement",
        "Support technique < 24h",
        "Procédure manuelle de secours"
      ],
      actors: "Galadrim, DSI"
    },
    {
      title: "Bruit chantier générant plaintes",
      level: "moderate",
      desc: "Travaux générant du bruit entraînant quelques plaintes de riverains.",
      kpis: [
        "Charte chantier à faibles nuisances",
        "Travaux bruyants 8h-18h uniquement",
        "Réunion information riverains"
      ],
      actors: "Eiffage, Communes"
    }],
  p3: [
    {
      title: "Réduction aides ADEME",
      level: "elevated",
      desc: "ADEME réduit ou supprime les aides pour les vagues suivantes. Le financement public diminue significativement.",
      kpis: [
        "Dossier déposé avant vague 1 de 2025",
        "Anticipation réduction : renegociation partenaires M24",
        "Plan B financement validé avec un crédit BPI ≤ 5,5 % d'intérêts"
      ],
      actors: "ADEME, COPIL, Région AURA"
    },
    {
      title: "Échec acquisition abonnés",
      level: "critical",
      desc: "Le nombre d'abonnés acquis mensuellement reste bien en dessous des objectifs. Le modèle commercial n'est pas validé.",
      kpis: [
        "Acquisition mensuelle moyenne ≥ 95 abonnés (2 500 / 26 mois)",
        "Mix abonnements : 40 % formule médiane 171 €, 25 % premium 242 €",
        "Taux occupation flotte ≥ 70 % en fin Phase 3"
      ],
      actors: "COPIL, Galadrim, Communes"
    },
    {
      title: "Pénurie batteries Verkor",
      level: "elevated",
      desc: "Le fournisseur de batteries ne peut pas garantir l'approvisionnement sur la durée, menaçant la production de retrofit.",
      kpis: [
        "Contrat approvisionnement sécurisé sur 36 mois",
        "Stock stratégique ≥ 60 jours consommation",
        "Application de pénalités en cas de retard > 2 semaines"
      ],
      actors: "Verkor, NovumTech"
    },
    {
      title: "Impasses foncières communales",
      level: "critical",
      desc: "Les communes ne cèdent pas le foncier nécessaire pour les sites des vagues 2 et 3. Le déploiement territorial est bloqué.",
      kpis: [
        "Vague 1 (5 sites) : conventions signées avant M12",
        "Vague 2 (5 sites) : conventions signées avant M20",
        "Vague 3 (5 sites) : conventions signées avant M28"
      ],
      actors: "Communes (Givors, Oullins, Caluire, Grenoble, Fontaine, Échirolles, Meylan), Région AURA"
    },
    {
      title: "Récession économique",
      level: "elevated",
      desc: "Une récession nationale réduit la demande de mobilité et le pouvoir d'achat des particuliers, impactant les abonnements.",
      kpis: [
        "Taux souscription maintenu ≥ 80 % objectif même si PIB < -1 %",
        "Élasticité prix mesurée : -10 % tarif = +8 % volume"
      ],
      actors: "COPIL, Galadrim"
    },
    {
      title: "Retrait Région AURA",
      level: "critical",
      desc: "La Région AURA se retire du partenariat politique et financier. Le soutien institutionnel disparaît.",
      kpis: [
        "Convention annuelle signée sécurisant fonds jusqu'à M36",
        "Soutien politique : ≥ 3 élus référents engagés",
        "Financement alternatif identifié"
      ],
      actors: "Région AURA, COPIL"
    },
    {
      title: "Accident grave médiatisé",
      level: "moderate",
      desc: "Un accident impliquant un véhicule retrofité est médiatisé, provoquant une crise de confiance publique.",
      kpis: [
        "Contrôles sécurité avec 100 % des véhicules contrôlés tous les 6 mois",
        "Protocole crise média validé et testé"
      ],
      actors: "NovumTech, COPIL, Communes"
    }
  ,
    {
      title: "Panne prolongée borne isolée",
      level: "moderate",
      desc: "Une borne tombe en panne prolongée par manque de pièces détachées.",
      kpis: [
        "Stock pièces pour 10% du parc",
        "Réparation moyenne < 72h",
        "Redondance 15+ bornes par site"
      ],
      actors: "Schneider, Maintenance"
    },
    {
      title: "Erreur facturation client isolée",
      level: "moderate",
      desc: "Erreurs ponctuelles dans la facturation automatique des abonnements.",
      kpis: [
        "Taux erreur < 0.5%",
        "Détection automatique anomalies",
        "Correction sous 48h"
      ],
      actors: "Galadrim, Service client"
    }],
  p4: [
    {
      title: "Échec structuration Holding",
      level: "critical",
      desc: "La création du Holding ArcAURA est retardée ou bloquée par des désaccords entre actionnaires. La pérennisation juridique du projet est compromise.",
      kpis: [
        "Holding constitué avant M6 de la Phase 4",
        "Accord actionnariat signé par Jean Lain, Région AURA et NovumTech",
        "Capital initial ≥ 200 K € libéré avant fin M8"
      ],
      actors: "Jean Lain, Région AURA, NovumTech, COPIL"
    },
    {
      title: "Sous-performance industrialisation retrofit",
      level: "elevated",
      desc: "Le passage à l'industrialisation ne réduit pas suffisamment le coût unitaire. Le seuil de rentabilité n'est pas atteint.",
      kpis: [
        "Coût unitaire retrofit réduit de ≥ 25 % par rapport à Phase 2",
        "Capacité ligne 1 ≥ 180 véhicules / an",
        "Taux rebut ≤ 3 %"
      ],
      actors: "NovumTech"
    },
    {
      title: "Défaut maintenance 24/7",
      level: "critical",
      desc: "Le prestataire de maintenance externalisée ne garantit pas la disponibilité en nuit ou en week-end. Les clients sont bloqués.",
      kpis: [
        "Disponibilité maintenance ≥ 99 % sur 24h/7j",
        "Temps moyen résolution panne ≤ 4 heures",
        "Satisfaction client maintenance ≥ 4,2 / 5"
      ],
      actors: "Prestataire ext., NovumTech, COPIL"
    },
    {
      title: "Échec expansion franchise",
      level: "critical",
      desc: "Aucune région ne souscrit à la licence de franchise. Le modèle de duplication nationale reste théorique.",
      kpis: [
        "≥ 1 région partenaire identifiée et engagée avant M26",
        "Franchise Book validé avec retour positif ≥ 3 régions",
        "Contrat licence signé Occitanie avant M30"
      ],
      actors: "Holding ArcAURA, Région Occitanie, Région PACA, Région Nouvelle-Aquitaine"
    },
    {
      title: "Régression qualité Smart-Grid",
      level: "elevated",
      desc: "Le système de gestion intelligente du réseau solaire présente des instabilités, compromettant l'optimisation énergétique.",
      kpis: [
        "Taux couverture solaire ≥ 85 % des besoins de charge",
        "Écart production / consommation ≤ 10 %",
        "Stabilité réseau validée sur 6 mois consécutifs"
      ],
      actors: "EDF, Schneider Electric, NovumTech"
    },
    {
      title: "Obsolescence technologique",
      level: "elevated",
      desc: "Les véhicules retrofités arrivent en fin de vie plus rapidement que prévu ou une nouvelle génération de bornes rend l'infrastructure obsolète.",
      kpis: [
        "Durée de vie vehicule retrofité ≥ 8 ans",
        "Fonds renouvellement ≥ 500 K € constitué avant M52",
        "Veille technologique formalisée trimestriellement"
      ],
      actors: "NovumTech, Holding ArcAURA"
    },
    {
      title: "Piratage / Faille de sécurité app",
      level: "elevated",
      desc: "Une attaque cyber compromet les données personnelles des utilisateurs ou perturbe le système de réservation.",
      kpis: [
        "Audit de sécurité externe validé avant mise en production",
        "Conformité RGPD maintenue avec 0 incident majeur",
        "Plan de continuité activé en < 2 heures en cas d'intrusion"
      ],
      actors: "Galadrim, Holding ArcAURA"
    },
    {
      title: "Blocage certification ISO",
      level: "moderate",
      desc: "L'organisme de certification refuse ou retarde la certification ISO 9001, bloquant la crédibilité pour les régions partenaires.",
      kpis: [
        "Audit interne préparatoire ≥ 2 mois avant l'audit externe",
        "Zéro non-conformité majeure lors de l'audit",
        "Certification obtenue avant M65"
      ],
      actors: "Holding ArcAURA, Organisme de certification"
    }
  ,
    {
      title: "Défaillance fournisseur consommables",
      level: "moderate",
      desc: "Un fournisseur de consommables fait défaut ponctuellement.",
      kpis: [
        "Double sourcing consommables critiques",
        "Stock tampon 30 jours minimum",
        "Contrat secours surcoût < +20%"
      ],
      actors: "Holding, Achats"
    },
    {
      title: "Absence personne clé non remplacée",
      level: "moderate",
      desc: "Absence prolongée sans remplacement ralentissant certaines décisions.",
      kpis: [
        "Plan succession pour postes clés",
        "Binôme sur fonctions critiques",
        "Formation croisée 100% managers"
      ],
      actors: "Holding, RH"
    }]
};
