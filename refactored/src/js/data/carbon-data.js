// Carbon lifecycle data (verbatim from original index.html l.1320-1413).
// Business content — do NOT edit tonnages, labels or icons.

export const carbonPhases = [
  { label: 'Approvisionnement',     value: 12,   color: '#9c27b0', icon: '🚚'  },
  { label: 'Démontage Thermique',   value: 28,   color: '#ff5722', icon: '🔧'  },
  { label: 'Retrofit NovumTech',    value: 199,  color: '#4caf50', icon: '🔋'  },
  { label: 'Infrastructure Eiffage', value: 1260, color: '#ff9800', icon: '🏗️' },
  { label: 'Déploiement Réseau',    value: 45,   color: '#2196f3', icon: '🌐'  },
  { label: 'Usage 10 ans',          value: 47,   color: '#ffca28', icon: '⚡'  },
];

export const endOfLifeCreditT = 127;

export const carbonDetails = [
  { t: '🚚 Approvisionnement (12 t)', items: [
    { l: 'Transport 50 véhicules Jean Lain', v: '10 t' },
    { l: 'Contrôle qualité', v: '2 t' },
  ]},
  { t: '🔧 Démontage Thermique (28 t)', items: [
    { l: 'Démontage 50 moteurs', v: '15 t' },
    { l: 'Retrait réservoirs', v: '8 t' },
    { l: 'Transport Excoffier', v: '5 t' },
  ]},
  { t: '🔋 Retrofit NovumTech (199 t)', items: [
    { l: 'Batteries 45 kWh', v: '137 t' },
    { l: 'Moteurs électriques', v: '23 t' },
    { l: 'Électronique', v: '12 t' },
    { l: 'Remise à neuf', v: '18 t' },
    { l: 'Homologation', v: '9 t' },
  ]},
  { t: '🏗️ Infrastructure Eiffage (1260 t)', items: [
    { l: 'Parking A - Terrassement', v: '120 t' },
    { l: 'Parking A - Béton/acier', v: '450 t' },
    { l: 'Parking A - Solaire 500kWc', v: '80 t' },
    { l: 'Parking A - Bornes', v: '30 t' },
    { l: 'Parking B - Terrassement', v: '100 t' },
    { l: 'Parking B - Béton/acier', v: '380 t' },
    { l: 'Parking B - Solaire 450kWc', v: '70 t' },
    { l: 'Parking B - Bornes', v: '30 t' },
  ]},
  { t: '🌐 Déploiement Réseau (45 t)', items: [
    { l: 'Transport vers parkings', v: '8 t' },
    { l: 'Bornes Schneider', v: '15 t' },
    { l: 'Plateforme Galadrim', v: '12 t' },
    { l: 'Raccordement EDF', v: '10 t' },
  ]},
  { t: '⚡ Usage 10 ans (47 t)', items: [
    { l: 'Recharge (15% réseau)', v: '7.2 t' },
    { l: 'Maintenance NovumTech', v: '40 t' },
  ]},
  { t: '♻️ Fin de Vie Excoffier (-127 t)', items: [
    { l: 'Démontage', v: '+8 t' },
    { l: 'Recyclage batteries', v: '-60 t' },
    { l: 'Recyclage métaux', v: '-40 t' },
    { l: 'Recyclage électronique', v: '-15 t' },
    { l: 'Réemploi châssis', v: '-20 t' },
  ]},
];
