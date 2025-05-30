import { IDataProduk } from "@/app/(admin)/admin/produk/_clientside/types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function TableProduct({
    data,
    handleUpdateActiveProduct,
    isPending,

}: {
    data: IDataProduk[],
    handleUpdateActiveProduct: ({ fd, id }: { fd: FormData, id: string }) => void,
    isPending: boolean,
}) {

    return (
        <Table className="w-full border rounded-md overflow-hidden">
            {/* <TableCaption className="text-sm text-gray-500">Table Product.</TableCaption> */}
            <TableHeader className="bg-gray-50">
                <TableRow>
                    <TableHead className="w-fit max-w-[200px] border px-4 py-2 text-left text-gray-700">Nama Produk</TableHead>
                    <TableHead className="px-4 py-5 border text-left text-gray-700">Deskripsi</TableHead>
                    <TableHead className="px-4 py-5 border text-left text-gray-700">Stok</TableHead>
                    <TableHead className="px-4 py-5 border text-left text-gray-700">Harga</TableHead>
                    <TableHead className="px-4 py-5 border text-left text-gray-700">Status</TableHead>
                    <TableHead className="px-4 py-5 border text-left text-gray-700">Gramasi (kg)</TableHead>
                    <TableHead className="px-4 py-5 border text-right text-gray-700">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {data?.map((item) => (
                    <TableRow key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <TableCell className="px-4 py-5 font-medium">{item.name}</TableCell>
                        <TableCell className="px-4 py-5">{item.description}</TableCell>
                        <TableCell className="px-4 py-5">Rp. {item.stock.toLocaleString('id-ID')}</TableCell>
                        <TableCell className="px-4 py-5">Rp. {item.price.toLocaleString('id-ID')}</TableCell>
                        <TableCell className="px-4 py-5">
                            <div className="flex items-center space-x-2 px-2">
                                <Switch id="airplane-mode" defaultChecked={item.isActive}
                                    onCheckedChange={(val) => {
                                        const value = val === true ? 'true' : 'false'
                                        const fd = new FormData()

                                        fd.append('isActive', value)
                                        handleUpdateActiveProduct({ fd, id: String(item.id) })
                                    }} disabled={isPending} />
                                <Label htmlFor="airplane-mode">{item.isActive ? 'Aktif' : 'Non-Aktif'}</Label>
                            </div>
                        </TableCell>
                        <TableCell className="px-4 py-5">{item.weightGram} kg</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}