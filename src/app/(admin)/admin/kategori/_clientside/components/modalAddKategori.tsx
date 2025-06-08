import SelectOptionCategoryMotor from '@/app/(admin)/admin/kategori/_clientside/components/selectOptionCategoryMotor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Form, Formik } from 'formik';
import * as React from 'react'

export default function ModalAddKategori() {
    const [open, setOpen] = React.useState<boolean>(false)
    const [openSelectOption, setOpenSelectOption] = React.useState<boolean>(false)

    const [valueSelectOption, setValueSelectOption] = React.useState<string>('')

    return (
        <Dialog open={open} onOpenChange={(open) => {
            setOpen(open)
            setValueSelectOption('')
            setOpenSelectOption(false)
        }}>
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
                <Formik initialValues={{
                    categoryMotor: ''
                }}
                    onSubmit={(val) => console.log(val)}>
                    {({ setFieldValue, values }) => (
                        <Form className='space-y-3'>
                            <SelectOptionCategoryMotor open={openSelectOption} setFieldValue={setFieldValue}
                                setValue={setValueSelectOption} value={valueSelectOption}
                                setOpen={setOpenSelectOption} />

                            {values.categoryMotor === 'Lainnya' && (
                                <>
                                    <h1>Jenis Motor</h1>
                                    <h1>Tahun Rilis</h1>
                                </>
                            )}

                            <Input onChange={(e) => setFieldValue('categoryMotor', e.target.value)}
                                placeholder='masukan data' value={values.categoryMotor || ''} />

                            <Input onChange={(e) => setFieldValue('categoryMotor', e.target.value)}
                                placeholder='masukan data' value={values.categoryMotor || ''} />

                            <Input onChange={(e) => setFieldValue('categoryMotor', e.target.value)}
                                placeholder='masukan data' value={values.categoryMotor || ''} />

                            <Input onChange={(e) => setFieldValue('categoryMotor', e.target.value)}
                                placeholder='masukan data' value={values.categoryMotor || ''} />

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