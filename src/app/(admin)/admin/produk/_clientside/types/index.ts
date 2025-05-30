export interface IDataProduk {
    id: number
    name: string
    description: string
    price: number
    stock: number
    imageUrl: string
    weightGram: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    ownerId: number
}

export interface IInitialValuesAddProduct {
    images: null | File,
    name: string,
    description: string,
    price: string,
    isActive: boolean,
    stock: string,
    weightGram: string,
}