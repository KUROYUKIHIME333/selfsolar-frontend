import { BACKEND_ENDPOINTS } from "$lib/utils/endpoints";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const load = async ({ fetch }) => {
  const pvURL = BACKEND_ENDPOINTS.pv;
  const pvUrlRoute = BACKEND_ENDPOINTS.pv.route;
  const allListesRoute = BACKEND_ENDPOINTS.pv.sub_routes.liste_panneaux_batteries;
  const santeRoute = BACKEND_ENDPOINTS.pv.sub_routes.sante;
  const normesRoute = BACKEND_ENDPOINTS.pv.sub_routes.

  const [pvBackendHealth, ]
};
