import PromotionBanner from "@/components/PromotionBanner";
import Categories from "../components/Categories";
import { Suspense, lazy } from "react";
import SkeletonRecommend from "../components/SkeletonRecommend";

const Recomendations = lazy(() => import('../components/Recomendations'));

export default function HomeView () {

    return (

        <>
        
            <Categories/>
            <PromotionBanner/>
            <Suspense fallback={<SkeletonRecommend/>}>
                <Recomendations/>
            </Suspense>

        </>

    )

}