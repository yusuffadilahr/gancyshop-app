"use client";
import * as React from "react";
import SectionCardPlatform from "./sectionCardPlatform";
import SectionCarousell from "@/app/_clients/components/sectionCarousell";
import SectionCallToAction from "./sectionCallToAction";
import SectionProduct from "./sectionProduct";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";
import SectionWhyChooseUs from "./sectionWhyUs";
import SectionBusinessStats from "./sectionStatBusiness";
import SectionHowToOrder from "./sectionHowToOrder";

const DynamicFirstVisitModal = dynamic(() => import("./firstVisitModal"), {
  loading: () => <Spinner />,
});

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
