import { env } from "process"

const STORE_ID = 'd9ccc2e4-863f-46a9-81c6-b016f0bfdc87'

const PRICE_MAP = {
    '39cfcec8-868f-45f1-b319-e05b8dbb6bbb': 39.0, // Ds Shirt.
    '59a88d91-5ea0-4cfe-b5a3-bcb9d78b670c': 34.0 // Dr Bag.
}

export async function getProducts() {
    const res = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products`, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': env.GELATO_API_KEY
        }
    });
    const { products } = await res.json();
    return products.map((product: any) => ({
        id: product.id,
        title: product.title,
        previewUrl: product.previewUrl,
        price: PRICE_MAP[product.id],
        priceDisplay: Intl.NumberFormat("de-CH", {
            style: "currency",
            currency: "CHF",
          }).format(PRICE_MAP[product.id]),
        options: product.productVariantOptions.map((option: any) => ({
            name: option.name,
            values: option.values
        })),
    }));
}

export async function getProductDetails(id: string) {
    const res = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': env.GELATO_API_KEY
        }
    });
    const product = await res.json();
    console.log(product)
    return {
        id: product.id,
        title: product.title,
        previewUrl: product.previewUrl,
        price: PRICE_MAP[product.id],
        options: product.productVariantOptions.map((option: any) => ({
            name: option.name,
            values: option.values
        })),
    };
}