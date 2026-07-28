"use client";

import CardFoodieLoad from "./Card/CardSkeleton";
import Card from "./Card/Card";

export default function List({ type, list = [], load = false, error = "", orientation = "vertical", limit, emptyMessage = "No hay elementos disponibles" }) {
    
    const isVertical = orientation === "vertical";

    const visibleItems = typeof limit === "number" ? list.slice(0, limit) : list;

    const listClasses = [
        "w-full",
        "flex",
        "gap-md",
        "p-md",
        isVertical ? "flex-col" : "flex-row scroll-x",
    ].join(" ");

    if (load) {
        const skeletonCount = isVertical ? 5 : 3;

        return (
            <ul className={listClasses}>
                {Array.from({length: skeletonCount}).map((_, index) => (
                    <li key={index} className={isVertical ? "w-full" : "shrink-0"}>
                        <CardFoodieLoad />
                    </li>
                ))}
            </ul>
        );
    }

    if (error) {
        return (
            <div className="w-full px-md py-lg text-center">
                <p className="text-sm text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <ul className={listClasses}>
            {visibleItems.length > 0 ? (
                visibleItems.map((item) => (
                    <li key={item.id} className={isVertical ? "w-full" : "shrink-0 w"} style={{"--mxw": "350px"}}>
                        <Card
                            id={item.id}
                            type={type}
                            slug={item.slug}
                            title={item.title}
                            subtitle={item.subtitle || item.address}
                            image={item.image}
                            avatar={item.avatar}
                        />
                    </li>
                ))
            ) : (
                <li className="w-full py-lg text-center">
                    <p className="text-sm opacity-70">{emptyMessage}</p>
                </li>
            )}
        </ul>
    );
}