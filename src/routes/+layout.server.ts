import { BACKEND_ENDPOINTS } from "$lib/utils/endpoints";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { BackendHealthType } from "$lib/types/general.types";

export const load = async ({ fetch }) => {
  const pvUrlRoute = BACKEND_ENDPOINTS.pv.route;
  const allListesRoute =
    BACKEND_ENDPOINTS.pv.sub_routes.liste_panneaux_batteries;
  const santeRoute = BACKEND_ENDPOINTS.pv.sub_routes.sante;
  const normesRoute = BACKEND_ENDPOINTS.pv.sub_routes.normes;
  const pvRequestsRoute = `${PUBLIC_BACKEND_URL}${pvUrlRoute}`;

  console.log(
    `[Load] 🔍 Tentative de connexion au backend: ${PUBLIC_BACKEND_URL}`
  );

  try {
    // STATUS OF BACKEND (GLOBAL STATUS)
    const backEndStatusRes = await fetch(`${PUBLIC_BACKEND_URL}/`);

    if (!backEndStatusRes.ok) {
      console.error(`[Load] ❌ Erreur HTTP racine: ${backEndStatusRes.status}`);
      return { backend: false };
    }

    const backEndStatus: BackendHealthType = await backEndStatusRes.json();
    console.log("[Load] ✅ Statut Backend reçu:", backEndStatus.status);

    // VALIDATION CONDITIONS
    const backEndOk =
      backEndStatus.api === "SelfSolar API" &&
      ["opérationnel", "fonctionnement restreint"].includes(
        backEndStatus.status
      ) &&
      backEndStatus.endpoints.pv === pvUrlRoute;

    if (!backEndOk) {
      console.warn(
        "[Load] ⚠️ Validation Backend échouée (API name ou Endpoints mismatch)."
      );
      return { backend: false };
    }

    // TEST OF PV FUNCTIONNALITY
    const pvStatusRes = await fetch(`${pvRequestsRoute}${santeRoute}`);

    if (!pvStatusRes.ok) {
      console.error(`[Load] ❌ Erreur HTTP Santé PV: ${pvStatusRes.status}`);
      return { backend: false };
    }

    const pvStatus = await pvStatusRes.json();
    const pvFunctionsOk = ["opérationnel", "fonctionnement restreint"].includes(
      pvStatus.status
    );

    if (pvFunctionsOk) {
      console.log("[Load] ⚡✅ PV OK. Récupération des données...");

      const [listesRes, normesRes] = await Promise.all([
        fetch(`${pvRequestsRoute}${allListesRoute}`),
        fetch(`${pvRequestsRoute}${normesRoute}`),
      ]);

      if (!listesRes.ok || !normesRes.ok) {
        console.error("[Load] ❌ Échec final", {
          listes: listesRes.status,
          normes: normesRes.status,
        });
        return { backend: false };
      }

      const [listes, normesPV] = await Promise.all([
        listesRes.json(),
        normesRes.json(),
      ]);

      return {
        backend: true,
        liste_panneaux: listes.listesPanneaux,
        listes_batteries: listes.listeBatteries,
        normes_pv: normesPV,
      };
    }

    return { backend: false };
  } catch (e: unknown) {
    console.error("--- 🚨 ERREUR CRITIQUE FETCH ---");
    console.error("Message d'erreur:", (e as Error).message);

    if ((e as Error).cause) {
      console.error("Cause technique profonde:", (e as Error).cause);
      //WARNING: If there is a ECONNREFUSED here, I think it's an address error (like localhost vs 127.0.0.1)
    } else {
      console.error("Pas de cause spécifique (vérifiez l'URL ou le réseau).");
    }

    return {
      backend: false,
      error_details: (e as Error).message,
    };
  }
};
