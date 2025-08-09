import { Suspense } from "react";
import Skeleton from "./components/Skeleton";
import Recomendations from "./components/Recomendations";

export default function Home () {

    return (

        <>

            <Suspense fallback={<Skeleton/>}>
                <Recomendations/>
            </Suspense>

        </>

    )

}