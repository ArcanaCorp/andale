'use client'

import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import ListCategory from "@/components/ui/List/ListCategory";
import ListDishes from "@/components/ui/List/ListDishes";
import { getFoodieCategories } from "@/services/categories.service";
import { getFoodieDishes } from "@/services/dishes.service";
import { IconArrowLeft, IconDotsVertical, IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FoodieDetail ({ info }) {

    const LIMIT = 10;

    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const [dishes, setDishes] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingDishes, setLoadingDishes] = useState(false);

    const handleBack = () => router.back();

    const loadCategories = async () => {
        if (!info?.id) return;

        try {
            setLoadingCategories(true);

            const data = await getFoodieCategories(info.id);
            setCategories(data);
        } catch (error) {
            console.error("Error loading categories:", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    const loadDishes = async ({categoryId = activeCategory, nextPage = 0, append = false} = {}) => {
        if (!info?.id || loadingDishes) return;

        try {
            setLoadingDishes(true);

            const data = await getFoodieDishes({
                foodieId: info.id,
                categoryId,
                page: nextPage,
                limit: LIMIT
            });

            setDishes((prev) => append ? [...prev, ...data] : data);
            setPage(nextPage);
            setHasMore(data.length === LIMIT);
        } catch (error) {
            console.error("Error loading dishes:", error);
        } finally {
            setLoadingDishes(false);
        }
    };

    const handleCategory = async (categoryId) => {
        setActiveCategory(categoryId);
        setDishes([]);
        setPage(0);
        setHasMore(true);

        await loadDishes({
            categoryId,
            nextPage: 0,
            append: false
        });
    };

    const handleLoadMore = async () => {
        if (!hasMore || loadingDishes) return;

        await loadDishes({
            categoryId: activeCategory,
            nextPage: page + 1,
            append: true
        });
    };

    useEffect(() => {
        if (!info?.id) return;

        loadCategories();
        loadDishes({
            categoryId: null,
            nextPage: 0,
            append: false
        });
    }, [info?.id]);

    if (!info) return <div>No hay datos</div>;

    return (

        <>
        
            <header className="relative w-full h rounded-bottom-md" style={{"--h": "160px"}}>
                <div className="absolute w-full flex items-center justify-between zIndex-2 p-md">
                    <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleBack}><IconArrowLeft/></ButtonIcon>
                    <div className="flex gap-md">
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'}><IconHeart/></ButtonIcon>
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'}><IconDotsVertical/></ButtonIcon>
                    </div>
                </div>
                <Image src={info.cover_image_url} alt={`Foto de portada de ${info.name}`} fill placeholder="blur" blurDataURL="https://placehold.net/600x600.png" />
            </header>
            <main className="absolute w-full py-md scroll-y h flex flex-col gap-md zIndex-2 bg-white rounded-top-lg" style={{"--h": "calc(100dvh - 80px)", "marginTop": "-80px"}}>
                <div className="w-full flex flex-col px-md">
                    <h1>{info.name}</h1>
                    <p className="text-sm text-muted">{info.description}</p>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <ListCategory list={categories} load={loadingCategories} active={activeCategory} onSelected={handleCategory} />
                    <ListDishes list={dishes} load={loadingDishes} />
                </div>
            </main>
        </>

    )

}