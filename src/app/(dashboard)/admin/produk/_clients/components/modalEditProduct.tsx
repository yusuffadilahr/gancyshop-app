import { useMutateEditProduct } from "@/app/(dashboard)/admin/produk/_clients/hooks/use-mutate-edit-product";
import { IModalEditProductProps } from "@/app/(dashboard)/admin/produk/_clients/types";
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
import { Textarea } from "@/components/ui/textarea";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function ModalEditProduct({
  dataTable,
  onClick,
  filePreview,
  setFilePreview,
  handleChangeFile,
  refetch,
}: IModalEditProductProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { initialValuesEditProduct, handleEditProduct, validatEditProduct } =
    useMutateEditProduct({ dataTable, refetch, setOpenDialog });

  return (
    <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <DialogTrigger asChild>
        <Button
          className="w-full flex justify-start"
          variant={"ghost"}
          size={"sm"}
          onClick={onClick}
        >
          <FaEdit className="mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">
            Edit Produk
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Silakan lengkapi detail produk dengan informasi yang akurat sebelum
            disimpan.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Formik
            onSubmit={(values, { resetForm }) => {
              const fd = new FormData();

              if (!!values.images) fd.append("images", values.images);

              fd.append("name", values.name);
              fd.append("description", values.description);
              fd.append("price", values.price);
              fd.append(
                "isActive",
                values.isActive === true ? "true" : "false"
              );
              fd.append("stock", values.stock);
              fd.append("weightGram", values.weightGram);

              handleEditProduct(
                { fd, idProduct: dataTable?.id as number },
                {
                  onSuccess: () => {
                    resetForm({ values: initialValuesEditProduct });
                  },
                }
              );
            }}
            initialValues={initialValuesEditProduct}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-5">
                {/* Image Preview Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Gambar Produk
                  </label>
                  <div className="relative w-full aspect-square max-h-[300px] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                    {filePreview ? (
                      <Image
                        alt="Product preview"
                        fill
                        src={filePreview}
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        alt="Product image"
                        fill
                        src={dataTable?.imageUrl || "/placeholder-image.png"}
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* File Input Section */}
                  {!!values.images ? (
                    <div className="w-full text-sm px-4 py-3 rounded-lg border-2 border-green-200 bg-green-50 flex justify-between items-center">
                      <p className="text-gray-700 font-medium truncate mr-2">
                        {values.images.name.length > 30
                          ? `${values.images.name.slice(0, 30)}...`
                          : values.images.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFilePreview("");
                          setFieldValue("images", null);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                      >
                        <MdCancel size={20} />
                      </button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleChangeFile(e, setFieldValue)}
                    />
                  )}
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <Input
                    id="name"
                    placeholder="Masukkan nama produk"
                    name="name"
                    required
                    label="Nama Produk"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("name", value);
                    }}
                    value={values.name || ""}
                    className="h-11"
                  />

                  <Textarea
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi produk"
                    name="description"
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("description", value);
                    }}
                    value={values.description || ""}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="price"
                      required
                      label="Harga"
                      placeholder="0"
                      name="price"
                      type="number"
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        if (value < 0) value = 0;

                        setFieldValue("price", value);
                      }}
                      value={values.price || ""}
                      className="h-11"
                    />

                    <Input
                      label="Stok"
                      required
                      id="stock"
                      placeholder="0"
                      name="stock"
                      type="number"
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        if (value < 0) value = 0;

                        setFieldValue("stock", value);
                      }}
                      value={values.stock || ""}
                      className="h-11"
                    />
                  </div>

                  <Input
                    required
                    label="Berat (Gram)"
                    id="weightGram"
                    placeholder="0"
                    name="weightGram"
                    type="number"
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) value = 0;

                      setFieldValue("weightGram", value);
                    }}
                    value={values.weightGram || ""}
                    className="h-11"
                  />
                </div>

                {/* Action Buttons */}
                <div className="w-full flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={validatEditProduct(values)}>
                    Simpan
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
