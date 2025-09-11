"use client";
import * as React from "react";
import SectionCardPlatform from "./sectionCardPlatform";
import SectionCarousell from "@/app/_clients/components/sectionCarousell";
import SectionCallToAction from "./sectionCallToAction";
import SectionProduct from "./sectionProduct";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Truck,
  Clock,
  Award,
  Star,
  Users,
  Package,
  Wrench,
  MessageCircle,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const DynamicFirstVisitModal = dynamic(() => import("./firstVisitModal"), {
  loading: () => <Spinner />,
});

// Section Why Choose Us
function SectionWhyChooseUs() {
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
    <section className="pt-16 px-2 md:px-0">
      {/* bg-gradient-to-br from-gray-50 via-white to-red-50 */}
      <div className="w-full">
        <div className="text-center mb-12">
          <Badge variant="destructive" className="mb-4 px-4 py-2">
            Mengapa Pilih Kami?
          </Badge>
          <div className="flex items-center w-full justify-center gap-3">
            <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kepercayaan <span className="text-red-600">1000+</span> Customer
            </h2>
            <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
          </div>
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

// Section Customer Reviews
// function SectionCustomerReviews() {
//   const reviews = [
//     {
//       name: "Budi Santoso",
//       motorType: "Honda Vario 125",
//       rating: 5,
//       review:
//         "Fairing Vario saya cocok banget, kualitas original dan pengiriman cepat. Sangat recommended!",
//       avatar: "BS",
//       date: "2 minggu lalu",
//     },
//     {
//       name: "Ahmad Rizky",
//       motorType: "Yamaha NMAX",
//       rating: 5,
//       review:
//         "Pelayanan ramah, barang sesuai ekspektasi. Packaging rapi dan aman sampai tujuan.",
//       avatar: "AR",
//       date: "1 bulan lalu",
//     },
//     {
//       name: "Siti Nurhaliza",
//       motorType: "Honda Beat",
//       rating: 5,
//       review:
//         "Harga bersaing, kualitas oke. Sudah order beberapa kali, selalu puas dengan hasilnya.",
//       avatar: "SN",
//       date: "3 minggu lalu",
//     },
//   ];

//   return (
//     <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <Badge variant="secondary" className="mb-4 px-4 py-2">
//             Testimoni Customer
//           </Badge>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Apa Kata <span className="text-blue-600">Customer</span> Kami?
//           </h2>
//           <div className="flex justify-center items-center gap-2 mb-4">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className="h-6 w-6 fill-yellow-400 text-yellow-400"
//               />
//             ))}
//             <span className="ml-2 text-lg font-semibold text-gray-900">
//               4.9/5
//             </span>
//             <span className="text-gray-600">(1,247 reviews)</span>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {reviews.map((review, index) => (
//             <Card
//               key={index}
//               className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
//                     {review.avatar}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">
//                       {review.name}
//                     </h4>
//                     <p className="text-sm text-gray-600">{review.motorType}</p>
//                   </div>
//                 </div>

//                 <div className="flex mb-3">
//                   {[...Array(review.rating)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-4 w-4 fill-yellow-400 text-yellow-400"
//                     />
//                   ))}
//                 </div>

//                 <p className="text-gray-700 mb-4 leading-relaxed">
//                   &apos;{review.review}&apos;
//                 </p>

//                 <p className="text-xs text-gray-500">{review.date}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-8">
//           <Button variant="outline" size="lg">
//             Lihat Semua Review <ArrowRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

// Section Business Stats
function SectionBusinessStats() {
  const stats = [
    {
      number: "5,000+",
      label: "Produk Ready Stock",
      icon: <Package className="h-8 w-8" />,
      color: "text-blue-600",
    },
    {
      number: "1,247",
      label: "Customer Puas",
      icon: <Users className="h-8 w-8" />,
      color: "text-green-600",
    },
    {
      number: "50+",
      label: "Merek Motor",
      icon: <Wrench className="h-8 w-8" />,
      color: "text-purple-600",
    },
    {
      number: "99.5%",
      label: "Rating Positif",
      icon: <Star className="h-8 w-8" />,
      color: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 rounded-2xl bg-red-600 mx-2 md:mx-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* <Badge
            variant="outline"
            className="mb-10 px-4 py-2 text-white border-white/20"
          >
            Pencapaian Kami
          </Badge> */}
          <h2 className="text-4xl font-bold text-white mb-4">
            Dipercaya Ribuan{" "}
            <span className="text-white px-4 rounded-2xl py-2 bg-orange-500/85">
              Customer
            </span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Angka-angka yang membuktikan komitmen kami dalam memberikan
            pelayanan terbaik
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="bg-white rounded-full w-fit p-3">
                  {stat.icon}
                </span>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <p className="text-white font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section How to Order
function SectionHowToOrder() {
  const steps = [
    {
      step: 1,
      title: "Pilih Parts Motor",
      description:
        "Browse katalog lengkap kami dan temukan parts yang Anda butuhkan untuk motor Anda",
      icon: <Package className="h-8 w-8" />,
      color: "bg-blue-600",
    },
    {
      step: 2,
      title: "Chat via WhatsApp",
      description:
        "Hubungi kami melalui WhatsApp untuk konfirmasi stok, harga, dan detail pengiriman",
      icon: <MessageCircle className="h-8 w-8" />,
      color: "bg-green-600",
    },
    {
      step: 3,
      title: "Bayar & Terima",
      description:
        "Lakukan pembayaran dan tunggu parts berkualitas dikirim langsung ke alamat Anda",
      icon: <CreditCard className="h-8 w-8" />,
      color: "bg-purple-600",
    },
  ];

  return (
    <section className="pt-16 bg-white">
      <div className="px-2 md:px-4">
        <div className="text-center mb-12">
          {/* <Badge variant="secondary" className="mb-4 px-4 py-2">
            Cara Order
          </Badge> */}
          <div className="flex justify-center items-center gap-3">
            <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">3 Langkah</span> Memulai Order
            </h2>
            <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proses pemesanan yang simple dan cepat untuk mendapatkan parts motor
            berkualitas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              )}

              <Card className="relative z-10 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}
                  >
                    {step.icon}
                  </div>

                  <Badge variant="outline" className="mb-4">
                    Langkah {step.step}
                  </Badge>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section FAQ
// function SectionFAQ() {
//   const [openIndex, setOpenIndex] = React.useState<number | null>(null);

//   const faqs = [
//     {
//       question: "Apakah semua parts dijamin original?",
//       answer:
//         "Ya, semua produk kami 100% original dari distributor resmi dengan sertifikat keaslian. Kami berkomitmen hanya menjual parts berkualitas tinggi.",
//     },
//     {
//       question: "Berapa lama waktu pengiriman?",
//       answer:
//         "Untuk area Jabodetabek 1-2 hari kerja, luar kota 3-7 hari kerja tergantung lokasi. Pengiriman same day tersedia untuk order sebelum jam 15:00 WIB.",
//     },
//     {
//       question: "Bagaimana dengan garansi produk?",
//       answer:
//         "Semua produk bergaransi resmi 1 tahun. Jika terjadi kerusakan akibat cacat produksi, kami akan ganti dengan yang baru tanpa biaya tambahan.",
//     },
//     {
//       question: "Apakah ada minimal order untuk free ongkir?",
//       answer:
//         "Ya, free ongkir berlaku untuk pembelian minimal Rp 500.000 ke seluruh Indonesia. Di bawah itu akan dikenakan ongkos kirim sesuai tarif ekspedisi.",
//     },
//     {
//       question: "Bagaimana cara pembayaran?",
//       answer:
//         "Kami menerima pembayaran via transfer bank (BCA, Mandiri, BRI, BNI), e-wallet (OVO, DANA, GoPay), dan COD untuk area tertentu.",
//     },
//   ];

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <Badge variant="secondary" className="mb-4 px-4 py-2">
//             FAQ
//           </Badge>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Pertanyaan yang Sering{" "}
//             <span className="text-blue-600">Ditanyakan</span>
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Temukan jawaban untuk pertanyaan umum tentang produk dan layanan
//             kami
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {faqs.map((faq, index) => (
//             <Card key={index} className="mb-4 border-0 shadow-md">
//               <CardContent className="p-0">
//                 <button
//                   onClick={() =>
//                     setOpenIndex(openIndex === index ? null : index)
//                   }
//                   className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
//                 >
//                   <h3 className="font-semibold text-gray-900 pr-4">
//                     {faq.question}
//                   </h3>
//                   <ChevronDown
//                     className={`h-5 w-5 text-gray-500 transition-transform ${
//                       openIndex === index ? "transform rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {openIndex === index && (
//                   <div className="px-6 pb-6 pt-0">
//                     <p className="text-gray-600 leading-relaxed">
//                       {faq.answer}
//                     </p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-8">
//           <p className="text-gray-600 mb-4">Masih ada pertanyaan lain?</p>
//           <Button variant="outline">
//             <MessageCircle className="mr-2 h-4 w-4" />
//             Hubungi Customer Service
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function BodyLanding() {
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("Welcome, Diddy!");
    const checkCookie = sessionStorage.getItem("_inf");
    if (!checkCookie) setIsOpenDialog(true);
  }, []);

  return (
    <div className="pb-20 md:px-4 min-h-screen h-fit space-y-0">
      <DynamicFirstVisitModal
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />

      {/* EXISTING: Hero Carousel */}
      <SectionCarousell />

      {/* NEW: Why Choose Us - Build Trust */}
      <SectionWhyChooseUs />

      {/* EXISTING: Platform Cards */}
      <SectionCardPlatform />

      {/* EXISTING: Products Display */}
      <SectionProduct />

      {/* NEW: Business Stats - Credibility */}
      <SectionBusinessStats />

      {/* NEW: Customer Reviews - Social Proof */}
      {/* <SectionCustomerReviews /> */}

      {/* NEW: How to Order - Guide Users */}
      <SectionHowToOrder />

      {/* NEW: FAQ - Address Common Questions */}
      {/* <SectionFAQ /> */}

      {/* EXISTING: Final CTA */}
      <SectionCallToAction />
    </div>
  );
}
