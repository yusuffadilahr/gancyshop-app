"use client";

import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import TitleDashboardSection from "@/components/core/titleDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function BodyKeranjang() {
  return (
    <DashboardContentLayout>
      <TitleDashboardSection
        titleMenuDashboard="Keranjang"
        description="Kelola keranjang anda"
      />
      <div className="grid grid-cols-12 gap-2 w-full">
        <div className="col-span-12 md:col-span-5 w-full">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Keranjang</CardTitle>
              <p className="text-sm text-neutral-400">Kelola keranjang anda</p>
            </CardHeader>
            <CardContent>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-14 h-14 border flex items-center rounded-xl">
                    <Image
                      height={500}
                      width={500}
                      alt="produk"
                      src="/beat.jpg"
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <div>
                      <h1 className="font-semibold">Nama Produk</h1>
                      <p className="text-sm text-neutral-400">
                        Kategori Produk
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        -
                      </Button>
                      <Badge variant="outline">1</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-7">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Detail Produk</CardTitle>
              <p className="text-sm text-neutral-400">
                Harap diperhatikan detail produk disini
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <Image
                  src={"/no-data.png"}
                  alt="no-data"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-full">
                <Button className="w-full">Checkout</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardContentLayout>
  );
}
