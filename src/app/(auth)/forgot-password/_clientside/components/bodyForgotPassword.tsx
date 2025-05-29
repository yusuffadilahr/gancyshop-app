'use client'

import { useMutateForgotPassword } from "@/app/(auth)/forgot-password/_clientside/hooks/use-mutate";
import CardAuthLayout from "@/components/core/cardAuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/utils/schemas";
import { ErrorMessage, Form, Formik } from "formik";
import Link from "next/link";

export default function BodyForgotPassword() {
    const { handleForgotPassword, initialValues, isPending } = useMutateForgotPassword()

    return (
        <div className="w-full justify-center items-center flex">
            <CardAuthLayout
                title="Lupa Kata Sandi"
                descriptionTitle="Masukkan alamat email akun Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.">
                <Formik
                    initialValues={initialValues}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={(values, { resetForm }) => {
                        const fd = new FormData()

                        fd.append('email', values.email)
                        handleForgotPassword(fd, {
                            onSuccess: () => {
                                resetForm({ values: initialValues })
                            }
                        })
                    }}>
                    {({ values, setFieldValue }) => (
                        <Form className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    value={values.email}
                                    onChange={(e) => setFieldValue("email", e.target.value)}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                            </div>
                            <Button className="w-full" type="submit" disabled={isPending || !values.email}>
                                Kirim Permintaan
                            </Button>
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
                        Belum punya akun? <Link href="/auth/register" className="text-blue-500 underline">Daftar Sekarang</Link>
                    </p>
                </div>
            </CardAuthLayout>
        </div>
    );
}