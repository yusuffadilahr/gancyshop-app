import SelectOptionCategoryMotor from '@/app/(admin)/admin/kategori/_clients/components/selectOptionCategoryMotor';
import { IInitialValuesAddKategori } from '@/app/(admin)/admin/kategori/_clients/types';
import { createCategoryAction } from '@/app/(admin)/admin/kategori/_servers/services';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { checkCharacterValue } from '@/app/_clients/utils/sanitizeInput';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik, FormikErrors } from 'formik';
import * as React from 'react'

export default function ModalAddKategori({ refetch }: { refetch: () => void }) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [openSelectOption, setOpenSelectOption] = React.useState<boolean>(false)
    const [valueSelectOption, setValueSelectOption] = React.useState<string>('')

    const initialValues = {
        idCategoryMotor: '',
        motorCycleName: '',
        releaseYear: '',
        categoryName: ''
    } as IInitialValuesAddKategori

    const years = Array.from({ length: 50 }, (_, i) => `${(new Date().getFullYear() - 49) + i}`)
    const { mutate: handleAddKategori } = useMutation({
        mutationFn: async ({ fd }: { fd: FormData }) => {
            return await createCategoryAction(fd)
        },
        onSuccess: (res) => {
            if (res?.error) throw res

            toast({
                title: res?.message || 'Berhasil mengupload produk',
                description: new Date().toDateString(),
            })

            refetch()
        },
        onError: (err) => {
            console.log(err)
            toast({
                title: 'Gagal membuat kategori produk',
                description: new Date().toDateString(),
            })
        }
    })

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
        setValueSelectOption('')
        setOpenSelectOption(false)
    }

    const valueChange = (e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: string,
            shouldValidate?: boolean) => Promise<void | FormikErrors<IInitialValuesAddKategori>>,
        field: string) => {
        const { value } = e.target

        if (!checkCharacterValue(value) && value.length > 1) return
        setFieldValue(field, value)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default">Tambah</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Tambah Kategori</DialogTitle>
                    <DialogDescription>
                        Silakan lengkapi detail kategori dengan informasi yang akurat sebelum disimpan.
                    </DialogDescription>
                </DialogHeader>
                <Formik initialValues={initialValues}
                    onSubmit={(val, { resetForm }) => {
                        const fd = new FormData()

                        fd.append('idCategoryMotor', val.idCategoryMotor)
                        fd.append('motorCycleName', val.motorCycleName)
                        fd.append('releaseYear', val.releaseYear)
                        fd.append('categoryName', val.categoryName)

                        handleAddKategori({ fd }, {
                            onSuccess: () => {
                                resetForm()
                                setValueSelectOption('')
                                setOpen(false)
                            }
                        })
                    }}>
                    {({ setFieldValue, values }) => (
                        <Form className='space-y-3'>
                            <SelectOptionCategoryMotor open={openSelectOption} setFieldValue={setFieldValue}
                                setValue={setValueSelectOption} value={valueSelectOption}
                                setOpen={setOpenSelectOption} />

                            {values.idCategoryMotor === 'Lainnya' && (
                                <div className='space-y-3'>
                                    <Input onChange={(e) => valueChange(e, setFieldValue, 'motorCycleName')}
                                        placeholder='Masukkan Jenis Motor' value={values.motorCycleName || ''} />

                                    <Select onValueChange={(val) => setFieldValue('releaseYear', val)}
                                        value={values.releaseYear || ''}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Tahun Motor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={year}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <Input onChange={(e) => valueChange(e, setFieldValue, 'categoryName')}
                                placeholder='Masukkan Kategori' value={values.categoryName || ''} />

                            <div className='w-full justify-end flex'>
                                <Button type='submit'>Buat Kategori</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}