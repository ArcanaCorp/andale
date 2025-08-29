import { Suspense } from "react";
import Skeleton from "./components/Skeleton";
import Recomendations from "./components/Recomendations";
import Install from "../components/Install";

export default function Home () {

    return (

        <>

            <Install/>

            <Suspense fallback={<Skeleton/>}>
                <Recomendations/>
            </Suspense>

        </>

    )

}