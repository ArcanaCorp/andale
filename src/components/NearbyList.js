import { useDB } from "@/context/DBContext";
import Card from "./Card";
import { useEffect } from "react";
import { usePermission } from "@/context/PermissionContext";
import { API_IMAGE_PLACE } from "@/config";

export default function NearbyList () {

    const { location } = usePermission();
    const { nearbyPlaces, fetchNearby } = useDB();

    useEffect(() => {
        if (!location) return;
        const load = async () => {
            try {
                await fetchNearby(location);
            } catch (error) {
                console.error(error);
            }
        }
        load();
    }, [location])

    console.log(nearbyPlaces);

    return (
        <ul className="w-full flex flex-col gap-md px-md">
            {nearbyPlaces.map((place) => (
                <Card key={place?.id_place} image={`${API_IMAGE_PLACE}/${place?.sub_place}/${place?.images[0].url}`} name={place?.name_place} text={place?.category_place} />
            ))}
        </ul>
    )
}