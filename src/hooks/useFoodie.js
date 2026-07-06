'use client';

import { useEffect, useState } from "react";
import { getFoodieCategories } from "@/services/categories.service";
import { getFoodieDishes } from "@/services/dishes.service";

export function useFoodieMenu(foodieId, limit = 10) {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const [dishes, setDishes] = useState([]);

    const [ dish, setDish ] = useState(null);

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingDishes, setLoadingDishes] = useState(false);

    const loadCategories = async () => {

        if (!foodieId) return;

        try {

            setLoadingCategories(true);

            const data = await getFoodieCategories(foodieId);

            setCategories(data || []);

        } catch (error) {

            console.error("Error loading categories:", error);

        } finally {

            setLoadingCategories(false);

        }

    };

    const loadDishes = async (categoryId = null) => {

        if (!foodieId) return;

        try {

            setLoadingDishes(true);

            const data = await getFoodieDishes({
                foodieId,
                categoryId,
                page: 0,
                limit
            });

            setDishes(data || []);

        } catch (error) {

            console.error("Error loading dishes:", error);

        } finally {

            setLoadingDishes(false);

        }

    };

    const selectCategory = (categoryId) => {

        if (categoryId === activeCategory) return;

        setActiveCategory(categoryId);
        loadDishes(categoryId);

    };

    const selectedDish = (data) => setDish(data)

    useEffect(() => {

        if (!foodieId) return;

        setActiveCategory(null);

        loadCategories();
        loadDishes(null);

    }, [foodieId]);

    return {
        categories,
        dishes,

        activeCategory,
        selectCategory,

        loadingCategories,
        loadingDishes,

        dish,
        selectedDish
    };

}