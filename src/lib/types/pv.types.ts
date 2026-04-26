export type Localisation = {
  lat: number;
  long: number;
  altitude?: number;
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
