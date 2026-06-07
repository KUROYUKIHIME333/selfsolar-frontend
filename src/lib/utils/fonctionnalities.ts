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

export const HEADER_MENU = [
  {
    label: "Énergie & Autonomie",
    description: "Solutions de production et de stockage d'énergie.",
    link: "#",
    sub_menu: [
      {
        label: "Photovoltaïque",
        description: "Dimensionnement d'installations solaires complètes.",
        link: "/pv",
        sub_menu: [],
      },
      {
        label: "Stockage & Batteries",
        description:
          "Systèmes de batteries chargés par le réseau ou le solaire.",
        link: "/batteries",
        sub_menu: [],
      },
      {
        label: "Groupe Électrogène",
        description: "Choix et dimensionnement de secours électrique.",
        link: "/ge",
        sub_menu: [],
      },
    ],
  },
  {
    label: "Ingénierie Électrique",
    description: "Conception, protection et infrastructures modernes.",
    link: "#",
    sub_menu: [
      {
        label: "Basse Tension",
        description:
          "Dimensionnement électrique complet pour installations BT.",
        link: "/bt",
        sub_menu: [],
      },
      {
        label: "Foudre et Surtensions",
        description: "Études de protection contre les risques atmosphériques.",
        link: "/foudres",
        sub_menu: [],
      },
      {
        label: "Véhicules électriques",
        description: "Infrastructure de recharge (IRVE) et bornes.",
        link: "/irve",
        sub_menu: [],
      },
    ],
  },
  {
    label: "À propos",
    description: "Documentation et normes de l'industrie.",
    link: "/documentation",
    sub_menu: [],
  },
];

export const FOOTER_MENU= [
	{
		label: "Ressources Techniques",
		sub_menu: [
			{
				label: "Normes & Standards",
				description: "Référentiels techniques et explications des calculs.",
				link: "/normes"
			},
			{
				label: "Documentation",
				description: "Guide complet d'utilisation du système.",
				link: "/doc"
			}
		]
	},
	{
		label: "Légal",
		sub_menu: [
			{
				label: "Conditions d'utilisation",
				description: "Cadre contractuel de la plateforme.",
				link: "/use"
			},
			{
				label: "Confidentialité",
				description: "Politique de protection des données.",
				link: "/privatepolicy"
			}
		]
	}
];
