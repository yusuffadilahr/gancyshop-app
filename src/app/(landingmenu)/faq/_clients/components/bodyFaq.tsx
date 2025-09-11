"use client";;
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function BodyLandingPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Apakah semua parts dijamin original?",
      answer:
        "Ya, semua produk kami 100% original dari distributor resmi dengan sertifikat keaslian. Kami berkomitmen hanya menjual parts berkualitas tinggi.",
    },
    {
      question: "Berapa lama waktu pengiriman?",
      answer:
        "Untuk area Jabodetabek 1-2 hari kerja, luar kota 3-7 hari kerja tergantung lokasi. Pengiriman same day tersedia untuk order sebelum jam 15:00 WIB.",
    },
    {
      question: "Bagaimana dengan garansi produk?",
      answer:
        "Semua produk bergaransi resmi 1 tahun. Jika terjadi kerusakan akibat cacat produksi, kami akan ganti dengan yang baru tanpa biaya tambahan.",
    },
    {
      question: "Apakah ada minimal order untuk free ongkir?",
      answer:
        "Ya, free ongkir berlaku untuk pembelian minimal Rp 500.000 ke seluruh Indonesia. Di bawah itu akan dikenakan ongkos kirim sesuai tarif ekspedisi.",
    },
    {
      question: "Bagaimana cara pembayaran?",
      answer:
        "Kami menerima pembayaran via transfer bank (BCA, Mandiri, BRI, BNI), e-wallet (OVO, DANA, GoPay), dan COD untuk area tertentu.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-500 mb-4">FAQ</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang produk dan layanan
            kami
          </p>
        </div>

        <div className="w-full px-5 mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="mb-4 border-0 shadow-md">
              <CardContent className="p-0">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
