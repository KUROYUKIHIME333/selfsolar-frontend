import type { PlaceholderEquipementType } from "$lib/types/general.types";

export const MAIN_NAME: string = "The Crafted Calculator";

export const DEFAULT_FACTEUR_FOISONNEMENT_GLOBAL: number = 0.8;

export const DEFAULT_FACTEUR_SIMULTANEITE: number = 0.7;

export const PLACEHOLDER_EQUIPEMENT: PlaceholderEquipementType[] = [
  {
    nom: "Fer à repasser",
    puissance: 1500,
    duree: 0.54,
  },
  {
    nom: "Réchaud",
    puissance: 3500,
    duree: 7.43,
  },
  {
    nom: "Télévision",
    puissance: 89,
    duree: 7,
  },
  {
    nom: "Congélateur",
    puissance: 400,
    duree: 24,
  },
  {
    nom: "Scie électrique",
    puissance: 2200,
    duree: 5,
  },
  {
    nom: "Broyeur à feuilles",
    puissance: 5500,
    duree: 6.5,
  },
];

// Kimwenza
export const DEFAULT_COORDINATES: {
  lat: number;
  long: number;
  altitude: number;
} = {
  lat: -4.453207,
  long: 15.290299,
  altitude: 0,
};

export const MATERIAUX_OPTIONS = [
  {
    value: "cuivre",
    label: "Cuivre",
  },
  {
    value: "aluminium",
    label: "Aluminium",
  },
];

export const METHODE_POSE_OPTIONS = [
  {
    value: "conduit_encastre",
    label: "Conduite encastrée (B2 - Référence NFC 15-100)",
  },
  {
    value: "conduit_surface",
    label: "Conduite en surface (B1 - Référence NFC 15-100)",
  },
  {
    value: "air_libre",
    label: "A l'air libre (E/F - Référence NFC 15-100)",
  },
  {
    value: "enterre",
    label: "Enterré (D - Référence NFC 15-100)",
  },
  {
    value: "gaine_technique",
    label: "Dans une gaine technique (C - Référence NFC 15-100)",
  },
];

export const 