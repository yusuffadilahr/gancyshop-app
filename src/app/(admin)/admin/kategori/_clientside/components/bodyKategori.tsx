'use client'

import { IGETDataCategory } from '@/app/(admin)/admin/kategori/_clientside/types';
import { getCategoryProduct } from '@/app/(admin)/admin/kategori/_serverside/action';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { default as nextDynamic } from 'next/dynamic'

const DynamicModalAddKategori = nextDynamic(() => import('./modalAddKategori'), { loading: () => <></> })

export default function BodyKategori() {
    const { data: getDataCategory,
        refetch: refetchGetDataCategory } = useQuery<IGETDataCategory[]>({
            queryKey: ['get-kategori'],
            queryFn: async () => {
                const res = await getCategoryProduct()
                return res?.data
            }
        })

    return (
        <div className='px-5 pt-10 space-y-3'>

            <DynamicModalAddKategori refetch={refetchGetDataCategory} />

            <Table className="w-full border rounded-md overflow-hidden">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-fit max-w-[50px] border px-4 py-2 text-left text-gray-700">No</TableHead>
                        <TableHead className="w-fit max-w-[200px] border px-4 py-2 text-left text-gray-700">Nama Kategori</TableHead>
                        <TableHead className="px-4 py-5 border text-left text-gray-700">Jenis Motor</TableHead>
                        <TableHead className="px-4 py-5 border text-left text-gray-700">Tahun Rilis</TableHead>
                        <TableHead className="px-4 py-5 border text-right text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {getDataCategory?.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{item.categoryName}</TableCell>
                            <TableCell>{item.CategoryMotorcyle.motorCycleName}</TableCell>
                            <TableCell>{item.CategoryMotorcyle.releaseYear}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}