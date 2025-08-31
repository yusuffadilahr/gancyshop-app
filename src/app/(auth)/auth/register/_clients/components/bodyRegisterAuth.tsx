'use client'

import { useMutateRegister } from "@/app/(auth)/auth/register/_clients/hooks/use-mutate";
import { formRegisterSchema } from "@/app/(auth)/auth/register/_clients/schemas/formRegisterSchema";
import CardAuthLayout from "@/components/core/cardAuthLayout";
import { PhoneInput } from "@/components/core/phoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ErrorMessage, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function BodyRegister() {
    const [isHiddenPassword, setIsHiddenPassword] = useState<{
        pass: boolean; confPass: boolean
    }>({ pass: false, confPass: false })

    const { initialValues, handleRegister, isPending } = useMutateRegister()

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
                    fd.append('password', values.password)

                    handleRegister(fd, {
                        onSuccess: () => { resetForm({ values: initialValues }) }
                    })
                }} initialValues={initialValues}
                    validationSchema={formRegisterSchema}>
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-2">
                            <div className="flex sm:flex-row flex-col items-center gap-2">
                                <div className="w-full">
                                    <Input placeholder="John" name="firstName" type="text" value={values.firstName || ''}
                                        onChange={(e) => setFieldValue('firstName', e.target.value)} />
                                    <ErrorMessage name="firstName" component='p'
                                        className="text-[11px] px-1 mt-1 text-red-500" />
                                </div>

                                <div className="w-full">
                                    <Input placeholder="Doe" name="lastName" type="text" value={values.lastName || ''}
                                        onChange={(e) => setFieldValue('lastName', e.target.value)} />
                                    <ErrorMessage name="lastName" component='p'
                                        className="text-[11px] px-1 mt-1 text-red-500" />
                                </div>
                            </div>

                            <div>
                                <Input placeholder="example@gmail.com" name="email" type="email" value={values.email || ''}
                                    onChange={(e) => setFieldValue('email', e.target.value)} />
                                <ErrorMessage name="email" component='p'
                                    className="text-[11px] px-1 mt-1 text-red-500" />
                            </div>

                            <div>
                                <div className="relative">
                                    <Input placeholder="******" name="password" type={
                                        isHiddenPassword.pass ? 'text' : "password"
                                    } value={values.password || ''}
                                        onChange={(e) => setFieldValue('password', e.target.value)} />

                                    <Button variant={"link"} className="absolute right-0 top-0 w-fit" type="button"
                                        onClick={() => setIsHiddenPassword(prev => ({ ...prev, pass: !isHiddenPassword.pass }))}>
                                        {isHiddenPassword.pass ? <FaEye className="text-neutral-500" /> :
                                            <FaEyeSlash className="text-neutral-500" />}
                                    </Button>
                                </div>
                                <ErrorMessage name="password" component='p'
                                    className="text-[11px] px-1 mt-1 text-red-500" />
                            </div>

                            <div>
                                <div className="relative">
                                    <Input placeholder="******" name="confPassword" type={
                                        isHiddenPassword.confPass ? 'text' : "password"
                                    } value={values.confPassword || ''}
                                        onChange={(e) => setFieldValue('confPassword', e.target.value)} />

                                    <Button variant={"link"} className="absolute right-0 top-0 w-fit" type="button"
                                        onClick={() => setIsHiddenPassword(prev => ({ ...prev, confPass: !isHiddenPassword.confPass }))}>
                                        {isHiddenPassword.confPass ? <FaEye className="text-neutral-500" /> :
                                            <FaEyeSlash className="text-neutral-500" />}
                                    </Button>
                                </div>
                                <ErrorMessage name="confPassword" component='p'
                                    className="text-[11px] px-1 mt-1 text-red-500" />
                            </div>


                            <div>
                                <PhoneInput name="phoneNumber" onChange={(value) => setFieldValue('phoneNumber', value)}
                                    value={values.phoneNumber}
                                    defaultCountry="ID" />

                                <ErrorMessage name="phoneNumber" component='p'
                                    className="text-[11px] px-1 mt-1 text-red-500" />
                            </div>
                            {isPending ?
                                <Spinner />
                                :
                                <Button variant={"default"} className="w-full" size={"lg"} type="submit"
                                    disabled={isPending || !values.email || !values.firstName
                                        || !values.lastName || values.phoneNumber.length <= 10 || !values.password
                                        || !values.confPassword}
                                >Registrasi</Button>}
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