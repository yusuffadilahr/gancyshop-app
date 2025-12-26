import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Package, Trash2, ShoppingCart, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductData } from "../../_servers/services";
import { IDataListProduk } from "../types";
import { formatRupiah } from "@/app/_clients/utils/formatConverter";
import { Form, Formik } from "formik";
import { axiosInstance } from "@/app/_clients/utils/axiosInstance";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface IProductItem {
  productId: number;
  quantity: number | null;
  tax: number | null;
}

export default function ModalAddLaporan({
  refetchDataLaporan,
}: {
  refetchDataLaporan: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);

  const { data: dataProduct, isRefetching } = useQuery<{
    data: IDataListProduk[];
    totalPage: number;
  }>({
    staleTime: 5 * 60 * 1000,
    enabled: !!open,
    queryKey: ["data-product-list", limit],
    queryFn: async () => {
      const res = await getProductData({
        search: "",
        limit: limit?.toString(),
        page: "1",
      });

      if (res?.error) throw res;
      return res?.data;
    },
  });

  const { data: dataListProduct, totalPage } = dataProduct || {};

  return (
    <Dialog open={open} onOpenChange={(op) => setOpen(op)}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-red-600 hover:bg-red-700">
          <FaPlus className="mr-2" />
          Buat Laporan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Buat Laporan Penjualan
          </DialogTitle>
          <DialogDescription>
            Silakan lengkapi data penjualan dengan informasi yang akurat sebelum
            disimpan.
          </DialogDescription>
        </DialogHeader>

        <SectionForm
          setLimit={setLimit}
          setOpen={setOpen}
          helperProps={{
            dataListProduct: dataListProduct || [],
            isRefetching,
            totalPage: totalPage || 1,
            refetchDataLaporan,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function SectionForm({
  setLimit,
  setOpen,
  helperProps,
}: {
  helperProps: {
    dataListProduct: IDataListProduk[];
    totalPage: number;
    isRefetching: boolean;
    refetchDataLaporan: () => void;
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { dataListProduct, isRefetching, totalPage, refetchDataLaporan } =
    helperProps || {};
  const { mutate: handleSubmit } = useMutation({
    mutationFn: async (data: { resi: string; product: IProductItem[] }) => {
      setOpen(false);
      return await axiosInstance.post("/admin/report", data);
    },
    onSuccess: (res) => {
      refetchDataLaporan();
      toast({
        title: res.data.message || "Berhasil membuat laporan",
        description: new Date().toDateString(),
      });
    },
    onError: (err) => {
      const axiosError = err as AxiosError;

      if (axiosError.response) {
        toast({
          title:
            (axiosError?.response?.data as Error)?.message ||
            "Ada kesalahan dari server!",
          description: new Date().toDateString(),
        });
      } else {
        toast({
          title: "Ada kesalahan dari server!",
          description: new Date().toDateString(),
        });
      }
    },
  });

  return (
    <Formik
      initialValues={{
        resi: "",
        product: [{ productId: 0, quantity: null, tax: 0 }] as IProductItem[],
      }}
      onSubmit={(val, { resetForm }) => {
        handleSubmit(val, {
          onSuccess: () => resetForm(),
        });
      }}
    >
      {({ values, setFieldValue }) => {
        const arrProducts = values.product;
        const resi = values.resi;
        const notValidForm = arrProducts.some(
          (p) => !p.productId || !p?.quantity
        );

        const addProduct = () => {
          setFieldValue("product", [
            ...arrProducts,
            { productId: 0, quantity: null, tax: 0 },
          ]);
        };

        const removeProduct = (index: number) => {
          if (arrProducts.length > 1) {
            const newProducts = arrProducts.filter((_, i) => i !== index);
            setFieldValue("product", newProducts);
          }
        };

        const updateProduct = (
          index: number,
          field: keyof IProductItem,
          value: number
        ) => {
          const newProducts = [...arrProducts];
          newProducts[index][field] = value;
          setFieldValue("product", newProducts);
        };

        return (
          <Form>
            <div className="space-y-2">
              <Label htmlFor="resi" className="text-sm font-semibold">
                No. Resi / Order ID <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="resi"
                  name="resi"
                  placeholder="Contoh: SO-1001"
                  className="pl-10"
                  value={resi}
                  onChange={(e) => setFieldValue("resi", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-red-600" />
                  Daftar Produk
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addProduct}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  disabled={notValidForm}
                >
                  <FaPlus className="mr-2 w-3 h-3" />
                  Tambah Produk
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {arrProducts?.map((product, index) => {
                const foundDataProduct = dataListProduct?.find(
                  (v) => v?.id === product?.productId
                );

                const { price, stock } = foundDataProduct || {};

                return (
                  <Card key={index} className="border-2 border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor={`productId-${index}`}
                              className="text-sm font-semibold"
                            >
                              ID Produk <span className="text-red-600">*</span>
                            </Label>
                            <Select
                              value={product.productId.toString()}
                              onValueChange={(value) =>
                                updateProduct(
                                  index,
                                  "productId",
                                  parseInt(value)
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih produk" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0" disabled>
                                  Pilih Produk
                                </SelectItem>

                                {dataListProduct?.map((item, idx) => {
                                  const idProductValue = item?.id?.toString();

                                  return (
                                    <SelectItem
                                      value={idProductValue}
                                      key={idx}
                                    >
                                      {item?.name || ""}
                                    </SelectItem>
                                  );
                                })}

                                {totalPage && totalPage > 1 && (
                                  <div className="bg-white border-t border-gray-200 p-2">
                                    <Button
                                      className="w-full border-red-600 text-red-600 hover:bg-red-50"
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      disabled={isRefetching}
                                      onClick={() => {
                                        setLimit((prev) => prev + 10);
                                      }}
                                    >
                                      <RefreshCw className="w-3 h-3 mr-2" />
                                      Muat Lebih Banyak
                                    </Button>
                                  </div>
                                )}
                              </SelectContent>
                            </Select>
                          </div>

                          {foundDataProduct && (
                            <div className="space-y-2 border-b pb-2">
                              <div className="flex justify-between items-center">
                                <h1 className="text-sm">Harga Barang:</h1>
                                <h1 className="text-sm">
                                  {formatRupiah(price || 0)}
                                </h1>
                              </div>
                              <div className="flex justify-between items-center">
                                <h1 className="text-sm">Stock Barang:</h1>
                                <h1 className="text-sm">{stock}</h1>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor={`quantity-${index}`}
                                className="text-sm font-semibold"
                              >
                                Quantity <span className="text-red-600">*</span>
                              </Label>
                              <Input
                                id={`quantity-${index}`}
                                type="number"
                                placeholder="Masukkan Quantity"
                                value={product.quantity || ""}
                                onChange={(e) => {
                                  let { value } = e.target;
                                  const numberValue = Number(value);

                                  if (numberValue < 0) value = "";
                                  if (numberValue > Number(stock)) return;
                                  if (value.length > 4) return;
                                  if (value.length > 1 && value.startsWith("0"))
                                    value = value.slice(1);

                                  updateProduct(
                                    index,
                                    "quantity",
                                    parseInt(value) || 0
                                  );
                                }}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor={`tax-${index}`}
                                className="text-sm font-semibold"
                              >
                                Biaya Admin / Potongan / Pajak (Rp)
                              </Label>
                              <Input
                                id={`tax-${index}`}
                                type="number"
                                placeholder="Masukkan Potongan"
                                value={product.tax || ""}
                                onChange={(e) => {
                                  let { value } = e.target;
                                  const numberValue = Number(value);

                                  if (numberValue < 0) value = "";
                                  if (value.length > 12) return;
                                  if (value.length > 1 && value.startsWith("0"))
                                    value = value.slice(1);

                                  updateProduct(
                                    index,
                                    "tax",
                                    parseInt(value) || 0
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {arrProducts.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProduct(index)}
                            className="flex-shrink-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gray-50 border-2 mt-4 border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Produk:</span>
                    <span className="font-semibold text-gray-900">
                      {arrProducts.length} item
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Quantity:</span>
                    <span className="font-semibold text-gray-900">
                      {arrProducts.reduce(
                        (sum, p) => sum + (p?.quantity || 0),
                        0
                      )}{" "}
                      pcs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-300">
                    <span className="text-gray-600">Total Pajak:</span>
                    <span className="font-semibold text-red-600">
                      Rp{" "}
                      {arrProducts
                        .reduce((sum, p) => sum + (p?.tax || 0), 0)
                        .toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                disabled={!resi || notValidForm}
              >
                Simpan Laporan
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
