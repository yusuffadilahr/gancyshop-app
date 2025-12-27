import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteCategoryById } from "../../_servers/services";
import { AxiosError } from "axios";

export default function ModalDeleteCategory({
  idCategory,
  refetch,
}: {
  idCategory: number;
  refetch: () => void;
}) {
  const { mutate: handleDeleteCategory } = useMutation({
    mutationFn: async () => {
      return await deleteCategoryById(idCategory);
    },
    onSuccess: (res) => {
      if (res?.error) throw res;

      toast({
        title: res.data?.message || "Berhasil menghapus produk",
        description: new Date().toDateString(),
      });

      refetch();
    },
    onError: (err) => {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        const errorResult = axiosError?.response?.data as Error;

        toast({
          title: errorResult?.message || "Gagal menghapus produk",
          description: new Date().toDateString(),
        });
      } else if ("message" in err) {
        toast({
          title: err?.message || "Gagal menghapus produk",
          description: new Date().toDateString(),
        });
      } else {
        toast({
          title: "Gagal menghapus produk",
          description: new Date().toDateString(),
        });
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-full flex justify-start text-red-600 hover:text-red-600"
        >
          <FaTrash />
          Hapus
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus kategori ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" size={"sm"}>
              Batal
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              size={"sm"}
              onClick={() => handleDeleteCategory()}
            >
              Ya, Hapus
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
