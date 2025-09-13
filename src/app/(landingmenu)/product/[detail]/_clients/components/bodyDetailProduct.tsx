"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ZoomIn,
  CircleArrowOutUpRight,
  Package,
  Weight,
  ShoppingCart,
  Share2,
  Heart,
  Star,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { decryptParams } from "@/app/_clients/utils/secureParams";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCart,
  getDataProductById,
} from "@/app/(landingmenu)/product/[detail]/_servers/services";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  formatRupiah,
  formatWeight,
} from "@/app/_clients/utils/formatConverter";
import { IBodyProductDetailProps, IProduct } from "../types";

export default function BodyProduct({ idProduct }: IBodyProductDetailProps) {
  const [zoomIn, setZoomIn] = useState<number>(1);
  const idProductDecrypted = decryptParams(idProduct) || undefined;
  const router = useRouter();

  const {
    data: dataProduct,
    refetch,
    // isLoading: isLoadingGetProduct
  } = useQuery<IProduct>({
    queryKey: ["get-product"],
    queryFn: async () => {
      return (await getDataProductById(idProductDecrypted))?.data;
    },
  });

  console.log(dataProduct, "<< data product");

  const { mutate: handleAddToCart, isPending } = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append("productId", String(dataProduct?.id));
      fd.append("quantity", "1");
      fd.append("price", String(dataProduct?.price));

      return await addToCart(fd);
    },

    onSuccess: (res) => {
      if (res?.error) throw res;

      refetch();
      toast({
        title: res?.message || "Berhasil memasukan data ke keranjang.",
        description: new Date().toDateString(),
      });
    },

    onError: (err) => {
      toast({
        title: err?.message || "Gagal memasukan data ke keranjang.",
        description: new Date().toDateString(),
      });
    },
  });

  const findQuantityInCart = dataProduct?.cart?.find(
    (c) => c.productId === dataProduct?.id
  );

  const handleNavigateToCart = () => router.push("/user/keranjang");

  return (
    <div className="w-full p-3 h-fit">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-7">
          <Card className="border-none shadow-none">
            <CardContent>
              <div className="flex justify-center overflow-hidden items-center w-full relative">
                <Image
                  src={dataProduct?.imageUrl || "/no-data.png"}
                  width={500}
                  height={500}
                  alt="Produk"
                  className="object-cover w-[500px] h-[650px] max-h-[650px] 
                  transition-transform duration-300 ease-in-out z-50"
                  style={{ transform: `scale(${zoomIn})` }}
                />

                <div className="absolute top-5 left-0">
                  <Badge
                    variant={dataProduct?.isActive ? "default" : "destructive"}
                  >
                    {dataProduct?.isActive ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </div>

                <div className="flex gap-2 absolute right-0 top-5">
                  <Button
                    type="button"
                    onClick={() => window.open(dataProduct?.imageUrl)}
                    className="flex gap-2 cursor-pointer"
                    size="sm"
                  >
                    <CircleArrowOutUpRight />
                  </Button>

                  <Button
                    type="button"
                    onMouseEnter={() => setZoomIn(1.5)}
                    onMouseLeave={() => setZoomIn(1)}
                    className="flex gap-2 cursor-pointer"
                    size="sm"
                  >
                    <ZoomIn />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-5">
          <Card className="sticky top-4">
            <CardHeader className="border-b">
              <div className="flex justify-between w-full items-center">
                <div>
                  <CardTitle className="text-lg text-gray-800">
                    Detail Produk
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Informasi lengkap produk
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  disabled={!findQuantityInCart}
                  onClick={handleNavigateToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {findQuantityInCart?.quantity || 0}
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {dataProduct?.name || "-"}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">
                      {dataProduct?.category?.categoryName || "-"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        4.8 (124 ulasan)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatRupiah(dataProduct?.price || 0)}
                    </p>
                    <p className="text-sm text-gray-500">per unit</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Deskripsi Produk
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {dataProduct?.description ||
                      "Deskripsi produk tidak tersedia saat ini."}
                  </p>
                </div>

                {/* Product Specs */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Spesifikasi</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Package className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Stok</p>
                        <p className="text-sm font-medium text-gray-800">
                          {dataProduct?.stock || 0} unit
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Weight className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Berat</p>
                        <p className="text-sm font-medium text-gray-800">
                          {dataProduct?.weightGram
                            ? `${formatWeight(dataProduct?.weightGram)}`
                            : "Tidak diketahui"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Button
                    variant="destructive"
                    className="w-full"
                    size="lg"
                    onClick={() => handleAddToCart()}
                    disabled={
                      !dataProduct?.stock ||
                      dataProduct.stock === 0 ||
                      isPending
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah ke Keranjang
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Bagikan
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
