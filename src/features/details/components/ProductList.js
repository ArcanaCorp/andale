import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/products.service"
import ServerError from "../../pages/ServerError";
import Card from "./Card";

export default function ProductList ({ type, company, hidden }) {

    const sub = company?.sub;

    const { data } = useQuery({
        queryKey: ["products", {sub, hidden}],
        queryFn: () => getProducts({sub, hidden}),
        suspense: true,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false
    });

    if (data?.error) return <ServerError/>;

    const products = data?.data || [];

    return (

        <>
        
            {products.length > 0 ? (
                <ul className="__list_product">
                    {products.map((item) => (
                        <Card key={item.id} type={type} company={company} hidden={hidden} data={item} />
                    ))}
                </ul>
            ) : (
                <div>No hay productos disponibles</div>
            )}

        </>

    )

}