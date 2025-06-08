'use client'

import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { default as nextDynamic } from 'next/dynamic'

const DynamicModalAddKategori = nextDynamic(() => import('./modalAddKategori'), { loading: () => <></> })

export default function BodyKategori() {
    return (
        <div className='px-5 pt-10 space-y-3'>

            <DynamicModalAddKategori />

            <Table className="w-full border rounded-md overflow-hidden">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-fit max-w-[50px] border px-4 py-2 text-left text-gray-700">No</TableHead>
                        <TableHead className="w-fit max-w-[200px] border px-4 py-2 text-left text-gray-700">Nama Kategori</TableHead>
                        <TableHead className="px-4 py-5 border text-left text-gray-700">Jenis Motor</TableHead>
                        <TableHead className="px-4 py-5 border text-right text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>

            </Table>
        </div>
    );
}