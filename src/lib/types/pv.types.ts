export type Localisation = {
  lat: number;
  long: number;
  altitude?: number | null;
};

export type Equipement = {
  nom?: string;
  P: number;
  h: number;
  ks: number;
};

export type ParametresPanneau = {
  puissanceCreteModule: number;
  tensionVoc: number;
  courantCourtCircuit: number;
  tensionMPP: number;
  courantMPP?: number;
  coeffTempTension: number;
  coeffTempPuissance: number;
  noct?: number;
};

export type TemperaturesAttendue = {
  temperatureMin: number;
  temperatureMax: number;
};

export type ContraintesOnduleur = {
  puissanceACNominale?: number;
  tensionDCMax?: number;
  tensionMPPTMin?: number;
  tensionMPPTMax?: number;
  courantDCMax?: number;
  puissanceDCMax?: number;
  puissanceSurcharge?: number;
  rendementMPPT?: number;
  tensionBatterieMin?: number;
  tensionBatterieMax?: number;
  puissanceChargeBatterieMax?: number;
};

export type Cablage = {
  materiau?: string;
  longueurString?: number;
  longueurPrincipalDC?: number;
  longueurAC?: number;
  methodePoseDC?: string;
  methodePoseAC?: string;
  conditionEnvironnement?: string;
};

export type PompageCaracteristiques = {
  batteries: boolean;
  masseVolumique?: number;
  accelerationPesanteur?: number;
  debit: number;
  hauteurMano: number;
  rendementPompe: number;
};

export const TYPE_INSTALATTION_OPTIONS = [
  { value: "HAUTE_QUALITE", label: "Haute qualité" },
  { value: "STANDARD", label: "Standard" },
  { value: "POUSSIEREUX", label: "Poussiéreux" },
  { value: "FAIBLE_MAINTENANCE", label: "Faible maintenance" },
  { value: "ANCIEN", label: "Ancien" },
  { value: "CABLE_LONG", label: "Câble long" },
];

export type TypeInstallationType =
  | "HAUTE_QUALITE"
  | "STANDARD"
  | "POUSSIEREUX"
  | "FAIBLE_MAINTENANCE"
  | "ANCIEN"
  | "CABLE_LONG";

export const TYPE_SYSTEME_OPTIONS = [
  {
    value: "on-grid",
    label: "Votre installation est reliée au réseau électrique urbain",
  },
  {
    value: "off-grid",
    label: "Votre installation est isolé du réseau électrique",
  },
  { value: "hybride", label: "Hybride" },
];

export type TypeSystemType = "on-grid" | "off-grid" | "hybride";

export type MateriauConducteur = "cuivre" | "aluminium";

export type MethodePose =
  | "conduit_encastre" // B2 - Référence NFC 15-100
  | "conduit_surface" // B1
  | "air_libre" // E/F
  | "enterre" // D
  | "gaine_technique"; // C

export type ConditionEnvironnement =
  | "standard" // 30°C ambiant
  | "chaud" // 40°C ambiant
  | "tres_chaud" // 50°C ambiant
  | "extreme" // 60°C ambiant (désert)
  | "humide" // Impact isolation
  | "corrosif"; // Impact matériau

export type TypeCableSolaire = "PV1-F" | "H1Z2Z2-K";

// Interface représentant les caractéristiques techniques individuelles d'un modèle de panneau solaire.
export interface ModelePanneau {
  nom: string;
  puissance_max: number;
  tension_mpp: number;
  tension_vide: number;
  courant_mpp: number;
  courant_cc: number;
  coeff_v: number;
  coeff_p: number;
  coeff_i: number;
  noct: number;
}

// Interface pour une marque spécifique dans le catalogue.
export interface MarqueCatalogue {
  nom_afic: string;
  modeles: ModelePanneau[];
}

// les clés définies dans la liste des marques.
export type CataloguePV = {
  [key: string]: MarqueCatalogue;
};

//Type principal correspondant à l'objet global LISTE_PANNEAUX.

export interface ListePanneauxData {
  liste_marques: string[];
  catalogue_pv: CataloguePV;
}

export interface ParametresOnduleur {
  // Puissances
  puissanceACNominale: number; // W - Puissance sortie AC nominale
  puissanceDCMax?: number; // W - Puissance entrée DC max
  puissanceSurcharge?: number; // W - Pic soutenable (démarrage moteurs)
  rendementMPPT?: number; // %/100 - Rendement MPPT (0.96-0.99)

  // Tensions DC (critiques pour sécurité)
  tensionDCMax: number; // V - Limite ABSOLUE (sécurité)
  tensionMPPTMin: number; // V - Minimum pour fonctionnement MPPT
  tensionMPPTMax: number; // V - Maximum plage MPPT

  // Courants
  courantDCMax: number; // A - Courant entrée DC max par MPPT

  // Off-grid/hybride uniquement
  tensionBatterieMin?: number; // V
  tensionBatterieMax?: number; // V
  puissanceChargeBatterieMax?: number; // W
}

// Interface étendue pour le service modulesPV
export interface ContraintesOnduleurModules {
  tensionMPPTMin: number;
  tensionMPPTMax: number;
  tensionDCMax: number;
  rendementMPPT?: number;
}
