import { IDataItem, IGETDataCategory, TSetFieldValueSelect } from "../types";
import { useState } from "react";
import { handleGetDataCategoryMotor } from "../../../produk/_servers/services";
import { IDataCategoryMotor } from "@/app/_clients/types";
import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../../_servers/services";
import { toast } from "@/hooks/use-toast";

interface IModalEditKategoriHooks {
  refetch: () => void;
  dataCategory: IGETDataCategory;
  dataItem: IDataItem;
}

export const useModalEditKat = ({
  refetch,
  dataCategory,
  dataItem,
}: IModalEditKategoriHooks) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tempData, setTempData] = useState<IDataItem | undefined>(undefined);
  const [dataMotorCycle, setDataMotorCycle] = useState<IDataCategoryMotor[]>(
    []
  );

  const initValues = {
    idCategoryMotor: tempData?.categoryMotorcycleId || "",
    categoryName: tempData?.categoryName || "",
    categoryMotorcycleId: tempData?.categoryMotorcycleId || "",
  };

  const { mutate: mutationUpdateCategory, isPending } = useMutation({
    mutationFn: async (fd: FormData) => {
      const res = await updateCategory(fd);
      return res;
    },

    onSuccess: (res) => {
      if (res?.error) throw res;

      toast({
        title: res?.message || "Berhasil merubah kategori",
        description: new Date().toDateString(),
      });

      setIsModalOpen(false);
      refetch();
    },

    onError: (err) => {
      setIsModalOpen(false);
      if ("message" in err) {
        toast({
          title: err?.message || "Gagal merubah kategori",
          description: new Date().toDateString(),
        });
      } else {
        toast({
          title: "Gagal merubah kategori",
          description: new Date().toDateString(),
        });
      }
    },
  });

  const handleGetData = async (open: boolean) => {
    try {
      setLoading(true);
      const res = await handleGetDataCategoryMotor();
      if (res.error) throw res;

      setIsModalOpen(open);
      setDataMotorCycle(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (dataMotorCycle.length === 0) {
      handleGetData(open);
    } else {
      setIsModalOpen(open);
    }
  };

  const handleClickTriggerButton = () => {
    const findById: IDataItem | undefined = dataCategory?.data?.find(
      (item) => dataItem.id === item.id
    );

    setTempData(findById);
  };

  const handleValueChangeSelect = (
    val: string,
    setFieldValue: TSetFieldValueSelect
  ) => {
    setFieldValue("categoryMotorcycleId", val);
  };

  return {
    loading,
    isModalOpen,
    setIsModalOpen,
    tempData,
    setTempData,
    dataMotorCycle,
    initValues,
    mutationUpdateCategory,
    isPending,
    handleOpenChange,
    handleClickTriggerButton,
    handleValueChangeSelect,
  };
};
