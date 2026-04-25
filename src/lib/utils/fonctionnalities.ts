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
    link: "/batteries",
  },
  {
    id: "fn01",
    functionnality: "INSTALLATION PHOTOVOLTAÏQUE",
    label: "Photovoltaique",
    link: "/pv",
  },
  {
    id: "fn02",
    functionnality: "CHOIX ET DIMMENSIONNEMENT DU GROUPE ÉLECTROGÈNE",
    label: "Groupe Electrogène",
    link: "/ge",
  },

  {
    id: "fn03",
    functionnality: "DIMENSIONNEMENT ÉLECTRIQUE BASSE TENSION",
    label: "Installation électrique",
    link: "/bt",
  },
  {
    id: "fn04",
    functionnality: "PROTECTION CONTRE LA FOUDRE ET SURTENSIONS",
    label: "Foudre et Surtensions",
    link: "/foudres",
  },
  {
    id: "fn05",
    functionnality: " INFRASTRUCTURE DE RECHARGE VÉHICULES ÉLECTRIQUES (IRVE)",
    label: "Véhicules électriques",
    link: "/irve",
  },
];

export const FOOTER_LINKS: FooterLinkType[] = [
  {
    label: "Normes",
    description: "Les normes utilisées et leurs explications",
    link: "/normes",
  },
  {
    label: "Documentation",
    description: "La documentation du système entier",
    link: "/doc",
  },
  {
    label: "Conditions d'utilisation",
    description: "Les conditions d'utilisation de la plateforme",
    link: "/use",
  },

  {
    label: "Politique de Confidentialité",
    description: "Private policy du site",
    link: "/privatepolicy",
  },
];
