export const BACKEND_ENDPOINTS = {
    pv: {
        route: "/api/v1/pv",
        sub_routes: {
            sante: "/sante",
            liste_panneaux: "/listes/panneaux",
            liste_batteries: "/listes/batteries",
            liste_panneaux_batteries: "/listes",
            calculation: "/dimensionner",
            normes: "/normes-reference"
        }
    }
}