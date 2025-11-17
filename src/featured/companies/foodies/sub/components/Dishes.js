import { useEffect, useState } from "react";
import FoodieCard from "./card";

export default function Dishes({ filter, dishes }) {

    const [list, setList] = useState([]);

    // Fisher–Yates shuffle (mezcla real)
    const shuffle = (array) => {
        const arr = [...array];
        let currentIndex = arr.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex],
                arr[currentIndex],
            ];
        }

        return arr;
    };

    useEffect(() => {
        if (!dishes || dishes.length === 0) return;

        if (filter === "all") {
            const randomized = shuffle(dishes).slice(0, 10);
            setList(randomized);
        } else {
            const filtered = dishes.filter(
                (pdt) => pdt.category === filter
            );
            setList(filtered);
        }
    }, [filter, dishes]);

    return (
        <ul className="__lst">
            {list.map((pdt) => (
                <FoodieCard key={pdt.id} foodie={pdt} />
            ))}
        </ul>
    );
}