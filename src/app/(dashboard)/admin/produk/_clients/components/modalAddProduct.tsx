import {
  IDataCategoryName,
  IModalAddProductProps,
} from "@/app/(dashboard)/admin/produk/_clients/types";
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
import { Switch } from "@/components/ui/switch";
import { Form, Formik } from "formik";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import * as React from "react";
import SelectOptionCategoryMotorSearch from "@/app/(dashboard)/admin/produk/_clients/components/selectOptionCategoryMotor";
import SelectOptionCategorySearch from "@/app/(dashboard)/admin/produk/_clients/components/selectOptionCategory";
import { handleGetDataCategoryByCategoryMotor } from "@/app/(dashboard)/admin/produk/_servers/services";
import { Textarea } from "@/components/ui/textarea";

export default function ModalAddProduct({
  initialValues,
  handleAddProduct,
  isPending,
  filePreview,
  setFilePreview,
  handleChangeFile,
}: IModalAddProductProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [valueSelectOption, setValueSelectOption] = React.useState<{
    categoryMotor: string;
    category: string;
  }>({
    categoryMotor: "",
    category: "",
  });
  const [dataCategory, setDataCategory] = React.useState<IDataCategoryName[]>(
    []
  );

  const handleGetData = async (id: string) => {
    try {
      const res = await handleGetDataCategoryByCategoryMotor(id);
      if (res?.error) throw res;
      setDataCategory(res.data);
    } catch (error) {
      setDataCategory([]);
      console.log(error);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setValueSelectOption({
          categoryMotor: "",
          category: "",
        });
        setFilePreview("");
        setOpenDialog(open);
      }}
      open={openDialog}
    >
      <DialogTrigger asChild>
        <Button variant="default" size={"default"}>
          Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">
            Tambah Produk
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
              fd.append("categoryId", values.categoryId);

              handleAddProduct(fd, {
                onSuccess: () => {
                  resetForm({ values: initialValues });
                  setOpenDialog(false);
                },
              });
            }}
            initialValues={initialValues}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-5">
                {/* Image Preview Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Gambar Produk
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  {filePreview && (
                    <div className="relative w-full aspect-square max-h-[300px] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                      <Image
                        alt="Product preview"
                        fill
                        src={filePreview}
                        className="object-cover"
                      />
                    </div>
                  )}

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

                <div className="space-y-4">
                  <Input
                    label="Nama Produk"
                    placeholder="Masukkan nama produk"
                    name="name"
                    required
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
                      label="Harga"
                      placeholder="0"
                      name="price"
                      type="number"
                      required
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
                      placeholder="0"
                      name="stock"
                      type="number"
                      required
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
                    label="Berat (Gram)"
                    placeholder="0"
                    name="weightGram"
                    type="number"
                    required
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) value = 0;

                      setFieldValue("weightGram", value);
                    }}
                    value={values.weightGram || ""}
                    className="h-11"
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Kategori Motor
                    </label>
                    <SelectOptionCategoryMotorSearch
                      open={open}
                      setFieldValue={setFieldValue}
                      setValue={setValueSelectOption}
                      value={valueSelectOption}
                      handleGetDataCategoryByCategoryMotor={handleGetData}
                      setOpen={setOpen}
                    />
                  </div>

                  {!!valueSelectOption.categoryMotor && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Kategori Produk
                      </label>
                      <SelectOptionCategorySearch
                        data={dataCategory}
                        setFieldValue={setFieldValue}
                        setValueDisplay={setValueSelectOption}
                        valueDisplay={valueSelectOption}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50">
                    <Label
                      htmlFor="airplane-mode"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Aktifkan produk ini?
                    </Label>
                    <Switch
                      id="airplane-mode"
                      checked={values.isActive}
                      onCheckedChange={(val) => setFieldValue("isActive", val)}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      !values.images ||
                      !values.description ||
                      isPending ||
                      !values.name ||
                      !values.price ||
                      !values.stock ||
                      !values.weightGram ||
                      !values.categoryId
                    }
                  >
                    Buat Produk
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
