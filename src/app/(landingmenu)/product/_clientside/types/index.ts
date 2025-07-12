export interface IProductPublic {
    id: number
    name: string
    description: string
    price: number
    stock: number
    imageUrl: string
    fileId: string | null
    weightGram: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    categoryId: number
    ownerId: number
    category: {
        id: number
        categoryName: string
        createdAt: string
        updatedAt: string
        deletedAt: string | null
    }
}