/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from "./$types";
import { json, error } from "@sveltejs/kit";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { BACKEND_ENDPOINTS } from "$lib/utils/endpoints";

// POST /api/posts
export const POST: RequestHandler = async ({ request, fetch }) => {
    try {
    const backendRoute = `${PUBLIC_BACKEND_URL}${BACKEND_ENDPOINTS.pv.route}${BACKEND_ENDPOINTS.pv.sub_routes.calculation}`;
    const body = await request.json();

    const response = await fetch(backendRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const rawResult = await response.json();

    console.log("RESULTAT DANS SERVER APRES REQUETE :", rawResult);

    if (!response.ok) {
      return json(
        { error: rawResult.error || "Erreur de calcul" },
        { status: response.status }
      );
    }
    // Formatage de la réponse pour le client selon responseToRequest.txt[cite: 3]
    const formattedResponse = {
      resume: rawResult.resume,
      site: rawResult.site,
      modulesPV: rawResult.modulesPV,
      onduleur: rawResult.onduleur,
      stockage: rawResult.stockage,
      cablage: rawResult.cablage,
      conformite: rawResult.conformite,
      meta: {
        timestamp: new Date().toISOString(),
        status: "verified",
      },
    };
    return json(formattedResponse);
  } catch (err) {
    return json(
      { error: "Erreur interne du serveur intermédiaire" },
      { status: 500 }
    );
  }
};
