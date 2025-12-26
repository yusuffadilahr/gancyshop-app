"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function BodyLandingPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Apakah semua produk original?",
      answer: "Tidak, kami hanya menjual sparepart 100% buatan lokal.",
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
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering{" "}
            <span className="text-red-600">Diajukan</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-6 flex items-center justify-between"
                >
                  <h3 className="font-bold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
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
