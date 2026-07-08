import { NextResponse } from "next/server";

export async function GET(request) {
    try {

        const { searchParams } = new URL(request.url);

        const latitude = searchParams.get("latitude");
        const longitude = searchParams.get("longitude");

        if (!latitude || !longitude) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Latitude y longitude son requeridos"
                },
                {
                    status: 400
                }
            );
        }

        const url = new URL("https://nominatim.openstreetmap.org/reverse");

        url.searchParams.set("lat", latitude);
        url.searchParams.set("lon", longitude);
        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("accept-language", "es");

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Andaleya/1.0"
            }
        });

        if (!response.ok) {
            throw new Error(
                "No se pudo obtener la dirección"
            );
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,

            location: {
                displayName: data.display_name ?? null,

                road:
                    data.address?.road ??
                    data.address?.pedestrian ??
                    null,

                houseNumber:
                    data.address?.house_number ??
                    null,

                neighbourhood:
                    data.address?.neighbourhood ??
                    data.address?.suburb ??
                    null,

                district:
                    data.address?.city_district ??
                    null,

                city:
                    data.address?.city ??
                    data.address?.town ??
                    data.address?.village ??
                    null,

                province:
                    data.address?.state ??
                    null,

                country:
                    data.address?.country ??
                    null,

                countryCode:
                    data.address?.country_code ??
                    null
            }
        });

    } catch (error) {

        console.error(
            "Error en reverse geocoding:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Error al obtener la dirección"
            },
            {
                status: 500
            }
        );
    }
}