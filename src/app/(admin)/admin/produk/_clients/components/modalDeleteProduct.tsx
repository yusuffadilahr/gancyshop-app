import { IDataProduk } from "@/app/(admin)/admin/produk/_clients/types"
import { deleteDataProductById } from "@/app/(admin)/admin/produk/_servers/services"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { FaTrash } from "react-icons/fa"

export default function ModalDeleteProduct({ data, refetch }: {
    data: IDataProduk,
    refetch: () => void
}) {
    const { mutate: handleDeleteProduct } = useMutation({
        mutationFn: async () => {
            return deleteDataProductById(String(data.id))
        },
        onSuccess: (res) => {
            if (res?.error) throw res

            toast({
                title: res.data?.message || 'Berhasil menghapus produk',
                description: new Date().toDateString(),
            })

            refetch()
        },
        onError: (err) => {
            console.log(err)
            toast({
                title: 'Gagal menghapus produk',
                description: new Date().toDateString(),
            })
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"sm"} className="w-full flex justify-start text-red-600
                                hover:text-red-600">
                    <FaTrash />
                    Hapus
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Hapus</DialogTitle>
                    <DialogDescription>
                        Apakah anda yakin ingin menghapus produk ini?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="default"
                            size={"sm"}>
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive"
                            size={"sm"} onClick={() => handleDeleteProduct()}>
                            Ya, Hapus
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
