import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MoreOption from "@/components/core/moreOption";
import ModalEditKategori from "./modalEditKategori";

import { ISectionTableKategoriProps } from "../types";
import ModalDeleteCategory from "./modalDeleteKategori";

export default function SectionTableKategori({
  dataCategory,
  refetchGetDataCategory,
  isLoading,
  paginationCount,
}: ISectionTableKategoriProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <section className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 px-4 py-4 font-semibold text-gray-700">
                  No
                </TableHead>
                <TableHead
                  className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                  // onClick={() => handleSort('categoryName')}
                >
                  Nama Kategori
                </TableHead>
                <TableHead
                  className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                  // onClick={() => handleSort('motorcycleName')}
                >
                  Jenis Motor
                </TableHead>
                <TableHead
                  className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                  // onClick={() => handleSort('releaseYear')}
                >
                  Tahun Rilis
                </TableHead>
                <TableHead className="w-24 px-4 py-4 text-right font-semibold text-gray-700">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : dataCategory?.data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    Belum ada data kategori
                  </TableCell>
                </TableRow>
              ) : (
                dataCategory?.data?.map((item, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-4 py-4 text-gray-600 font-medium">
                      {paginationCount ? paginationCount + (i + 1) : i + 1}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="font-medium text-gray-900">
                        {item?.categoryName}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant="secondary" className="font-normal">
                        {item?.categorymotorcyle?.motorCycleName}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant="outline">
                        {item?.categorymotorcyle?.releaseYear}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-right">
                      <MoreOption>
                        <div className="w-full">
                          <ModalEditKategori
                            refetch={refetchGetDataCategory}
                            dataCategory={dataCategory}
                            dataItem={item}
                          />

                          <ModalDeleteCategory
                            idCategory={item?.id}
                            refetch={refetchGetDataCategory}
                          />
                        </div>
                      </MoreOption>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>
      </CardContent>
    </Card>
  );
}
