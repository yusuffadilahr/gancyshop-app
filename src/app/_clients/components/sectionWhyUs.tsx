import { Headphones, CheckCircle, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function SectionWhyChooseUs() {
  const features = [
    {
      icon: CheckCircle,
      title: "Garansi Resmi",
      description:
        "Setiap produk dilengkapi garansi pengembalian jika barang rusak.",
    },
    {
      icon: Star,
      title: "Kualitas Terjamin",
      description: "Hanya menjual produk terbaik dari brand ternama",
    },
    {
      icon: Clock,
      title: "Stok Lengkap",
      description: "Ribuan item tersedia dan siap dikirim setiap hari",
    },
    {
      icon: Headphones,
      title: "Customer Service 24/7",
      description: "Tim support siap membantu Anda kapan saja",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
              Mengapa Kami Berbeda
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Komitmen Kami untuk <span className="text-red-600">Kepuasan</span>{" "}
              Anda
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-justify">
              Dengan pengalaman lebih dari 5 tahun di industri otomotif, kami
              memahami kebutuhan pelanggan dan selalu mengutamakan kualitas
              serta kepuasan Anda.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center">
              <div className="w-full h-full absolute">
                <Image
                  height={500}
                  width={500}
                  loading="lazy"
                  alt="picture"
                  src={"/hero-section.png"}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>

              <div className="text-center p-8 z-20">
                <div className="text-6xl font-bold text-red-600 mb-2">98%</div>
                <div className="text-xl font-semibold text-white mb-2">
                  Kepuasan Pelanggan
                </div>
                <p className="text-white">Berdasarkan 10,000+ ulasan</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-red-600 rounded-2xl opacity-10"></div> */}
            {/* <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-600 rounded-full opacity-10"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
