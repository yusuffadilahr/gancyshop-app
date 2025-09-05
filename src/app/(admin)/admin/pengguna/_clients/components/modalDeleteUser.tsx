import { useMutation } from "@tanstack/react-query";
import { deleteDataUser } from "../services";
import { Button } from "@/components/ui/button";
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
import { FaTrash } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";

export default function ModalDeleteUser({
  idUser,
  refetch,
}: {
  idUser: number;
  refetch: () => void;
}) {
  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteDataUser(id);
    },
    onSuccess: (res) => {
      if (res.error) throw res;

      toast({
        title: res?.message || "Berhasil menghapus produk",
        description: new Date().toDateString(),
      });

      refetch();
    },
    onError: (err) => {
      if ("message" in err) {
        toast({
          title: err.message || "Berhasil menghapus user",
          description: new Date().toDateString(),
        });
      } else {
        toast({
          title: "Ada kesalahan saat menghapus user!",
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
          className="w-full flex justify-start text-red-600
                                hover:text-red-600"
        >
          <FaTrash />
          Hapus
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus pengguna?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="default" size={"sm"}>
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              size={"sm"}
              onClick={() => handleDeleteUser(idUser)}
            >
              Ya, Hapus
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
