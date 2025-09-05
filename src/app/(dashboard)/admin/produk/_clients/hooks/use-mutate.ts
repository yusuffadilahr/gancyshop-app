import { IInitialValuesAddProduct } from "@/app/(dashboard)/admin/produk/_clients/types";
import { updateIsActiveProduct } from "@/app/(dashboard)/admin/produk/_servers/services";
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/app/_clients/utils/axiosInstance";
import { fileToDataURL } from "@/app/_clients/utils/formatConverter";
import { useMutation } from "@tanstack/react-query";
import { FormikErrors } from "formik";
import * as React from "react";

export const useMutateAddProduct = ({ refetch }: { refetch: () => void }) => {
    const [filePreview, setFilePreview] = React.useState<string>('')

    const initialValues: IInitialValuesAddProduct = {
        images: null,
        name: '',
        description: '',
        price: '',
        isActive: false,
        stock: '',
        weightGram: '',
        categoryId: ''
    }

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: File | null | undefined,
            shouldValidate?: boolean) => Promise<void | FormikErrors<{
                images: null | File;
                name: string;
                description: string;
                price: number;
                isActive: boolean;
                stock: number;
                weightGram: number;
            }>>) => {
        const value = e?.target?.files?.[0]
        if (!e.target.files || !value) return

        if (value?.size >= (2 * 1024 * 1024)) {
            toast({
                title: 'File tidak boleh melebihi dari 2MB',
                description: new Date().toDateString(),
            })

            setFieldValue('images', null)
            setFilePreview('')

            return;
        }

        setFieldValue('images', value)
        const data = await fileToDataURL(value as File)
        setFilePreview(data)
    }

    const { mutate: handleAddProduct, isPending } = useMutation({
        mutationFn: async (fd: FormData) => {
            return await axiosInstance.post('/admin/add-products', fd)
        }, onSuccess: (res) => {
            toast({
                title: res.data?.message || 'Berhasil mengupload produk',
                description: new Date().toDateString(),
            })

            refetch()
        }, onError: (err) => {
            console.log(err)

            toast({
                title: 'Gagal membuat produk',
                description: new Date().toDateString(),
            })
        }
    })

    const { mutate: handleUpdateActiveProduct, isPending: isPendingUpdateIsActive } = useMutation({
        mutationFn: async ({ fd, id }: { fd: FormData, id: string }) => {
            return await updateIsActiveProduct(fd, id)
        },
        onSuccess: (res) => {
            if (res?.error) throw res

            toast({
                title: res?.message || 'Produkmu sekarang aktif',
                description: new Date().toDateString(),
            })
            refetch()
        },
        onError: () => {
            toast({
                title: 'Produkmu gagal diperbaharui!',
                description: new Date().toDateString(),
            })
        }
    })

    return {
        filePreview, setFilePreview,
        initialValues, handleChangeFile, handleAddProduct, isPending,
        handleUpdateActiveProduct, isPendingUpdateIsActive
    }
}