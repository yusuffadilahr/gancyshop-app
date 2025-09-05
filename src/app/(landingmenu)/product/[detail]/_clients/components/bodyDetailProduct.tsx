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
} from "lucide-react";
import Image from "next/image";
import { decryptParams } from "@/app/_clients/utils/secureParams";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCart,
  getDataProductById,
} from "@/app/(landingmenu)/product/[detail]/_servers/services";
import { toast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export interface IProductPublic {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  fileId: string | null;
  weightGram: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  ownerId: number;
  category: {
    id: number;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };

  cart: {
    createdAt: string | null;
    deletedAt: string | null;
    id: number;
    price: number;
    productId: number;
    quantity: number;
    totalPrice: number;
    updatedAt: string | null;
    userId: number;
  }[];
}

interface IBodyProductDetail {
  idProduct: string;
}

export default function ProfessionalProductDetail({
  idProduct,
}: IBodyProductDetail) {
  const [zoomIn, setZoomIn] = useState<number>(1);
  const idProductDecrypted = decryptParams(idProduct) || undefined;
  const router = useRouter();

  const {
    data: dataProduct,
    refetch,
    // isLoading: isLoadingGetProduct
  } = useQuery<IProductPublic>({
    queryKey: ["get-product"],
    queryFn: async () => {
      return (await getDataProductById(idProductDecrypted))?.data;
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatWeight = (weight: number) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} kg`;
    }
    return `${weight} g`;
  };

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
          <Card>
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
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">
                    {dataProduct?.name || "Nama Produk"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {dataProduct?.category?.categoryName || "Kategori"}
                    </Badge>
                    {dataProduct?.stock && dataProduct.stock > 0 ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        Stok Tersedia
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Stok Habis</Badge>
                    )}
                  </div>
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
            <CardContent className="space-y-4">
              {/* Price */}
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  {dataProduct?.price
                    ? formatPrice(dataProduct.price)
                    : "Harga tidak tersedia"}
                </h3>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Deskripsi</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {dataProduct?.description || "Deskripsi tidak tersedia"}
                </p>
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                <h4 className="font-semibold">Detail Produk</h4>

                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Stok:</span>
                  <span className="text-sm font-medium">
                    {dataProduct?.stock || 0} unit
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Berat:</span>
                  <span className="text-sm font-medium">
                    {dataProduct?.weightGram
                      ? formatWeight(dataProduct.weightGram)
                      : "-"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2">
                {/* <Button
                  className="w-full"
                  size="lg"
                  disabled={!dataProduct?.stock || dataProduct.stock === 0}
                >
                  Beli Sekarang
                </Button> */}
                {isPending ? (
                  <Spinner />
                ) : (
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
                    Tambah ke Keranjang
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
