export type FunctionnalityType = {
  id: string;
  functionnality?: string;
  label: string;
  link: string;
};

export const IMPLEMENTED: FunctionnalityType[] = [
  {
    id: "fn01",
    functionnality: "INSTALLATION PHOTOVOLTAÏQUE",
    label: "PV",
    link: "https://danielramazani.onrender.com",
  },
  {
    id: "fn02",
    functionnality: "CHOIX ET DIMMENSIONNEMENT DU GROUPE ÉLECTROGÈNE",
    label: "GE",
    link: "https://danielramazani.onrender.com",
  },
  {
    id: "fn03",
    functionnality: "STOCKAGE D'ÉNERGIE (CHARGÉE PAR LE RÉSEAU)",
    label: "Batteries",
    link: "https://danielramazani.onrender.com",
  },

  {
    id: "fn03",
    functionnality: "DIMENSIONNEMENT ÉLECTRIQUE BASSE TENSION",
    label: "Installation électrique",
    link: "https://danielramazani.onrender.com",
  },
  {
    id: "fn04",
    functionnality: "PROTECTION CONTRE LA FOUDRE ET SURTENSIONS",
    label: "Foudre et Surtensions",
    link: "https://danielramazani.onrender.com",
  },
  {
    id: "fn05",
    functionnality: " INFRASTRUCTURE DE RECHARGE VÉHICULES ÉLECTRIQUES (IRVE)",
    label: "Véhicules électriques",
    link: "https://danielramazani.onrender.com",
  },
];
