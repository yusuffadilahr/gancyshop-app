import SelectOptionCategoryMotor from "@/app/(dashboard)/admin/kategori/_clients/components/selectOptionCategoryMotor";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, Formik } from "formik";
import { useModalAddKat } from "../hooks/use-modal-add-kat";

export default function ModalAddKategori({ refetch }: { refetch: () => void }) {
  const {
    open,
    setOpen,
    openSelectOption,
    setOpenSelectOption,
    valueSelectOption,
    setValueSelectOption,
    initialValues,
    years,
    handleAddKategori,
    isPending,
    handleOpenChange,
    valueChange,
  } = useModalAddKat({ refetch });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Tambah</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambah Kategori</DialogTitle>
          <DialogDescription>
            Silakan lengkapi detail kategori dengan informasi yang akurat
            sebelum disimpan.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={(val, { resetForm }) => {
            const fd = new FormData();

            fd.append("idCategoryMotor", val.idCategoryMotor);
            fd.append("motorCycleName", val.motorCycleName);
            fd.append("releaseYear", val.releaseYear);
            fd.append("categoryName", val.categoryName);

            handleAddKategori(
              { fd },
              {
                onSuccess: () => {
                  resetForm();
                  setValueSelectOption("");
                  setOpen(false);
                },
              }
            );
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-3">
              <SelectOptionCategoryMotor
                open={openSelectOption}
                setFieldValue={setFieldValue}
                setValue={setValueSelectOption}
                value={valueSelectOption}
                setOpen={setOpenSelectOption}
              />

              {values.idCategoryMotor === "Lainnya" && (
                <div className="space-y-3">
                  <Input
                    onChange={(e) =>
                      valueChange(e, setFieldValue, "motorCycleName")
                    }
                    placeholder="Masukkan Jenis Motor"
                    value={values.motorCycleName || ""}
                  />

                  <Select
                    onValueChange={(val) => setFieldValue("releaseYear", val)}
                    value={values.releaseYear || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Tahun Motor" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Input
                onChange={(e) => valueChange(e, setFieldValue, "categoryName")}
                placeholder="Masukkan Kategori"
                value={values.categoryName || ""}
              />

              <div className="w-full justify-end flex">
                <Button
                  type="submit"
                  disabled={
                    isPending ||
                    !values.categoryName ||
                    !values.idCategoryMotor ||
                    (values.idCategoryMotor === "Lainnya" &&
                      !values.motorCycleName) ||
                    (values.idCategoryMotor === "Lainnya" &&
                      !values.releaseYear)
                  }
                >
                  Buat Kategori
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
