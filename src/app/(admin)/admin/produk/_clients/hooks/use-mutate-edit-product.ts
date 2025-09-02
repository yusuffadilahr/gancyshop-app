import { IDataProduk, IInitialValuesEditProduct } from "@/app/(admin)/admin/produk/_clients/types";
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/app/_clients/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export const useMutateEditProduct = ({ dataTable, refetch,setOpenDialog }: {setOpenDialog: Dispatch<SetStateAction<boolean>>; dataTable: IDataProduk | null, refetch: () => void }) => {
    const initialValuesEditProduct = {
        images: null,
        name: dataTable?.name || '',
        description: dataTable?.description || '',
        price: dataTable?.price || '',
        isActive: dataTable?.isActive,
        stock: dataTable?.stock || '',
        weightGram: dataTable?.weightGram || '',
    } as IInitialValuesEditProduct

    const { mutate: handleEditProduct, isPending } = useMutation({
        mutationFn: async ({ fd, idProduct }: { fd: FormData, idProduct: number }) => {
            return await axiosInstance.patch(`/admin/edit-product/${idProduct}`, fd)
        }, onSuccess: (res) => {
            toast({
                title: res.data?.message || 'Berhasil mengupload produk',
                description: new Date().toDateString(),
            })

            refetch()
            setOpenDialog(false)
        }, onError: (err) => {
            console.log(err)

            toast({
                title: 'Gagal membuat produk',
                description: new Date().toDateString(),
            })
        }
    })

    const validatEditProduct = (values: IInitialValuesEditProduct) => {
        return (
            !values.description ||
            isPending || !values.name || !values.price ||
            !values.stock || !values.weightGram
        )
    }

    return {
        initialValuesEditProduct,
        handleEditProduct,
        isPending,
        validatEditProduct
    }
}