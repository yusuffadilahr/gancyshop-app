import {
  IDataProduk,
  ITableProductProps,
} from "@/app/(dashboard)/admin/produk/_clients/types";
import {
  formatRupiah,
  formatWeight,
} from "@/app/_clients/utils/formatConverter";
import MoreOption from "@/components/core/moreOption";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import * as React from "react";
import { FaDesktop } from "react-icons/fa";
import ModalEditProduct from "./modalEditProduct";
import ModalDeleteProduct from "./modalDeleteProduct";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TableProduct({
  data,
  handleUpdateActiveProduct,
  isPending,
  setFilePreview,
  handleChangeFile,
  filePreview,
  refetch,
  isLoading,
  paginationCount,
}: ITableProductProps) {
  const [findProduct, setFindProduct] = React.useState<IDataProduk | null>(
    null
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit max-w-[200px] px-4 py-2 text-left text-gray-700 font-semibold">
            No
          </TableHead>
          <TableHead className="w-fit max-w-[200px] px-4 py-2 text-left text-gray-700 font-semibold">
            Nama Produk
          </TableHead>
          <TableHead className="px-4 py-5 text-left text-gray-700 font-semibold">
            Deskripsi
          </TableHead>
          <TableHead className="px-4 py-5 text-left text-gray-700 font-semibold">
            Stok
          </TableHead>
          <TableHead className="px-4 py-5 text-left text-gray-700 font-semibold">
            Harga
          </TableHead>
          <TableHead className="px-4 py-5 text-left text-gray-700 font-semibold">
            Status
          </TableHead>
          <TableHead className="px-4 py-5 text-left text-gray-700 font-semibold">
            Gramasi (kg)
          </TableHead>
          <TableHead className="px-4 py-5 text-right text-gray-700 font-semibold">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </TableCell>
          </TableRow>
        ) : data?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
              Belum ada data
            </TableCell>
          </TableRow>
        ) : (
          data?.map((item, idx) => {
            return (
              <TableRow
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-5 font-medium">
                  {paginationCount ? paginationCount + (idx + 1) : idx + 1}
                </TableCell>
                <TableCell className="px-4 py-5 font-medium">
                  {item.name}
                </TableCell>
                <TableCell className="px-4 py-5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="truncate max-w-[300px]">
                        {item.description}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[300px] text-justify">
                        {item.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-4 py-5">{item.stock} Pcs</TableCell>
                <TableCell className="px-4 py-5">
                  <Badge variant={"secondary"}>
                    {formatRupiah(item.price || 0)}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-5">
                  <div className="flex items-center space-x-2 px-2">
                    <Switch
                      id="airplane-mode"
                      defaultChecked={item.isActive}
                      onCheckedChange={(val) => {
                        const value = val === true ? "true" : "false";
                        const fd = new FormData();

                        fd.append("isActive", value);
                        handleUpdateActiveProduct({ fd, id: String(item.id) });
                      }}
                      disabled={isPending}
                    />
                    <Label htmlFor="airplane-mode">
                      {item.isActive ? "Aktif" : "Non-Aktif"}
                    </Label>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-5">
                  {formatWeight(item.weightGram)}
                </TableCell>
                <TableCell className="px-4 py-5 text-left flex justify-end">
                  <MoreOption>
                    <Link href={"/produk"}>
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="w-full flex justify-start"
                      >
                        <FaDesktop />
                        Lihat
                      </Button>
                    </Link>

                    <ModalEditProduct
                      setDataTable={setFindProduct}
                      setFilePreview={setFilePreview}
                      dataTable={findProduct}
                      filePreview={filePreview}
                      handleChangeFile={handleChangeFile}
                      refetch={refetch}
                      onClick={() => {
                        const findData = data.find(
                          (find) => find.id === item.id
                        );
                        setFindProduct(findData as IDataProduk);
                      }}
                    />

                    <ModalDeleteProduct data={item} refetch={refetch} />
                  </MoreOption>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
