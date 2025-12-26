import { Package, Truck, CreditCard, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SectionHowToOrder() {
  const steps = [
    {
      number: "01",
      title: "Pilih Produk",
      description: "Browse katalog kami dan pilih sparepart yang Anda butuhkan",
      icon: Package,
    },
    {
      number: "02",
      title: "Konsultasi",
      description:
        "Hubungi tim kami untuk memastikan produk sesuai kendaraan Anda",
      icon: MessageCircle,
    },
    {
      number: "03",
      title: "Checkout",
      description: "Lakukan pembayaran melalui metode yang Anda pilih",
      icon: CreditCard,
    },
    {
      number: "04",
      title: "Terima Produk",
      description: "Produk dikirim dengan aman dan cepat ke alamat Anda",
      icon: Truck,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Cara Pesan
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Mudah & <span className="text-red-600">Cepat</span> dalam 4 Langkah
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Proses pemesanan yang simple dan aman untuk kenyamanan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -ml-4">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                )}
                <Card className="border-2 border-gray-100 hover:border-red-300 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-red-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
