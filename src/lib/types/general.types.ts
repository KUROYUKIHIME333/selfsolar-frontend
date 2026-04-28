export type PostItType = "badge" | "post-it" | "tips" | "idea";

export type PlaceholderEquipementType = {
  nom: string;
  puissance: number;
  duree: number;
};

export type StatusBackend =
  | "opérationnel"
  | "arrêt temporaire"
  | "en maintenance"
  | "fonctionnement restreint"
  | "arrêt définitif";

export type BackendHealthType = {
  api: "SelfSolar API";
  version: string;
  status: StatusBackend;
  endpoints: {
    pv: string;
    documentation: string;
  };
};
