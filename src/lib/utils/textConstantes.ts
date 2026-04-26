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
