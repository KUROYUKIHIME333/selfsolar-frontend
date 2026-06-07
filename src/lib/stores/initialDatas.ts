import { writable } from "svelte/store";
import type { LayoutData } from "../../routes/$types";
import type { Writable } from "svelte/store";

export const initialDatasStore: Writable<LayoutData> = writable({
  backend: false,
  liste_panneaux: undefined,
  listes_batteries: undefined,
  normes_pv: undefined,
});
