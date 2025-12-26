import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Headphones, Shield, Truck } from "lucide-react";

export default function SectionCardPlatform() {
  const platforms = [
    {
      icon: Shield,
      title: "Produk Terjamin",
      description:
        "Semua sparepart terjamin dan bergaransi resmi dari distributor",
      color: "red",
    },
    {
      icon: Truck,
      title: "Pengiriman Cepat",
      description:
        "Gratis ongkir untuk area tertentu dengan estimasi pengiriman 1-3 hari",
      color: "blue",
    },
    {
      icon: Headphones,
      title: "Konsultasi Gratis",
      description:
        "Tim ahli kami siap membantu memilih sparepart yang tepat untuk kendaraan Anda",
      color: "green",
    },
    {
      icon: CreditCard,
      title: "Pembayaran Mudah",
      description:
        "Berbagai metode pembayaran tersedia: transfer, e-wallet, dan cicilan 0%",
      color: "purple",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Keunggulan Kami
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Kenapa Pilih <span className="text-red-600">Kami?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pelayanan terbaik dengan produk
            berkualitas untuk kendaraan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Card
                key={index}
                className="border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {platform.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {platform.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
