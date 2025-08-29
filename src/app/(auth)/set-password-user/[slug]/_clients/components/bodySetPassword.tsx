'use client'

import { useMutateSetPassword } from "@/app/(auth)/set-password-user/[slug]/_clients/hooks/use-mutate";
import CardAuthLayout from "@/components/core/cardAuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setPasswordSchema } from "@/app/_clients/utils/schemas";
import { ErrorMessage, Form, Formik } from "formik";
import Link from "next/link";

export default function BodySetPassword({ tokenSlug }: { tokenSlug: string }) {
    const { handleSetPassword,
        initialValues, isPending
    } = useMutateSetPassword(tokenSlug)

    return (
        <div className="w-full justify-center flex items-center">
            <CardAuthLayout
                title="Atur Ulang Kata Sandi"
                descriptionTitle="Masukkan kata sandi baru yang aman dan mudah Anda ingat. Pastikan Anda tidak membagikannya kepada siapa pun.">
                <Formik onSubmit={(values, { resetForm }) => {
                    const fd = new FormData()

                    fd.append('password', values.password)
                    handleSetPassword(fd, {
                        onSuccess: () => {
                            resetForm({ values: initialValues })
                        }
                    })
                }}
                    initialValues={initialValues}
                    validationSchema={setPasswordSchema}>
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-3">
                            <div className="space-y-2">
                                <Input name="password" type="password" placeholder="*******"
                                    onChange={(e) => setFieldValue('password', e.target.value)} value={values.password || ''} />
                                <ErrorMessage name="password" component={'div'} className="text-red-500 text-xs" />
                            </div>
                            <div className="space-y-2">
                                <Input name="confirm_password" type="password" placeholder="*******"
                                    onChange={(e) => setFieldValue('confirm_password', e.target.value)} value={values.confirm_password || ''} />
                                <ErrorMessage name="confirm_password" component={'div'} className="text-red-500 text-xs" />
                            </div>
                            <Button className="w-full" type="submit"
                                disabled={isPending}>Konfirmasi</Button>
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
                        Dengan melanjutkan, Anda menyetujui <Link href="/terms" className="text-blue-500 underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-blue-500 underline">Kebijakan Privasi</Link> kami.
                    </p>
                </div>
            </CardAuthLayout>
        </div>
    );
}