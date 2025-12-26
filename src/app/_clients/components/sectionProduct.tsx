import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function SectionProduct() {
  const categories = [
    {
      name: "Tameng Beat Karbu",
      count: 150,
      image: "/beat.jpg",
      badge: "Best Seller",
    },
    {
      name: "Body Kanan Kiri Beat Karbu",
      count: 200,
      image: "/beat-kankir.jpg",
      badge: "Popular",
    },
    {
      name: "Body Kanan Kiri Beat Mio",
      count: 80,
      image: "/beat-kankir-2.jpg",
      badge: "Popular",
    },
    {
      name: "Body Kasar",
      count: 250,
      image: "/kasar.jpg",
      badge: "Full Stock",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Kategori Produk
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Temukan <span className="text-red-600">Sparepart</span> yang Anda
            Butuhkan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ribuan produk sparepart dari berbagai merk untuk semua jenis
            kendaraan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category, index) => (
            <Link key={index} href={"/produk"}>
              <Card className="group cursor-pointer border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {/* <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div> */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-600 text-white">
                      {category.badge}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <Image
                    height={500}
                    width={500}
                    loading="lazy"
                    alt="picture"
                    src={category?.image}
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count}+ Produk
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href={"/produk"}>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Lihat Semua Produk
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
