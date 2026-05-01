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

export type ParametresBatterie = {
  v: number | undefined;
  ah: number | undefined;
};

export type TemperaturesAttendue = {
  temperatureMin: number;
  temperatureMax: number;
};

export type ContraintesOnduleur = {
  puissanceACNominale?: number | undefined;
  tensionDCMax?: number | undefined;
  tensionMPPTMin?: number | undefined;
  tensionMPPTMax?: number | undefined;
  courantDCMax?: number | undefined;
  puissanceDCMax?: number | undefined;
  puissanceSurcharge?: number | undefined;
  rendementMPPT?: number | undefined;
  tensionBatterieMin?: number | undefined;
  tensionBatterieMax?: number | undefined;
  puissanceChargeBatterieMax?: number | undefined;
};

export type Cablage = {
  materiau?: MateriauConducteur | undefined;
  longueurString?: number | undefined;
  longueurPrincipalDC?: number | undefined;
  longueurAC?: number | undefined;
  methodePoseDC?: string | undefined;
  methodePoseAC?: MethodePose | undefined;
  conditionEnvironnement?: ConditionEnvironnement | undefined;
};

export type PompageCaracteristiques = {
  batteries: boolean | undefined;
  masseVolumique?: number | undefined;
  accelerationPesanteur?: number | undefined;
  debit: number | undefined;
  hauteurMano: number | undefined;
  rendementPompe: number | undefined;
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
  puissanceACNominale: number | undefined; // W - Puissance sortie AC nominale
  puissanceDCMax?: number | undefined; // W - Puissance entrée DC max
  puissanceSurcharge?: number | undefined; // W - Pic soutenable (démarrage moteurs)
  rendementMPPT?: number | undefined; // %/100 - Rendement MPPT (0.96-0.99)

  // Tensions DC (critiques pour sécurité)
  tensionDCMax: number | undefined; // V - Limite ABSOLUE (sécurité)
  tensionMPPTMin: number | undefined; // V - Minimum pour fonctionnement MPPT
  tensionMPPTMax: number | undefined; // V - Maximum plage MPPT

  // Courants
  courantDCMax: number | undefined; // A - Courant entrée DC max par MPPT

  // Off-grid/hybride uniquement
  tensionBatterieMin?: number | undefined; // V
  tensionBatterieMax?: number | undefined; // V
  puissanceChargeBatterieMax?: number | undefined; // W
}

// Interface étendue pour le service modulesPV
export interface ContraintesOnduleurModules {
  tensionMPPTMin: number;
  tensionMPPTMax: number;
  tensionDCMax: number;
  rendementMPPT?: number;
}

export type TechnologieBatterie =
  | "Plomb-acide"
  | "AGM/Gel"
  | "LiFePO4"
  | "Lithium NMC/NCA"
  | "NiCd";

// Interface représentant les caractéristiques techniques individuelles d'un modèle de batterie.
export interface ModeleBatterie {
  nom?: string | undefined;
  v: number | undefined;
  ah: number | undefined;
  desc: string | undefined;
}

// Interface pour une marque spécifique dans le catalogue.
export interface TechnologiesCatalogue {
  label: string;
  options: ModeleBatterie[];
}

// les clés définies dans la liste des techno de batterie.
export type CatalogueBaterries = {
  [key: string]: TechnologiesCatalogue;
};

//Type principal correspondant à l'objet global LISTE_BATTERIE.

export interface ListePanneauxData {
  liste_techno: string[];
  catalogue_batt: CataloguePV;
}

// CÂBLAGE ET PROTECTIONS
export interface CableDCDimensionnement {
  // Caractéristiques
  section: number; // mm² (normalisée IEC 60228)
  materiau: MateriauConducteur;
  typeCable: TypeCableSolaire;

  // Électriques
  courantAdmissible: number; // A (corrigé conditions réelles)
  courantDimensionnement: number; // A (Isc × 1.25)
  resistanceLineique: number; // Ω/km

  // Chute tension
  chuteTensionV: number; // V absolu
  chuteTensionPourcent: number; // %
  chuteTensionMax: number; // % (1% ou 3% selon câble)

  // Géométrie
  longueur: number; // m
  nombreConducteurs: number; // 2 (aller-retour)

  // Conditions
  temperatureAmbiante: number; // °C
  temperatureConducteur: number; // °C (calculée)
  methodePose: MethodePose;

  // Correction appliquées
  facteursCorrection: {
    kT: number; // Température
    kG: number; // Groupement
    kP: number; // Pose
    kM: number; // Matériau (Al vs Cu)
    total: number;
  };
}

export interface ProtectionDC {
  type: "fusible" | "sectionneur" | "parafoudre" | "disjoncteur";
  calibre?: number; // A (pour fusible/disjoncteur)
  tensionAssignee: number; // V
  pouvoirCoupure?: number; // kA
  norme: string;
  emplacement: string;
  caracteristiques?: string; // gPV, etc.
}

export interface DimensionnementAC {
  section: number; // mm²
  materiau: MateriauConducteur;
  courantEmploi: number; // A (IB)
  courantAdmissible: number; // A (IZ)
  protection: number; // A (In disjoncteur)
  chuteTension: number; // %
  chuteTensionMax: number; // %
  ddr: {
    type: "A" | "B" | "F" | "AC";
    sensibilite: number; // mA
    norme: string;
  };
  methodePose: MethodePose;
  facteursCorrection: Record<string, number>;
}
