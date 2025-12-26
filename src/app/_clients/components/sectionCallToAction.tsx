import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SectionCallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Siap Upgrade Kendaraan Anda?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Dapatkan sparepart berkualitas dengan harga terbaik. Konsultasi
            gratis dengan tim ahli kami sekarang!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold min-w-[200px]"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hubungi Kami
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white hover:text-red-600 text-red-600 font-bold min-w-[200px]"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Kami
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 text-red-200" />
              <div className="text-left">
                <div className="text-sm text-red-200">Alamat</div>
                <div className="font-semibold">Bogor, Indonesia</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-red-200" />
              <div className="text-left">
                <div className="text-sm text-red-200">Telepon</div>
                <div className="font-semibold">+62 895-1329-7524</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-red-200" />
              <div className="text-left">
                <div className="text-sm text-red-200">Jam Kerja</div>
                <div className="font-semibold">Senin - Sabtu, 8:00-17:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
