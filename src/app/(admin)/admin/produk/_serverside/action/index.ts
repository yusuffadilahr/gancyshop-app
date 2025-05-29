'use server'

import { cookies } from "next/headers"

export const addProductAction = async (fd: FormData) => {
    try {
        const token = (await cookies()).get('_token')?.value
        const data = {
            images: fd.get('images'),
            name: fd.get('name'),
            description: fd.get('description'),
            price: fd.get('price'),
            isActive: fd.get('isActive'),
            stock: fd.get('stock'),
            weightGram: fd.get('weightGram'),
        }
        console.log(data, '<< dapet ga')

        const res = await fetch('http://localhost:8000/api/admin/add-products', {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            cache: 'no-store',
            method: 'POST',
        })

        const result = await res.json()

        console.log(result, '<<<')
    } catch (error) {
        throw error
    }
}