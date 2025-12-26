"use client";
import CardFilterLayout from "@/app/_clients/components/cardFilterLayout";
import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import InputSearch from "@/components/core/inputSearch";
import TitleDashboardSection from "@/components/core/titleDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Calendar,
  Download,
  Printer,
  TrendingUp,
  DollarSign,
  TrendingDown,
} from "lucide-react";
import { formatRupiah } from "@/app/_clients/utils/formatConverter";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/app/_clients/utils/axiosInstance";
import { IDataReportSales } from "../types";
import ModalAddLaporan from "./modalAddLaporan";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Fragment, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function BodyLaporan() {
  const [loading, setLoading] = useState<boolean>(false);
  const [debounce, setDebounce] = useState<{
    display: string;
    search: string;
    loading: boolean;
  }>({
    search: "",
    display: "",
    loading: false,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: dataResponse,
    isPending,
    refetch,
  } = useQuery<IDataReportSales>({
    queryKey: ["get_report_sales"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/report", {
        params: {
          search: debounce?.search,
          date: new Date(),
        },
      });
      return response?.data?.data;
    },
  });

  const {
    data: dataReport,
    total: totalReport,
    summary,
    date,
  } = dataResponse || {};
  const { subtotal, net, tax } = summary || {};

  const totalQty = dataReport
    ?.flatMap((v) => v?.report)
    ?.reduce((acc, curr) => acc + curr?.quantity, 0);

  const debounced = useDebouncedCallback((val) => {
    setDebounce((prev) => ({
      ...prev,
      loading: false,
      search: val,
    }));
  }, 500);

  const handleExportPdf = () => {
    const doc = new jsPDF();

    setLoading(true);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(
      "LAPORAN PENJUALAN HARIAN",
      doc.internal.pageSize.getWidth() / 2,
      14,
      {
        align: "center",
      }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("GANCYSHOP STORE", doc.internal.pageSize.getWidth() / 2, 22, {
      align: "center",
    });

    doc.setFontSize(9);
    doc.text(
      "Jl. Inkopad Blok D 12 No. 4 • Whatsapp 0895-xxx-xxx • Gancyshop",
      doc.internal.pageSize.getWidth() / 2,
      28,
      { align: "center" }
    );

    doc.setLineWidth(0.8);
    doc.line(14, 32, doc.internal.pageSize.getWidth() - 14, 32);
    doc.setLineWidth(0.2);
    doc.line(14, 34, doc.internal.pageSize.getWidth() - 14, 34);

    autoTable(doc, {
      startY: 40,
      head: [["Resi", "Produk", "Qty", "Subtotal", "Potongan", "Net"]],
      body: (dataReport || []).flatMap((d) =>
        d.report.map((r) => [
          d.resi,
          r.productName,
          r.quantity,
          formatRupiah(r.subtotal),
          formatRupiah(r.fee),
          formatRupiah(r.net),
        ])
      ),
      styles: {
        fontSize: 9,
        cellPadding: 3,
        lineWidth: 0.2,
        halign: "left",
        valign: "middle",
      },

      headStyles: {
        fillColor: [200, 200, 200],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },

      bodyStyles: {
        fillColor: [250, 250, 250],
      },

      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },

      columnStyles: {
        2: { halign: "center", cellWidth: 20 },
        3: { halign: "right", cellWidth: 28 },
        4: { halign: "right", cellWidth: 28 },
        5: { halign: "right", cellWidth: 28 },
      },
    });

    doc.save("laporan-harian.pdf");
    setLoading(false);
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (debounce?.search) {
      currentParams.set("search", debounce?.search.toString());
    } else {
      currentParams.delete("search");
    }

    const currentPath = `${pathname}?${currentParams.toString()}`;
    router.push(currentPath);
    refetch();
  }, [pathname, router, debounce.search]);

  if (isPending)
    return (
      <DashboardContentLayout>
        <SkeletonLoading />
      </DashboardContentLayout>
    );
  return (
    <DashboardContentLayout>
      <TitleDashboardSection
        description="Kelola Keuangan Anda"
        titleMenuDashboard="Laporan Keuangan Harian"
        action={<ModalAddLaporan refetchDataLaporan={refetch} />}
      />

      <CardFilterLayout>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <InputSearch
              searchParams={searchParams}
              loadingSearch={debounce?.loading}
              onChange={(e) => {
                const { value } = e.target;
                debounced(value);
                setDebounce((prev) => ({
                  ...prev,
                  loading: true,
                  display: value,
                }));
              }}
            />
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="border-red-600 text-red-600">
              <Calendar className="w-4 h-4 mr-2" />
              {date || ""}
            </Badge>

            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
              onClick={handleExportPdf}
              disabled={loading}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
              onClick={handleExportPdf}
            >
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardFilterLayout>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {totalReport?.map((total, idx) => {
          const isFormatRupiah = total?.isFormatRupiah;
          const isPositive = total?.isPositive;

          return (
            <Card className="border-none shadow-md" key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {total?.name || ""}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {isFormatRupiah
                        ? formatRupiah(total?.value)
                        : total?.value}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div
                  className={`mt-2 flex items-center text-xs ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  <span>+{total?.percentage}% dari kemarin</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-900">
              Detail Transaksi Hari Ini
            </CardTitle>
            <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
              {date || ""}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold text-gray-900 py-6">
                    Nomor Resi
                  </TableHead>
                  <TableHead className="font-bold text-gray-900">
                    Produk
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 text-center">
                    Qty
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 text-right">
                    Harga
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 text-right">
                    Subtotal
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 text-right">
                    Potongan
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 text-right">
                    Net Item
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(dataReport || [])?.map((data, i) =>
                  data?.report?.map((r, idx) => (
                    <TableRow key={`${i}-${idx}`} className="hover:bg-gray-50">
                      <TableCell className="font-medium py-5">
                        <Badge
                          variant="outline"
                          className={`${
                            data?.report?.length > 3
                              ? "border-green-600 text-green-600"
                              : data?.report?.length > 2
                              ? "border-purple-600 text-purple-600"
                              : data?.report?.length > 1
                              ? "border-blue-600 text-blue-600"
                              : "border-red-600 text-red-600"
                          }`}
                        >
                          {data?.resi}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {r?.productName}
                      </TableCell>
                      <TableCell className="text-center">
                        {r?.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatRupiah(r?.price || 0)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatRupiah(r?.subtotal || 0)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        {formatRupiah(r?.fee || 0)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        {formatRupiah(r?.net || 0)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-red-50 hover:bg-red-50">
                  <TableCell colSpan={2} className="font-bold text-gray-900">
                    TOTAL KESELURUHAN
                  </TableCell>
                  <TableCell className="text-center font-bold text-gray-900">
                    {totalQty} <span className="font-normal">x</span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right font-bold text-gray-900">
                    {formatRupiah(subtotal || 0)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-red-600">
                    {formatRupiah(tax || 0)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-white bg-red-500 text-lg py-5">
                    {formatRupiah(net || 0)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardContentLayout>
  );
}

function SkeletonLoading() {
  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-8 w-32 mb-2" />
                </div>
                <Skeleton className="w-12 h-12 rounded-lg" />
              </div>
              <Skeleton className="h-3 w-28 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-12" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(8)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-red-50">
                  <TableCell colSpan={2}>
                    <Skeleton className="h-5 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-8 mx-auto" />
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-28 ml-auto" />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
