import { env } from "process"

const STORE_ID = 'd9ccc2e4-863f-46a9-81c6-b016f0bfdc87'

export async function getProducts() {
    const res = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products`, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': env.GELATO_API_KEY
        }
    })
    return await res.json();
}