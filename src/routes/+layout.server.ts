import { BACKEND_ENDPOINTS } from "$lib/utils/endpoints";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { BackendHealthType } from "$lib/types/general.types";

export const load = async ({ fetch }) => {
  // Routes formatting to use it after all
  const pvUrlRoute = BACKEND_ENDPOINTS.pv.route;
  const allListesRoute =
    BACKEND_ENDPOINTS.pv.sub_routes.liste_panneaux_batteries;
  const santeRoute = BACKEND_ENDPOINTS.pv.sub_routes.sante;
  const normesRoute = BACKEND_ENDPOINTS.pv.sub_routes.normes;
  const pvRequestsRoute = `${PUBLIC_BACKEND_URL}${pvUrlRoute}`;

  // Is the backend ok ?
  const backEndStatusRes = await fetch(`${PUBLIC_BACKEND_URL}/`);
  const backEndStatus: BackendHealthType = await backEndStatusRes.json();

  // "Backend is ok" Conditions
  const backEndOk: boolean =
    backEndStatusRes &&
    backEndStatus.api === "SelfSolar API" &&
    (backEndStatus.status === "opérationnel" ||
      backEndStatus.status === "fonctionnement restreint") &&
    backEndStatus.endpoints.pv === pvUrlRoute;

  if (backEndOk) {
    const pvStatusRes = await fetch(`${pvRequestsRoute}${santeRoute}`);
    const pvStatus = await pvStatusRes.json();

    // "The pv functionnality is ok" Conditions
    const pvFunctionsOk: boolean =
      pvStatus.status === "opérationnel" ||
      pvStatus.status === "fonctionnement restreint";

    if (pvFunctionsOk) {
      const [listes, normesPV] = await Promise.all([
        fetch(`${pvRequestsRoute}${allListesRoute}`).then((res) => res.json()),
        fetch(`${pvRequestsRoute}${normesRoute}`).then((res) => res.json()),
      ]);

      return {
        backend: true,
        liste_panneaux: listes.listesPanneaux,
        listes_batteries: listes.listeBatteries,
        normes_pv: normesPV,
      };
    }

    return {
      backend: false,
      liste_panneaux: undefined,
      listes_batteries: undefined,
      normes_pv: undefined,
    };
  }
};
