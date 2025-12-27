"use client";
import dynamic from "next/dynamic";
import TitleDashboardSection from "@/components/core/titleDashboard";
import InputSearch from "@/components/core/inputSearch";
import { PaginationTable } from "@/components/core/paginationTable";
import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import CardFilterLayout from "@/app/_clients/components/cardFilterLayout";
import SectionTableKategori from "./sectionTable";
import { useHelperKategori } from "../hooks/use-helper-kategori";
import { useKategori } from "../hooks/use-kategori";
import { Spinner } from "@/components/ui/spinner";

const DynamicModalAddKategori = dynamic(() => import("./modalAddKategori"), {
  loading: () => <Spinner />,
});

export default function BodyKategori() {
  const {
    page,
    setPage,
    searchData,
    setSearchData,
    params,
    pathname,
    router,
    limit,
    dataCategory,
    refetchGetDataCategory,
    isLoading,
  } = useKategori();

  const { handleChangeInputSearch } = useHelperKategori({
    limit,
    page,
    params,
    pathname,
    refetchGetDataCategory,
    router,
    searchData,
    setSearchData,
  });

  return (
    <DashboardContentLayout>
      <TitleDashboardSection
        description="Kelola kategori produk motor Anda"
        titleMenuDashboard="Kategori Produk"
        action={<DynamicModalAddKategori refetch={refetchGetDataCategory} />}
      />

      <CardFilterLayout>
        <div className="flex flex-col sm:flex-row gap-4">
          <InputSearch
            loadingSearch={searchData?.loading}
            searchParams={params}
            onChange={handleChangeInputSearch}
          />
        </div>
      </CardFilterLayout>

      <SectionTableKategori
        dataCategory={dataCategory}
        isLoading={isLoading}
        refetchGetDataCategory={refetchGetDataCategory}
        paginationCount={(page - 1) * limit}
      />

      <PaginationTable
        totalPage={dataCategory?.totalPage || 1}
        handleChangePage={(val) => setPage(val)}
        page={String(page)}
      />
    </DashboardContentLayout>
  );
}
