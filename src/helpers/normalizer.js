import { BUSSINES_IMAGE_BASE } from "../config";

export function normalizeItem(category, raw, subBussines) {
    const baseImage = `${BUSSINES_IMAGE_BASE}/${subBussines}/products`;

    if (category === "restaurant") {
        return {
            id: raw.id_dish,
            type: "dish",
            name: raw.name_dish,
            description: raw.text_dish,
            category: raw.category_dish,
            price: raw.price_dish,
            image: `${baseImage}/${raw.image_dish}`,
            meta: {
                discount: raw.discount_dish,
                popular: raw.popular_dish
            }
        };
    }

    if (category === "agency") {
        return {
            id: raw.id_pack,
            type: "pack",
            name: raw.name_pack,
            description: raw.text_pack,
            category: raw.category_pack,
            price: raw.price_pack,
            image: `${baseImage}/${raw.image_pack}`
        };
    }

    if (category === "ecommerce") {
        return {
            id: raw.id_product,
            type: "product",
            name: raw.name_product,
            category: raw.category_product,
            price: raw.priceu_product,
            image: `${baseImage}/${raw.image_product}`,
            meta: {
                stock: raw.stock_product,
                amount: raw.amount_product
            }
        };
    }

    if (category === "hotel") {
        return {
            id: raw.id_bedroom,
            type: "bedroom",
            name: raw.name_bedroom,
            price: raw.price_bedroom,
            category: raw.category_bedroom,
            image: `${baseImage}/${raw.image_bedroom}`
        };
    }

    return null;
}