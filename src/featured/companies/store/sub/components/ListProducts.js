import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ListProducts ({ products, filter, companies }) {

    const [ list, setList ] = useState([]);

    const shuffle = (array) => {
        const arr = [...array];
        let currentIndex = arr.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex],
                arr[currentIndex]
            ];
        }
        return arr;
    }

    useEffect(() => {
        if (!products || products.length === 0) return;
        if (filter === "all") {
            const randomized = shuffle(products).slice(0, 10);
            setList(randomized)
        } else {
            const filtered = products.filter(
                (p) => p.category === filter
            );
            setList(filtered)
        }
    }, [filter, products])

    return (

        <ul className="__lst">
            {list.map((pdt) => (
                <ProductCard key={pdt.id} data={pdt} companies={companies} />
            ))}
        </ul>

    )

}