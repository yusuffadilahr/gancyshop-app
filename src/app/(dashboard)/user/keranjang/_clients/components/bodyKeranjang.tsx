"use client";

import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import TitleDashboardSection from "@/components/core/titleDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getShoppingCart } from "../../_servers/services";

interface ICategory {
  id: number;
  categoryMotorcycleId: number;
  categoryName: string;
  createdAt: string; // ISO Date
  updatedAt: string | null;
  deletedAt: string | null;
}

interface IProduct {
  id: number;
  category: ICategory;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  weightGram: number;
  imageUrl: string;
  fileId: number | null;
  ownerId: number;
  isActive: boolean;
  createdAt: string; // ISO Date
  updatedAt: string | null;
  deletedAt: string | null;
}

interface IDataCartProduct {
  id: number;
  userId: number;
  productId: number;
  product: IProduct;
  price: number; // harga produk saat masuk cart
  quantity: number;
  totalPrice: number; // price * quantity
  createdAt: string; // ISO Date
  updatedAt: string | null; // ISO Date
  deletedAt: string | null;
}

export default function BodyKeranjang() {
  const { data: dataCartUser } = useQuery<IDataCartProduct[]>({
    queryKey: ["get_cart"],
    queryFn: async () => {
      const res = await getShoppingCart();
      return res?.data;
    },
  });

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
              <div className="mt-4 space-y-5">
                {dataCartUser?.map((item, i: number) => {
                  const dataProduct = item?.product;
                  const dataCategory = item?.product?.category;

                  return (
                    <div className="flex items-center gap-2" key={i}>
                      <div className="w-14 h-14 border flex items-center rounded-xl">
                        <Image
                          height={500}
                          width={500}
                          alt="produk"
                          src={dataProduct?.imageUrl || "/no-data.png"}
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex w-full justify-between items-center">
                        <div>
                          <h1 className="font-semibold">
                            {dataProduct?.name || "-"}
                          </h1>
                          <p className="text-sm text-neutral-400">
                            {dataCategory?.categoryName || "-"}
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
                  );
                })}
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
