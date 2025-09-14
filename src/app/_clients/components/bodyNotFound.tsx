"use client";
import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useNotFound } from "../hooks/use-not-found";

export default function NotFound() {
  const { router, isClient } = useNotFound();
  if (typeof window === "undefined") return null;

  return (
    <React.Fragment>
      {isClient && (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
          <div className="max-w-md w-full">
            <Image
              src="/no-data.png"
              alt="No data illustration"
              width={400}
              height={400}
              className="mx-auto"
              priority
            />
            <h1 className="text-3xl font-bold text-red-600 mt-4">
              Oops! Halaman tidak ditemukan
            </h1>
            <p className="text-gray-600 mt-2">
              Sepertinya halaman yang kamu cari tidak tersedia atau sudah
              dipindahkan.
            </p>
            <div className="md:flex md:space-y-0 space-y-3 py-3 items-center justify-center space-x-3">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => router.push("/")}
              >
                Kembali ke Beranda
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Coba Halaman Sebelumnya
              </Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
