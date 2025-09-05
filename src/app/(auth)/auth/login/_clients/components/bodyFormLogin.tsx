"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage, Form, Formik } from "formik";
import { useLoginHooks } from "@/app/(auth)/auth/login/_clients/hooks/use-mutate";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import Image from "next/image";
import CardAuthLayout from "@/components/core/cardAuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as React from "react";
import { formLoginSchema } from "@/app/(auth)/auth/login/_clients/schemas/formLoginSchema";

export default function BodyLogin() {
  const [isHiddenPassword, setIsHiddenPassword] =
    React.useState<boolean>(false);

  const { handleLogin, initialValues, isPending } = useLoginHooks();

  return (
    <main className="flex items-center">
      <section className="w-1/2 hidden md:items-stretch md:flex">
        <Image
          src={"/login-left-section.png"}
          width={500}
          alt="png"
          height={500}
          className="w-full"
        />
      </section>
      <CardAuthLayout
        descriptionTitle="Kelola pesananmu dan kebutuhan suku cadang Anda."
        title="Masuk ke akun anda"
      >
        <Formik
          onSubmit={(values, { resetForm }) => {
            handleLogin(
              {
                email: values.email,
                password: values.password,
              },
              { onSuccess: () => resetForm({ values: initialValues }) }
            );
          }}
          initialValues={initialValues}
          validationSchema={formLoginSchema}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-2">
              <div>
                <Input
                  placeholder="example@gmail.com"
                  name="email"
                  type="email"
                  value={values.email || ""}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-[11px] px-1 mt-1 text-red-500"
                />
              </div>

              <div className="relative">
                <div>
                  <Input
                    placeholder="******"
                    name="password"
                    type={isHiddenPassword ? "text" : "password"}
                    value={values.password || ""}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-[11px] px-1 mt-1 text-red-500"
                  />
                </div>

                <Button
                  variant={"link"}
                  className="absolute right-0 top-0 w-fit"
                  type="button"
                  onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                >
                  {isHiddenPassword ? (
                    <FaEye className="text-neutral-500" />
                  ) : (
                    <FaEyeSlash className="text-neutral-500" />
                  )}
                </Button>
              </div>

              {isPending ? (
                <Spinner />
              ) : (
                <Button
                  variant={"default"}
                  className="w-full"
                  size={"lg"}
                  type="submit"
                  disabled={isPending || !values.email || !values.password}
                >
                  Masuk
                </Button>
              )}
            </Form>
          )}
        </Formik>
        <div className="flex w-full justify-center items-center flex-col">
          <h1 className="py-2 text-sm text-gray-500">Atau</h1>
          <div className="flex gap-2 w-full">
            <Link href="/auth/register" className="w-full">
              <Button
                variant={"outline"}
                className="w-full"
                size={"lg"}
                disabled={isPending}
              >
                Registrasi Akun
              </Button>
            </Link>
            <Link href="/forgot-password" className="w-full">
              <Button
                variant={"outline"}
                className="w-full"
                size={"lg"}
                disabled={isPending}
              >
                Lupa Password?
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-center text-sm text-gray-600">
            Dengan membuat akun, Anda menyetujui{" "}
            <Link href="/terms" className="text-blue-500 underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/privacy" className="text-blue-500 underline">
              Kebijakan Privasi
            </Link>{" "}
            kami.
          </p>
        </div>
      </CardAuthLayout>
    </main>
  );
}
