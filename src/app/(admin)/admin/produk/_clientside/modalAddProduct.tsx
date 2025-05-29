import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { fileToDataURL } from "@/utils/readFileToJpg";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik, FormikErrors } from "formik"
import Image from "next/image";
import * as React from "react";
import { MdCancel } from "react-icons/md";

export default function ModalAddProduct() {
    const [filePreview, setFilePreview] = React.useState<string>('')

    const initialValues: {
        images: null | File,
        name: string,
        description: string,
        price: string,
        isActive: boolean,
        stock: string,
        weightGram: string,
    } = {
        images: null,
        name: '',
        description: '',
        price: '',
        isActive: false,
        stock: '',
        weightGram: '',
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
        const value = e.target.files?.[0]

        setFieldValue('images', value)
        const data = await fileToDataURL(value as File)
        setFilePreview(data)
    }

    const { mutate: handleAddProduct, isPending } = useMutation({
        mutationFn: async (fd: FormData) => {
            const token = localStorage.getItem('_token')
            return await axiosInstance.post('/admin/add-products', fd, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }, onSuccess: (res) => {
            toast({
                title: res.data?.message || 'Berhasil mengupload produk',
                description: new Date().toDateString(),
            })
        }, onError: () => {
            toast({
                title: 'Gagal membuat produk',
                description: new Date().toDateString(),
            })
        }
    })

    return (
        <Dialog onOpenChange={() => setFilePreview('')}>
            <DialogTrigger asChild>
                <Button variant="default" size={"sm"}>Tambah</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Tambah Produk</DialogTitle>
                    <DialogDescription>
                        Silakan lengkapi detail produk dengan informasi yang akurat sebelum disimpan.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Formik onSubmit={(values, { resetForm }) => {
                        const fd = new FormData()

                        if (!!values.images) fd.append('images', values.images)

                        fd.append('name', values.name)
                        fd.append('description', values.description)
                        fd.append('price', values.price)
                        fd.append('isActive', values.isActive ? 'true' : 'false')
                        fd.append('stock', values.stock)
                        fd.append('weightGram', values.weightGram)

                        handleAddProduct(fd, {
                            onSuccess: () => {
                                resetForm({ values: initialValues })
                            }
                        })
                    }}
                        initialValues={initialValues}>
                        {({ setFieldValue, values }) => (
                            <Form className="space-y-3">
                                {filePreview && (
                                    <div>
                                        <Image alt="photos" width={500}
                                            height={500} src={filePreview} />
                                    </div>
                                )}

                                {!!values.images ? (
                                    <div className="w-full text-sm px-2 rounded-xl justify-between border flex py-2 items-center">
                                        <p>{values.images.name.length > 30 ?
                                            `${values.images.name.slice(0, 30)}...` : values.images.name}</p>
                                        <button onClick={() => {
                                            setFilePreview('')
                                            setFieldValue('images', null)
                                        }}>
                                            <MdCancel />
                                        </button>
                                    </div>
                                ) : (
                                    <Input type="file" accept="image/png, image/jpeg"
                                        onChange={(e) => handleChangeFile(e, setFieldValue)} />
                                )}

                                <Input placeholder="Nama Produk" name="name" onChange={(e) => {
                                    const value = e.target.value
                                    setFieldValue('name', value)
                                }} value={values.name || ''} />

                                <Input placeholder="Deskripsi" name="description" onChange={(e) => {
                                    const value = e.target.value
                                    setFieldValue('description', value)
                                }} value={values.description || ''} />

                                <Input placeholder="Harga" name="price" type="number"
                                    onChange={(e) => {
                                        let value = Number(e.target.value)
                                        if (value < 0) value = 0

                                        setFieldValue('price', value)
                                    }} value={values.price || ''} />

                                <Input placeholder="Stok" name="stock" type="number"
                                    onChange={(e) => {
                                        let value = Number(e.target.value)
                                        if (value < 0) value = 0

                                        setFieldValue('stock', value)
                                    }} value={values.stock || ''} />

                                <Input placeholder="Berat(kg)" name="weightGram" type="number"
                                    onChange={(e) => {
                                        let value = Number(e.target.value)
                                        if (value < 0) value = 0

                                        setFieldValue('weightGram', value)
                                    }} value={values.weightGram || ''} />

                                <div className="flex items-center space-x-2 py-3 px-2">
                                    <Label htmlFor="airplane-mode">Aktifkan produk ini?</Label>
                                    <Switch id="airplane-mode" value={!values.isActive ? -1 : 1}
                                        onCheckedChange={(val) => setFieldValue('isActive', val)} />
                                </div>

                                <div className="w-full justify-end flex">
                                    <Button type="submit" disabled={
                                        !values.images || !values.description || isPending ||
                                        !values.name || !values.price || !values.stock || !values.weightGram
                                    }>Save changes</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </DialogContent>
        </Dialog >
    )
}
