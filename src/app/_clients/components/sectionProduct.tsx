import { dummyData } from "@/app/_servers/utils/dummyData";
import CardProduct from "@/components/core/cardProduct";
import Link from "next/link";

export default function SectionProduct() {
  return (
    <div className="px-2 md:px-5 space-y-14 pt-4 py-3 md:py-10 md:pt-20">
      <div className="w-full flex justify-center items-center flex-col gap-5">
        {/* <Badge variant={"destructive"} className="font-xl p-2 px-4">
          Produk Kami
        </Badge> */}

        <div className="w-full">
          <div className="w-full flex items-center justify-center gap-3">
            <div className="border-[1px] border-neutral-200 mb-3 flex-1"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">100%</span> Produk Premium
            </h2>
            <div className="border-[1px] border-neutral-200 mb-3 flex-1"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan produk berkualitas tinggi dengan
            pelayanan terbaik untuk kepuasan Anda
          </p>
        </div>
      </div>
      <div className="flex w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full h-fit">
          {dummyData?.map((item, idx) => (
            <Link key={idx} href="/product">
              <CardProduct
                categoryName={item?.category?.categoryName}
                imageAlt="Product"
                imageUrl={item?.imageUrl || ""}
                productCreatedAt={item?.createdAt || ""}
                productIsActive={item?.isActive}
                productName={item?.name}
                productPrice={item?.price}
                productStock={item?.stock}
                productWeight={item?.weightGram}
                customButton={<div />}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
