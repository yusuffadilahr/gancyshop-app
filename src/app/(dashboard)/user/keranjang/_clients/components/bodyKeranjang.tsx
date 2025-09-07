"use client";
import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import TitleDashboardSection from "@/components/core/titleDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  getShoppingCart,
  removeCartProduct,
  summarizeQuantityCart,
} from "../../_servers/services";
import { Fragment, useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, Package } from "lucide-react";
import {
  formatRupiah,
  formatWeight,
} from "@/app/_clients/utils/formatConverter";
import { IDataCartProduct } from "../types";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Form, Formik } from "formik";
import { Textarea } from "@/components/ui/textarea";
import CardFilterLayout from "@/app/_clients/components/cardFilterLayout";
import InputSearch from "@/components/core/inputSearch";

export default function BodyKeranjang() {
  const [idCart, setIdCart] = useState<number | null>(null);
  const { data: dataCartUser, refetch } = useQuery<IDataCartProduct[]>({
    queryKey: ["get_cart"],
    queryFn: async () => {
      const res = await getShoppingCart();
      return res?.data;
    },
  });

  const { mutate: handleRemoveCart } = useMutation({
    mutationFn: async (cartId: number) => {
      const res = await removeCartProduct(cartId);
      return res;
    },

    onSuccess: (res) => {
      if (res?.error) throw res;
      refetch();
      toast({
        title: res.message || "Berhasil menghapus data cart",
        description: new Date().toDateString(),
      });
    },

    onError: () => {
      toast({
        title: "Gagal menghapus data cart",
        description: new Date().toDateString(),
      });
    },
  });

  const { mutate: handleSummarizeCart } = useMutation({
    mutationFn: async ({
      cartId,
      summarize,
    }: {
      cartId: number;
      summarize: "plus" | "minus";
    }) => {
      const fd = new FormData();
      fd.append("summarize", summarize);
      fd.append("cartId", String(cartId));

      const res = await summarizeQuantityCart(fd);
      return res;
    },

    onSuccess: (res) => {
      if (res?.error) throw res;
      refetch();
    },

    onError: (err) => {
      toast({
        title: err?.message || "Gagal menghapus data cart",
        description: new Date().toDateString(),
      });
    },
  });

  const dataDetailCart =
    dataCartUser?.find((cart) => cart?.id === idCart) ||
    dataCartUser?.[0] ||
    undefined;

  const totalCartValue =
    dataCartUser?.reduce((total, item) => total + item.totalPrice, 0) || 0;

  const totalItems =
    dataCartUser?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <DashboardContentLayout>
      <TitleDashboardSection
        titleMenuDashboard="Keranjang"
        description="Kelola keranjang belanja anda dengan mudah"
      />

      <CardFilterLayout>
        <div className="flex flex-col sm:flex-row gap-4">
          <InputSearch
            loadingSearch={
              false
              // searchData?.loading
            }
            // searchParams={params}
            onChange={(e) => {
              const { value } = e.target;
              console.log(value);

              // setSearchData((prev) => ({
              //   ...prev,
              //   loading: true,
              //   display: value,
              // }));
              // debounce(value);
            }}
          />
        </div>
      </CardFilterLayout>

      <div className="grid grid-cols-12 gap-6 w-full">
        <div className="col-span-12 lg:col-span-7 space-y-4">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-800">
                    Keranjang Belanja
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {totalItems} item dalam keranjang
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {dataCartUser && dataCartUser.length > 0 ? (
                <div className="space-y-4">
                  {dataCartUser?.map((item, i: number) => {
                    const dataProduct = item?.product;
                    const dataCategory = item?.product?.category;
                    const isSelected = item?.id === idCart;

                    return (
                      <div
                        key={i}
                        className={`p-4 border rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer ${
                          isSelected
                            ? "border-blue-200 bg-blue-50/50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setIdCart(item?.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 border-2 border-gray-100 flex items-center rounded-xl overflow-hidden bg-gray-50">
                              <Image
                                height={500}
                                width={500}
                                alt="produk"
                                src={dataProduct?.imageUrl || "/no-data.png"}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            {dataProduct?.stock && dataProduct.stock < 10 && (
                              <Badge
                                variant="destructive"
                                className="absolute -top-2 -right-2 text-xs px-1 py-0"
                              >
                                Stok rendah
                              </Badge>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div className="space-y-1">
                                <h4 className="font-semibold text-gray-800 line-clamp-2">
                                  {dataProduct?.name || "-"}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {dataCategory?.categoryName || "-"}
                                  </Badge>
                                  {dataProduct?.isActive && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs text-green-600 border-green-200"
                                    >
                                      Tersedia
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                onClick={() => handleRemoveCart(item?.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">
                                  {formatRupiah(item?.price)} × {item?.quantity}
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {formatRupiah(item?.totalPrice)}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                                  disabled={item?.quantity === 1}
                                  onClick={() =>
                                    handleSummarizeCart({
                                      cartId: item?.id,
                                      summarize: "minus",
                                    })
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Badge
                                  variant="outline"
                                  className="px-3 py-1 font-medium"
                                >
                                  {item?.quantity || 1}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 hover:bg-green-50 hover:border-green-200"
                                  onClick={() =>
                                    handleSummarizeCart({
                                      cartId: item?.id,
                                      summarize: "plus",
                                    })
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Keranjang Kosong
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Belum ada produk yang ditambahkan ke keranjang
                  </p>
                  <Link href="/product" prefetch={false}>
                    <Button variant={"destructive"}>Mulai Belanja</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cart Summary */}
          {dataCartUser && dataCartUser.length > 0 && (
            <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-blue-100">Total Pembayaran</p>
                    <p className="text-2xl font-bold">
                      {formatRupiah(totalCartValue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100">{totalItems} item</p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  Beli Semua & Lanjutkan Pembayaran
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="col-span-12 lg:col-span-5">
          <Card className="shadow-sm border-0 bg-white sticky top-4">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg text-gray-800">
                    Detail Belanja
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {dataDetailCart
                      ? "Informasi lengkap produk terpilih"
                      : "Pilih produk untuk melihat detail"}
                  </p>
                </div>
                <ShoppingCart />
              </div>
            </CardHeader>
            <CardContent className="space-y-7 mt-5">
              {dataDetailCart ? (
                <Fragment>
                  <div className="space-y-2">
                    <h1 className="font-semibold">Detail Produk</h1>
                    <div className="grid grid-cols-12 gap-2">
                      {[
                        {
                          title: "Nama Produk",
                          content: dataDetailCart?.product?.name || "-",
                        },
                        {
                          title: "Nama Kategori",
                          content:
                            dataDetailCart?.product?.category?.categoryName ||
                            "-",
                        },
                        {
                          title: "Berat",
                          content: dataDetailCart?.product?.weightGram || "-",
                        },
                      ].map((detail, i) => (
                        <Fragment key={i}>
                          <div className="col-span-12 md:col-span-4">
                            <p className="text-sm">{detail?.title || "-"}</p>
                          </div>
                          <div className="col-span-12 md:col-span-8">
                            {detail?.title === "Nama Produk" ? (
                              <Badge>{detail?.content || "-"}</Badge>
                            ) : detail?.title === "Berat" ? (
                              <Badge>
                                {formatWeight(Number(detail?.content) || 0) ||
                                  "-"}
                              </Badge>
                            ) : (
                              <p className="text-sm">
                                {detail?.content || "-"}
                              </p>
                            )}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h1 className="font-semibold">Total Pembayaran</h1>
                    {[
                      { title: "Harga", content: dataDetailCart?.price },
                      { title: "Kuantitas", content: dataDetailCart?.quantity },
                      {
                        title: "Total Harga",
                        content: dataDetailCart?.totalPrice,
                      },
                    ].map((item, i) => {
                      return (
                        <div
                          className="flex justify-between items-center"
                          key={i}
                        >
                          <p className="text-sm">{item?.title || "-"}</p>
                          <p className="text-sm">
                            {(item?.title === "Harga" ||
                              item?.title === "Total Harga") &&
                            item?.content
                              ? formatRupiah(item?.content)
                              : item?.title === "Kuantitas"
                              ? `${item?.content || " "}x`
                              : item?.content || "-"}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <h1 className="font-semibold">Detail Alamat</h1>
                    <Formik onSubmit={() => {}} initialValues={{ address: "" }}>
                      {({ setFieldValue, values }) => (
                        <Form className="space-y-3">
                          <Textarea
                            onChange={(e) => {
                              const { value } = e.target;
                              setFieldValue("address", value);
                            }}
                            value={values?.address || ""}
                            name="address"
                            id="address"
                            required
                            placeholder="Harap masukkan alamat anda dengan benar"
                          />

                          <Button
                            className="w-full font-semibold"
                            type="submit"
                            disabled={!values.address}
                          >
                            Bayar Sekarang
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Fragment>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Pilih Produk
                  </h3>
                  <p className="text-gray-500">
                    Klik salah satu produk di keranjang untuk melihat detail
                    lengkapnya
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardContentLayout>
  );
}
