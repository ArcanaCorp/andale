// maps.config.js
import { setOptions } from "@googlemaps/js-api-loader";
import { API_KEY_MAPS } from "@/config/config";

setOptions({
    key: API_KEY_MAPS,
    v: "weekly",         // versión estable semanal
    language: "es",
    region: "PE",
    libraries: ["routes", "places", "marker"], // pre-carga básica
});