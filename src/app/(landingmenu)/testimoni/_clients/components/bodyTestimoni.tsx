"use client";

import { useState } from "react";
import {
  Star,
  Quote,
  ThumbsUp,
  MessageSquare,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Pemilik Bengkel",
    location: "Jakarta Selatan",
    rating: 5,
    date: "2024-12-20",
    comment:
      "Pelayanan sangat memuaskan! Sudah 3 tahun jadi pelanggan setia. Produk terjamin, harga bersaing, dan tim sangat responsif. Highly recommended!",
    productPurchased: "Kampas Rem Brembo",
    image: "/testimonials/1.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Driver Online",
    location: "Depok, Jawa Barat",
    rating: 5,
    date: "2024-12-18",
    comment:
      "Harga terjangkau, kualitas bagus, pengiriman cepat. Cocok banget untuk driver online seperti saya yang sering butuh sparepart.",
    productPurchased: "Oli Mesin Shell Helix",
    image: "/testimonials/2.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Agus Wijaya",
    role: "Pengusaha Transportasi",
    location: "Tangerang",
    rating: 5,
    date: "2024-12-15",
    comment:
      "Konsultasi gratis sangat membantu. Tim ahli yang profesional membantu saya memilih sparepart yang tepat untuk armada truck saya.",
    productPurchased: "Filter Oli Mann Filter",
    image: "/testimonials/3.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "Maya Anggraini",
    role: "Ibu Rumah Tangga",
    location: "Bekasi",
    rating: 4,
    date: "2024-12-12",
    comment:
      "Pelayanan ramah, produk berkualitas. Suami saya selalu beli sparepart di sini. Harga lebih murah dari bengkel resmi tapi kualitas tetap terjaga.",
    productPurchased: "Aki GS Astra Premium",
    image: "/testimonials/4.jpg",
    verified: false,
  },
  {
    id: 5,
    name: "Rizky Firmansyah",
    role: "Mekanik",
    location: "Jakarta Timur",
    rating: 5,
    date: "2024-12-10",
    comment:
      "Sebagai mekanik, saya sangat puas dengan stok yang lengkap dan kualitas produk. Semua original dan bergaransi resmi.",
    productPurchased: "Bearing SKF",
    image: "/testimonials/5.jpg",
    verified: true,
  },
  {
    id: 6,
    name: "Linda Wijaya",
    role: "Karyawan Swasta",
    location: "Bogor",
    rating: 5,
    date: "2024-12-08",
    comment:
      "Pertama kali beli disini dan langsung jadi langganan! CS nya sabar banget jelasinnya, barang cepat sampai, packing rapi.",
    productPurchased: "Ban Bridgestone Turanza",
    image: "/testimonials/6.jpg",
    verified: true,
  },
];

const stats = [
  {
    icon: Star,
    value: "4.9",
    label: "Rating Rata-rata",
    description: "Dari 1,200+ ulasan",
  },
  {
    icon: ThumbsUp,
    value: "98%",
    label: "Kepuasan",
    description: "Pelanggan puas",
  },
  {
    icon: MessageSquare,
    value: "1,200+",
    label: "Total Ulasan",
    description: "Testimoni verified",
  },
  {
    icon: TrendingUp,
    value: "10K+",
    label: "Pelanggan",
    description: "Mempercayai kami",
  },
];

function HeroTestimonial() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-red-600 to-red-700 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center text-white">
          <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6 backdrop-blur-sm">
            Testimoni Pelanggan
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Apa Kata <br />
            <span className="text-red-200">Pelanggan Kami?</span>
          </h1>
          <p className="text-lg lg:text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Kepuasan pelanggan adalah prioritas utama kami. Berikut pengalaman
            nyata dari ribuan pelanggan yang telah mempercayai kami
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4">
                    <Icon className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsGrid() {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filter === "all") return true;
    if (filter === "5") return testimonial.rating === 5;
    if (filter === "4") return testimonial.rating === 4;
    return true;
  });

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Semua Testimoni
            </h2>
            <p className="text-gray-600">
              Menampilkan {filteredTestimonials.length} ulasan
            </p>
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px] border-gray-300">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Ulasan</SelectItem>
              <SelectItem value="5">⭐ 5 Bintang</SelectItem>
              <SelectItem value="4">⭐ 4 Bintang</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-red-100">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback className="bg-red-100 text-red-600 font-bold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h3>
                        {testimonial.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-red-100 group-hover:text-red-200 transition-colors" />
                </div>

                {/* Rating */}
                <div className="mb-3">{renderStars(testimonial.rating)}</div>

                {/* Comment */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  &apos;{testimonial.comment}&apos;
                </p>

                {/* Product */}
                <div className="bg-red-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 mb-1">
                    Produk yang dibeli:
                  </p>
                  <p className="text-sm font-semibold text-red-600">
                    {testimonial.productPurchased}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{testimonial.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "bg-red-600 hover:bg-red-700"
                      : "border-gray-300"
                  }
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="border-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// ============== FEATURED TESTIMONIAL ==============
function FeaturedTestimonial() {
  const featured = testimonials[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Testimoni Pilihan
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Cerita <span className="text-red-600">Terbaik</span> Bulan Ini
          </h2>
        </div>

        <Card className="border-none shadow-2xl">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col items-center text-center">
              <Quote className="w-16 h-16 text-red-200 mb-6" />

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 max-w-3xl italic">
                &apos;{featured.comment}&apos;
              </p>

              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border-4 border-red-100 mb-4">
                  <AvatarImage src={featured.image} />
                  <AvatarFallback className="bg-red-600 text-white text-2xl font-bold">
                    {featured.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  {featured.name}
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </h3>
                <p className="text-gray-600 mb-2">
                  {featured.role} • {featured.location}
                </p>
                <Badge variant="outline" className="border-red-600 text-red-600">
                  {featured.productPurchased}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ============== CTA SECTION ==============
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
        <Award className="w-16 h-16 mx-auto mb-6 text-red-200" />
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          Bergabunglah dengan Ribuan Pelanggan Puas Kami
        </h2>
        <p className="text-lg lg:text-xl text-red-100 mb-8">
          Dapatkan sparepart berkualitas dengan pelayanan terbaik
        </p>
        <Button
          size="lg"
          className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8"
        >
          Mulai Belanja Sekarang
        </Button>
      </div>
    </section>
  );
}

// ============== MAIN TESTIMONIAL PAGE ==============
export default function BodyTestimoni() {
  return (
    <div className="min-h-screen">
      <HeroTestimonial />
      <StatsSection />
      <FeaturedTestimonial />
      <TestimonialsGrid />
      <CTASection />
    </div>
  );
}