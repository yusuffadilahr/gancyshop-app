import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IModalEditKategori } from "../types";
import { ErrorMessage, Form, Formik } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { editKategoriSchema } from "../schemas";
import { useModalEditKat } from "../hooks/use-modal-edit-kat";

export default function ModalEditKategori({
  dataCategory,
  dataItem,
  refetch,
}: IModalEditKategori) {
  const {
    loading,
    tempData,
    isModalOpen,
    dataMotorCycle,
    initValues,
    mutationUpdateCategory,
    isPending,
    handleOpenChange,
    handleClickTriggerButton,
    handleValueChangeSelect,
  } = useModalEditKat({ refetch, dataCategory, dataItem });

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={handleClickTriggerButton}
          variant={"ghost"}
          size={"sm"}
          className="w-full flex justify-start"
        >
          <FaEdit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Kategori</DialogTitle>
          <DialogDescription>
            Silakan lengkapi detail kategori dengan informasi yang akurat
            sebelum disimpan.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initValues}
          validationSchema={editKategoriSchema}
          onSubmit={(val, { resetForm }) => {
            const fd = new FormData();
            fd.append("categoryId", String(tempData?.id));
            fd.append("categoryName", val?.categoryName);
            fd.append(
              "categoryMotorcycleId",
              String(val?.categoryMotorcycleId)
            );

            mutationUpdateCategory(fd, {
              onSuccess: () => {
                resetForm();
              },
            });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-3">
              <div>
                <Select
                  disabled={loading}
                  name="categoryMotorcycleId"
                  value={String(values?.categoryMotorcycleId) || ""}
                  onValueChange={(val) =>
                    handleValueChangeSelect(val, setFieldValue)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {dataMotorCycle?.map((item) => {
                        return (
                          <SelectItem key={item?.id} value={String(item?.id)}>
                            {item?.motorCycleName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name="idCategoryMotor"
                  component="p"
                  className="text-[11px] px-1 mt-1 text-red-500"
                />
              </div>

              <div>
                <Input
                  onChange={(e) => {
                    const { value } = e.target;
                    setFieldValue("categoryName", value);
                  }}
                  placeholder="Masukkan Kategori"
                  value={values.categoryName || ""}
                />

                <ErrorMessage
                  name="categoryName"
                  component="p"
                  className="text-[11px] px-1 mt-1 text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant={"default"}
                  size={"sm"}
                  type="submit"
                  disabled={
                    !values?.categoryName ||
                    !values?.idCategoryMotor ||
                    isPending
                  }
                >
                  Simpan
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
