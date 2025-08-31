import { DebouncedState } from "use-debounce"

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

export interface IValueOnChange {
    searchProduct?: string
    kategoriId?: string
    minPrice?: string
    maxPrice?: string
    minWeight?: string
    maxWeight?: string
    stock?: string
}

export interface ICategoryProduct {
    id: number
    categoryMotorcyleId: number
    categoryName: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

export interface ISectionFilterProps {
    isLoadingGetCategory: boolean,
    setValueOnChange: React.Dispatch<React.SetStateAction<IValueOnChange>>,
    valueOnChange: IValueOnChange,
    dataCategory?: ICategoryProduct[],
    debounceMaxPrice: DebouncedState<(val: string) => void>,
    debounceMaxWeight: DebouncedState<(val: string) => void>,
    debounceMinPrice: DebouncedState<(val: string) => void>,
    debounceMinWeight: DebouncedState<(val: string) => void>,
    datePicker: Date | undefined,
    setDatePicker: React.Dispatch<React.SetStateAction<Date | undefined>>,
    handleResetFilter: () => void,
}