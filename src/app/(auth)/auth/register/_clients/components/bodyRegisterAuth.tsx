'use client'

import { useMutateRegister } from "@/app/(auth)/auth/register/_clients/hooks/use-mutate";
import CardAuthLayout from "@/components/core/cardAuthLayout";
import { PhoneInput } from "@/components/core/phoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Form, Formik } from "formik";
import Link from "next/link";

export default function BodyRegister() {
    const { initialValues,
        handleRegister,
        isPending } = useMutateRegister()

    return (
        <div className="w-full justify-center items-center flex min-h-20 h-fit">
            <CardAuthLayout title="Buat akun anda disini"
                descriptionTitle="Daftar sekarang untuk memesan dan mengelola suku cadang Anda.">
                <Formik onSubmit={(values, { resetForm }) => {
                    const phoneNumberValue = values.phoneNumber.split('+')[1]
                    const fd = new FormData()

                    fd.append('firstName', values.firstName)
                    fd.append('lastName', values.lastName)
                    fd.append('email', values.email)
                    fd.append('phoneNumber', phoneNumberValue)

                    handleRegister(fd, {
                        onSuccess: () => {
                            resetForm({ values: initialValues })
                        }
                    })
                }} initialValues={initialValues}>
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Input placeholder="John" name="firstName" type="text" value={values.firstName || ''}
                                    onChange={(e) => setFieldValue('firstName', e.target.value)} />
                                <Input placeholder="Doe" name="lastName" type="text" value={values.lastName || ''}
                                    onChange={(e) => setFieldValue('lastName', e.target.value)} />
                            </div>
                            <Input placeholder="example@gmail.com" name="email" type="email" value={values.email || ''}
                                onChange={(e) => setFieldValue('email', e.target.value)} />
                            <PhoneInput onChange={(value) => setFieldValue('phoneNumber', value)} value={values.phoneNumber}
                                defaultCountry="ID" />
                            {isPending ?
                                <Spinner />
                                :
                                <Button variant={"default"} className="w-full" size={"lg"} type="submit"
                                    disabled={isPending || !values.email || !values.firstName || !values.lastName || !values.phoneNumber}>Registrasi</Button>}
                        </Form>
                    )}
                </Formik>
                <div className="flex w-full justify-center items-center flex-col">
                    <h1 className="py-2 text-sm text-gray-500">Atau</h1>
                    <Link href='/auth/login' className="w-full">
                        <Button variant="outline" className="w-full" size="lg">
                            Masuk ke Akun
                        </Button>
                    </Link>
                    <p className="mt-3 text-center text-sm text-gray-600">
                        Dengan membuat akun, Anda menyetujui <Link href="/terms" className="text-blue-500 underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-blue-500 underline">Kebijakan Privasi</Link> kami.
                    </p>
                </div>

            </CardAuthLayout>
        </div>
    );
}