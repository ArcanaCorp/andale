import PromotionBanner from "@/components/PromotionBanner";
import Categories from "../components/Categories";
import Recomendations from "../components/Recomendations";
import { Suspense } from "react";
import SkeletonRecommend from "../components/SkeletonRecommend";

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