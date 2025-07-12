import { IDataCategoryName, IModalAddProductProps } from "@/app/(admin)/admin/produk/_clientside/types";
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
import { Form, Formik } from "formik";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import * as React from "react";
import SelectOptionCategoryMotorSearch from "@/app/(admin)/admin/produk/_clientside/components/selectOptionCategoryMotor";
import SelectOptionCategorySearch from "@/app/(admin)/admin/produk/_clientside/components/selectOptionCategory";
import { handleGetDataCategoryByCategoryMotor } from "@/app/(admin)/admin/produk/_serverside/action";

export default function ModalAddProduct({
    initialValues,
    handleAddProduct,
    isPending,
    filePreview,
    setFilePreview,
    handleChangeFile,
}: IModalAddProductProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [valueSelectOption, setValueSelectOption] = React.useState<{
        categoryMotor: string
        category: string
    }>({
        categoryMotor: '',
        category: ''
    })
    const [dataCategory, setDataCategory] = React.useState<IDataCategoryName[]>([])

    const handleGetData = async (id: string) => {
        try {
            const res = await handleGetDataCategoryByCategoryMotor(id)
            if (!res.error) {
                setDataCategory(res.data)
            }
        } catch (error) {
            setDataCategory([])
            console.log(error)
        }
    }

    return (
        <Dialog onOpenChange={() => {
            setValueSelectOption({
                categoryMotor: '',
                category: ''
            })
            setFilePreview('')
        }}>
            <DialogTrigger asChild>
                <Button variant="default" size={"default"}>Tambah</Button>
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
                        fd.append('isActive', values.isActive === true ? 'true' : 'false')
                        fd.append('stock', values.stock)
                        fd.append('weightGram', values.weightGram)
                        fd.append('categoryId', values.categoryId)

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

                                <SelectOptionCategoryMotorSearch open={open} setFieldValue={setFieldValue}
                                    setValue={setValueSelectOption} value={valueSelectOption}
                                    handleGetDataCategoryByCategoryMotor={handleGetData}
                                    setOpen={setOpen} />


                                {!!valueSelectOption.categoryMotor && (
                                    <SelectOptionCategorySearch data={dataCategory}
                                        setFieldValue={setFieldValue}
                                        setValueDisplay={setValueSelectOption}
                                        valueDisplay={valueSelectOption} />
                                )}

                                <div className="flex items-center space-x-2 py-3 px-2">
                                    <Label htmlFor="airplane-mode">Aktifkan produk ini?</Label>
                                    <Switch id="airplane-mode" value={!values.isActive ? -1 : 1}
                                        onCheckedChange={(val) => setFieldValue('isActive', val)} />
                                </div>

                                <div className="w-full justify-end flex">
                                    <Button type="submit" disabled={
                                        !values.images || !values.description || isPending ||
                                        !values.name || !values.price || !values.stock || !values.weightGram
                                    }>Buat Produk</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </DialogContent>
        </Dialog>
    )
}
