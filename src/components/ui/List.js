'use client';

import CardFoodieLoad from "./Card/CardSkeleton";
import Card from "./Card/Card";

export default function List ({ type, list=[], load=false, orientation }) {

    if (load) return <ul className="w-full p-md flex flex-col gap-md">{Array.from({length: 5}).map((_, i) => ( <CardFoodieLoad key={i} /> ))}</ul>

    return (

        <ul className={`w-full flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row scroll-x'} gap-md p-md`}>
            {list.length > 0 ? (
                list.map((item) => (
                    <Card key={item.id} type={type} slug={item.slug} title={item.title} subtitle={item.subtitle} image={item.image} avatar={item.avatar}  />
                ))
            ) : (
                <p>No hay negocios abiertos</p>
            )}
        </ul>

    )
}