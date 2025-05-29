'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, Formik } from 'formik'
import { useLoginHooks } from "@/app/(auth)/auth/login/_clientside/hooks/use-mutate"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import Image from "next/image"
import CardAuthLayout from "@/components/core/cardAuthLayout"

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY
export default function BodyLogin() {
    const { handleLogin, initialValues,
        isPending } = useLoginHooks({ secretKey: secretKey as string })

    return (
        <main className="flex items-center">

            <section className="w-1/2 hidden md:items-stretch md:flex">
                <Image src={'/login-left-section.png'} width={500} alt="png"
                    height={500} className="w-full" />
            </section>
            <CardAuthLayout descriptionTitle="Kelola pesananmu dan kebutuhan suku cadang Anda."
                title="Masuk ke akun anda">
                <Formik onSubmit={(values, { resetForm }) => {
                    const fd = new FormData()

                    fd.append('email', values.email)
                    fd.append('password', values.password)

                    handleLogin(fd, {
                        onSuccess: (res) => {
                            if (!res.error) {
                                resetForm({ values: initialValues })
                            }
                        }
                    })
                }} initialValues={initialValues}>
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-2">
                            <Input placeholder="example@gmail.com" name="email" type="email" value={values.email || ''}
                                onChange={(e) => setFieldValue('email', e.target.value)} />

                            <Input placeholder="******" name="password" type="password" value={values.password || ''}
                                onChange={(e) => setFieldValue('password', e.target.value)} />

                            {isPending ?
                                <Spinner />
                                :
                                <Button variant={"default"} className="w-full" size={"lg"} type="submit"
                                    disabled={isPending || !values.email || !values.password}>Masuk</Button>}
                        </Form>
                    )}
                </Formik>
                <div className="flex w-full justify-center items-center flex-col">
                    <h1 className="py-2 text-sm text-gray-500">Atau</h1>
                    <div className="flex gap-2 w-full">
                        <Link href='/auth/register' className="w-full">
                            <Button variant={"outline"} className="w-full"
                                size={"lg"} disabled={isPending}>Registrasi Akun</Button>
                        </Link>
                        <Link href='/forgot-password' className="w-full">
                            <Button variant={"outline"} className="w-full"
                                size={"lg"} disabled={isPending}>Lupa Password?</Button>
                        </Link>
                    </div>
                    <p className="mt-3 text-center text-sm text-gray-600">
                        Dengan membuat akun, Anda menyetujui <Link href="/terms" className="text-blue-500 underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-blue-500 underline">Kebijakan Privasi</Link> kami.
                    </p>
                </div>
            </CardAuthLayout>
        </main>
    );
}