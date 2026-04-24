export type FunctionnalityType = {
  id: string;
  functionnality?: string;
  label: string;
  link: string;
};

export type FooterLinkType = {
  label: string;
  description: string;
  link: string;
};

export const IMPLEMENTED: FunctionnalityType[] = [
  {
    id: "fn03",
    functionnality: "STOCKAGE D'ÉNERGIE (CHARGÉE PAR LE RÉSEAU)",
    label: "Batteries",
    link: "https://danielramazani.onrender.com",
  },
  {
    id: "fn01",
    functionnality: "INSTALLATION PHOTOVOLTAÏQUE",
    label: "Photovoltaique",
    link: "https://danielramazani.onrender.com",
  },
  {
    id: "fn02",
    functionnality: "CHOIX ET DIMMENSIONNEMENT DU GROUPE ÉLECTROGÈNE",
    label: "Groupe Electrogène",
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

export const FOOTER_LINKS: FooterLinkType[] = [
  {
    label: "Normes",
    description: "Les normes utilisées et leurs explications",
    link: "https://danielramazani.onrender.com",
  },
  {
    label: "Documentation",
    description: "La documentation du système entier",
    link: "https://danielramazani.onrender.com",
  },
  {
    label: "Conditions d'utilisation",
    description: "Les conditions d'utilisation de la plateforme",
    link: "https://danielramazani.onrender.com",
  },

  {
    label: "Politique de Confidentialité",
    description: "Private policy du site",
    link: "https://danielramazani.onrender.com",
  },
];
