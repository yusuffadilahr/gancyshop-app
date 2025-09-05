"use client";
import InputSearch from "@/components/core/inputSearch";
import TitleDashboardSection from "@/components/core/titleDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Edit, Eye, Filter } from "lucide-react";
import { getDataAllUser } from "../services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaginationTable } from "@/components/core/paginationTable";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MoreOption from "@/components/core/moreOption";
import { ErrorMessage, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/core/phoneInput";

interface IDataAllUser {
  address: string | null;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  role: "ADMIN" | "USER";
}

interface IResponseGetUser {
  data: IDataAllUser[];
  totalPage: number;
}

const DynamicModalDeleteUser = dynamic(() => import("./modalDeleteUser"), {
  loading: () => null,
});

export default function BodyPengguna() {
  const [page, setPage] = useState<number>(1);
  const [searchData, setSearchData] = useState<{
    display: string;
    debounce: string;
    loading: boolean;
  }>({
    debounce: "",
    display: "",
    loading: false,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const limit = 5;

  const {
    data: dataAllUser,
    isLoading,
    refetch,
  } = useQuery<IResponseGetUser>({
    queryKey: ["get_user"],
    queryFn: async () => {
      const response = await getDataAllUser({
        page,
        limit,
        search: searchData.debounce,
      });
      if (response?.error) throw response;

      return response?.data;
    },
  });

  const debounce = useDebouncedCallback((val) => {
    setSearchData((prev) => ({ ...prev, debounce: val, loading: false }));
  }, 800);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    if (limit) {
      params.set("limit", limit.toString());
    } else {
      params.delete("limit");
    }

    if (searchData.debounce) {
      params.set("search", searchData.debounce);
    } else {
      params.delete("search");
    }

    const currentPath = `${pathname}?${params}`;
    router.replace(currentPath);
    refetch();
  }, [page, limit, searchData.debounce]);

  return (
    <DashboardContentLayout>
      <TitleDashboardSection
        description="Kelola Pengguna Website Anda"
        titleMenuDashboard="Pengguna"
        action={
          <Dialog>
            <DialogTrigger asChild>
              <Button>Tambah</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buat Pengguna Baru</DialogTitle>
                <DialogDescription>
                  Lengkapi data untuk proses pengguna baru.
                </DialogDescription>
              </DialogHeader>

              {/* content */}
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  role: "",
                  phoneNumber: "",
                }}
                onSubmit={(val) => {
                  console.log(val, "< payload");
                }}

                // validationSchema={}
              >
                {({ setFieldValue, values }) => (
                  <Form className="space-y-3">
                    <div>
                      <Input
                        name="firstName"
                        type="text"
                        placeholder="Nama Depan"
                        value={values.firstName || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFieldValue("firstName", value);
                        }}
                      />

                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="text-[11px] px-1 mt-1 text-red-500"
                      />
                    </div>

                    <div>
                      <Input
                        name="lastName"
                        type="text"
                        placeholder="Nama Belakang"
                        value={values.lastName || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFieldValue("lastName", value);
                        }}
                      />

                      <ErrorMessage
                        name="lastName"
                        component="p"
                        className="text-[11px] px-1 mt-1 text-red-500"
                      />
                    </div>

                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="example@gancy.my.id"
                        value={values.email || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFieldValue("email", value);
                        }}
                      />

                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-[11px] px-1 mt-1 text-red-500"
                      />
                    </div>

                    <div>
                      <Select
                        name="role"
                        onValueChange={(val) => {
                          setFieldValue("role", val);
                        }}
                        value={values.role || ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                        </SelectContent>
                      </Select>

                      <ErrorMessage
                        name="role"
                        component="p"
                        className="text-[11px] px-1 mt-1 text-red-500"
                      />
                    </div>

                    <div>
                      <PhoneInput
                        name="phoneNumber"
                        placeholder="812******"
                        onChange={(value) =>
                          setFieldValue("phoneNumber", value)
                        }
                        value={values.phoneNumber}
                        defaultCountry="ID"
                      />

                      <ErrorMessage
                        name="role"
                        component="p"
                        className="text-[11px] px-1 mt-1 text-red-500"
                      />
                    </div>

                    <div className="w-full flex justify-end">
                      <Button type="submit" size={"sm"}>
                        Simpan
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        }
        // action={<DynamicModalAddKategori refetch={refetchGetdataAllUser} />}
      />

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <InputSearch
              loadingSearch={searchData?.loading}
              searchParams={searchParams}
              onChange={(e) => {
                const { value } = e.target;
                setSearchData((prev) => ({
                  ...prev,
                  loading: true,
                  display: value,
                }));
                debounce(value);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
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
                    Nama
                  </TableHead>
                  <TableHead
                    className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                    // onClick={() => handleSort('releaseYear')}
                  >
                    Role
                  </TableHead>
                  <TableHead
                    className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                    // onClick={() => handleSort('motorcycleName')}
                  >
                    Email
                  </TableHead>
                  <TableHead
                    className="px-4 py-4 font-semibold text-gray-700 transition-colors"
                    // onClick={() => handleSort('releaseYear')}
                  >
                    Nomor Telepon
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
                ) : dataAllUser?.data?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-500"
                    >
                      Belum ada data kategori
                    </TableCell>
                  </TableRow>
                ) : (
                  dataAllUser?.data?.map((item, i) => (
                    <TableRow
                      key={i}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="px-4 py-4 text-gray-600 font-medium">
                        {i + 1}
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="font-medium text-gray-900">
                          {item?.firstName} {item?.lastName}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Badge variant="outline">{item?.role || "-"}</Badge>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Badge variant="secondary" className="font-normal">
                          {item?.email || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Badge variant="outline">
                          {item?.phoneNumber || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-4 text-right">
                        <MoreOption>
                          <Button
                            variant={"ghost"}
                            size={"sm"}
                            className="w-full flex justify-start"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat
                          </Button>

                          <Button
                            variant={"ghost"}
                            size={"sm"}
                            className="w-full flex justify-start"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>

                          {item?.role !== "ADMIN" && (
                            <DynamicModalDeleteUser
                              idUser={item.id}
                              refetch={refetch}
                            />
                          )}
                        </MoreOption>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PaginationTable
        handleChangePage={(newPage) => setPage(newPage)}
        page={String(page)}
        totalPage={dataAllUser?.totalPage || 1}
      />
    </DashboardContentLayout>
  );
}
