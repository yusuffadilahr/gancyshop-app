import { IInitialValuesAddKategori } from "@/app/(dashboard)/admin/kategori/_clients/types";
import { createCategoryAction } from "@/app/(dashboard)/admin/kategori/_servers/services";
import { toast } from "@/hooks/use-toast";
import { checkCharacterValue } from "@/app/_clients/utils/sanitizeInput";
import { useMutation } from "@tanstack/react-query";
import { FormikErrors } from "formik";
import * as React from "react";

export const useModalAddKat = ({ refetch }: { refetch: () => void }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSelectOption, setOpenSelectOption] =
    React.useState<boolean>(false);
  const [valueSelectOption, setValueSelectOption] = React.useState<string>("");

  const initialValues = {
    idCategoryMotor: "",
    motorCycleName: "",
    releaseYear: "",
    categoryName: "",
  } as IInitialValuesAddKategori;

  const years = Array.from(
    { length: 50 },
    (_, i) => `${new Date().getFullYear() - 49 + i}`
  );
  const { mutate: handleAddKategori, isPending } = useMutation({
    mutationFn: async ({ fd }: { fd: FormData }) => {
      return await createCategoryAction(fd);
    },
    onSuccess: (res) => {
      if (res?.error) throw res;

      toast({
        title: res?.message || "Berhasil mengupload produk",
        description: new Date().toDateString(),
      });

      refetch();
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: "Gagal membuat kategori produk",
        description: new Date().toDateString(),
      });
    },
  });

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setValueSelectOption("");
    setOpenSelectOption(false);
  };

  const valueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<IInitialValuesAddKategori>>,
    field: string
  ) => {
    const { value } = e.target;

    if (!checkCharacterValue(value) && value.length > 1) return;
    setFieldValue(field, value);
  };

  return {
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
  };
};
