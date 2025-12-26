"use client";
import {
  Users,
  Target,
  Heart,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Quote,
  Calendar,
  Building,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

function HeroAbout() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-red-600 to-red-700 overflow-hidden">
      {/* <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div> */}

      <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center text-white">
          <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6 backdrop-blur-sm">
            Tentang Kami
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Mitra Terpercaya untuk <br />
            <span className="text-red-200">Kebutuhan Otomotif</span> Anda
          </h1>
          <p className="text-lg lg:text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Sejak 2019, kami telah melayani ribuan pelanggan dengan komitmen
            memberikan sparepart berkualitas tinggi dan pelayanan terbaik di
            industri otomotif Indonesia
          </p>
        </div>
      </div>
    </section>
  );
}

function CompanyStory() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building className="w-32 h-32 text-gray-300" />
              </div>
            </div>
            <Card className="absolute -bottom-6 -right-6 border-none shadow-2xl max-w-xs">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">5+</div>
                    <div className="text-sm text-gray-600">
                      Tahun Berpengalaman
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
              Cerita Kami
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Perjalanan Kami Membangun{" "}
              <span className="text-red-600">Kepercayaan</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed text-justify">
              <p>
                Berawal dari menjual kecil-kecilan di daerah Bogor pada tahun
                2019, kami memulai perjalanan dengan visi sederhana: menyediakan
                sparepart otomotif berkualitas tinggi dengan harga yang
                terjangkau untuk semua kalangan.
              </p>
              <p>
                Dengan dedikasi dan komitmen terhadap kepuasan pelanggan, kami
                terus berkembang dan kini telah melayani lebih dari 10,000
                pelanggan setia di seluruh Indonesia. Kepercayaan yang Anda
                berikan adalah motivasi terbesar kami.
              </p>
              <p>
                Kami tidak hanya menjual produk, tetapi juga membangun hubungan
                jangka panjang dengan setiap pelanggan. Tim ahli kami siap
                memberikan konsultasi dan solusi terbaik untuk kebutuhan
                kendaraan Anda.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white font-bold"
                  >
                    <Image
                      width={500}
                      height={500}
                      alt="testimonial"
                      src={"/profil-default.png"}
                      className="rounded-full"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="font-bold text-gray-900">10,000+ Pelanggan</div>
                <div className="text-sm text-gray-600">Mempercayai kami</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  const items = [
    {
      icon: Target,
      title: "Visi Kami",
      description:
        "Menjadi distributor sparepart otomotif terkemuka di Indonesia yang dikenal dengan kualitas produk terbaik dan layanan pelanggan yang unggul.",
      color: "red",
    },
    {
      icon: Zap,
      title: "Misi Kami",
      description:
        "Menyediakan sparepart original berkualitas tinggi, memberikan konsultasi profesional, dan memastikan kepuasan pelanggan melalui inovasi berkelanjutan.",
      color: "blue",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Visi & Misi
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Arah & Tujuan <span className="text-red-600">Perusahaan</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
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

function CoreValues() {
  const values = [
    {
      icon: Shield,
      title: "Integritas",
      description:
        "Berkomitmen pada kejujuran dan transparansi dalam setiap transaksi",
    },
    {
      icon: Heart,
      title: "Kepedulian",
      description:
        "Mengutamakan kepuasan dan kebutuhan pelanggan di atas segalanya",
    },
    {
      icon: Sparkles,
      title: "Kualitas",
      description:
        "Hanya menyediakan produk terpilih dengan standar kualitas tertinggi",
    },
    {
      icon: TrendingUp,
      title: "Inovasi",
      description:
        "Terus berinovasi untuk memberikan pengalaman terbaik kepada pelanggan",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Nilai-Nilai Kami
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Prinsip yang Kami <span className="text-red-600">Pegang Teguh</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nilai-nilai inti yang menjadi fondasi dalam setiap keputusan dan
            tindakan kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 group text-center"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
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

function TeamSection() {
  const team = [
    {
      name: "Fajar Irawan Rukmana",
      position: "CEO & Founder",
      image: "/team/ceo.jpg",
    },
    {
      name: "Sarah Putri",
      position: "Operations Manager",
      image: "/team/manager.jpg",
    },
    {
      name: "Budi Santoso",
      position: "Technical Expert",
      image: "/team/expert.jpg",
    },
    {
      name: "Linda Wijaya",
      position: "Customer Relations",
      image: "/team/cs.jpg",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Tim Kami
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Bertemu dengan <span className="text-red-600">Tim Profesional</span>{" "}
            Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Para ahli berpengalaman yang siap membantu Anda menemukan solusi
            terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-24 h-24 text-gray-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="text-white text-center">
                    <div className="font-bold text-lg">{member.name}</div>
                    <div className="text-sm text-red-100">
                      {member.position}
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 text-center group-hover:bg-red-50 transition-colors">
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Milestones() {
  const milestones = [
    {
      year: "2019",
      title: "Fondasi Awal",
      description:
        "Memulai operasional bisnis online dan membangun kehadiran brand melalui marketplace.",
    },
    {
      year: "2020",
      title: "Pengembangan Produk",
      description:
        "Memperluas variasi katalog serta meningkatkan kapasitas pengemasan dan distribusi.",
    },
    {
      year: "2022",
      title: "Perluasan Jangkauan Pasar",
      description:
        "Mulai beroperasi di beberapa platform e-commerce dan memperluas area pengiriman.",
    },
    {
      year: "2023",
      title: "Peningkatan Skala Operasional",
      description:
        "Mengoptimalkan manajemen pesanan dan layanan pelanggan untuk mendukung pertumbuhan penjualan.",
    },
    {
      year: "2025",
      title: "Penguatan Brand & Profesionalisasi",
      description:
        "Fokus pada standarisasi proses operasional, kualitas produk, dan pengalaman pelanggan.",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Milestone
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Perjalanan <span className="text-red-600">Kesuksesan</span> Kami
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-5/12">
                  <Card className="border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== TESTIMONIALS ==============
function Testimonials() {
  const testimonials = [
    {
      name: "Andi Wijaya",
      role: "Pemilik Bengkel",
      content:
        "Sudah 5 tahun jadi pelanggan setia. Kualitas produk selalu terjaga dan pelayanan sangat memuaskan. Rekomendasi banget!",
      rating: 5,
    },
    {
      name: "Maya Sari",
      role: "Driver Online",
      content:
        "Harga kompetitif, barang original, dan pengiriman cepat. Sangat membantu untuk kebutuhan kendaraan saya.",
      rating: 5,
    },
    {
      name: "Bambang Hermawan",
      role: "Pengusaha Transportasi",
      content:
        "Tim yang profesional dan responsif. Konsultasi gratis sangat membantu dalam memilih sparepart yang tepat.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            Testimoni
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata <span className="text-red-600">Pelanggan</span> Kami
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-red-200 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &apos;{testimonial.content}&apos;
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <CheckCircle
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          Mari Bergabung dengan Ribuan Pelanggan Setia Kami
        </h2>
        <p className="text-lg lg:text-xl text-red-100 mb-8">
          Dapatkan penawaran terbaik dan konsultasi gratis untuk kebutuhan
          otomotif Anda
        </p>
        <div className="flex justify-center flex-1">
          <Link href={"/kontak"}>
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8"
            >
              Hubungi Kami Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============== MAIN ABOUT PAGE ==============
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroAbout />
      <CompanyStory />
      <VisionMission />
      <CoreValues />
      <Milestones />
      <TeamSection />
      <Testimonials />
      <CTASection />
    </div>
  );
}
