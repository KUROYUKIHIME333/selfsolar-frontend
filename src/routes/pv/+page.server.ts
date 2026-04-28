import { BACKEND_ENDPOINTS } from "$lib/utils/endpoints";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const load = async ({ fetch }) => {
  const pvUrlDatas = BACKEND_ENDPOINTS.pv;
  const listePanneauxUrl = `${PUBLIC_BACKEND_URL}${pvUrlDatas.route}${pvUrlDatas.sub_routes.liste_panneaux}`;
  console.log(listePanneauxUrl)
  const response = await fetch(listePanneauxUrl);

  const liste = await response.json();

  console.log("Le fetch de base: ", liste);

  return { liste };
};
