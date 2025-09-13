import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, Clock, Award } from "lucide-react";

interface ISectionWhyChooseUs {
  pt?: string;
  dividerBorder?: boolean;
}

export default function SectionWhyChooseUs({
  pt = "pt-16",
  dividerBorder = true,
}: ISectionWhyChooseUs) {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "100% Kualitas Premium",
      description:
        "Semua produk dijamin original dari distributor resmi dengan sertifikat keaslian",
      highlight: "Plug & Play",
    },
    {
      icon: <Truck className="h-8 w-8 text-red-600" />,
      title: "Ongkir Termurah",
      description:
        "Gratis ongkos kirim untuk pembelian minimal Rp 500.000 ke seluruh Indonesia",
      highlight: "Hemat Ongkir",
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: "Langsung Proses",
      description:
        "Order sebelum jam 15:00 WIB akan diproses dan dikirim di hari yang sama",
      highlight: "Proses Cepat",
    },
    {
      icon: <Award className="h-8 w-8 text-red-600" />,
      title: "Garansi Pengembalian",
      description:
        "Garansi resmi untuk semua produk rusak dengan layanan terbaik",
      highlight: "Garansi Resmi",
    },
  ];

  return (
    <section className={`px-2 md:px-5 ${pt}`}>
      {/* bg-gradient-to-br from-gray-50 via-white to-red-50 */}
      <div className="w-full">
        <div className="text-center mb-12">
          <Badge variant="destructive" className="mb-4 px-4 py-2">
            Mengapa Pilih Kami?
          </Badge>
          {dividerBorder ? (
            <div className="flex items-center w-full justify-center gap-3">
              <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Kepercayaan <span className="text-red-600">1000+</span> Customer
              </h2>
              <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
            </div>
          ) : (
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kepercayaan <span className="text-red-600">1000+</span> Customer
            </h2>
          )}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan produk berkualitas tinggi dengan
            pelayanan terbaik untuk kepuasan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <Badge variant="outline" className="mb-3 text-xs">
                  {feature.highlight}
                </Badge>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
