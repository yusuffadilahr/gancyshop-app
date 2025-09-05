import { useMutateEditProduct } from "@/app/(dashboard)/admin/produk/_clients/hooks/use-mutate-edit-product";
import { IModalEditProductProps } from "@/app/(dashboard)/admin/produk/_clients/types";
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
import {
    Form, Formik,
} from "formik";
import Image from "next/image";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function ModalEditProduct({
    dataTable,
    onClick,
    filePreview,
    setFilePreview,
    handleChangeFile,
    refetch
}: IModalEditProductProps) {
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { initialValuesEditProduct,
        handleEditProduct,
        validatEditProduct } = useMutateEditProduct({ dataTable, refetch, setOpenDialog })

    return (
        <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
            <DialogTrigger asChild>
                <Button className="w-full flex justify-start"
                    variant={"ghost"} size={"sm"} onClick={onClick}>
                    <FaEdit className="mr-1 font-normal" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Edit Produk</DialogTitle>
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
                        fd.append('isActive', values.isActive === true ? 'true' : 'false')
                        fd.append('stock', values.stock)
                        fd.append('weightGram', values.weightGram)

                        handleEditProduct({ fd, idProduct: dataTable?.id as number }, {
                            onSuccess: () => {
                                resetForm({ values: initialValuesEditProduct })
                            }
                        })
                    }}
                        initialValues={initialValuesEditProduct}>
                        {({ setFieldValue, values }) => (
                            <Form className="space-y-3">
                                {filePreview ? (
                                    <div>
                                        <Image alt="photos" width={500}
                                            height={500} src={filePreview} />
                                    </div>
                                ) : <div>
                                    <Image alt="photos" width={500}
                                        height={500} src={dataTable?.imageUrl || ''} />
                                </div>}

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
                                        onChange={(e) => handleChangeFile(e, setFieldValue)}
                                    />
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

                                <div className="w-full justify-end flex">
                                    <Button type="submit"
                                        disabled={validatEditProduct(values)}
                                    >Save changes</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </DialogContent>
        </Dialog>
    )
}
